import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const TimerContext = createContext(undefined);

const DEFAULT_DURATIONS = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export function TimerProvider({ children }) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('pomodoroTimerState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            ...parsed,
            isRunning: false,
            timeLeft: parsed.timeLeft || DEFAULT_DURATIONS.pomodoro,
            durations: parsed.durations || DEFAULT_DURATIONS,
            startTime: null,
          };
        }
      } catch (error) {
        console.error('Failed to parse saved timer state:', error);
      }
    }
    
    return {
      mode: 'pomodoro',
      isRunning: false,
      timeLeft: DEFAULT_DURATIONS.pomodoro,
      sessionsCompleted: 0,
      durations: DEFAULT_DURATIONS,
      startTime: null,
      sessionHistory: [],
      currentTaskId: null,
    };
  });

  useEffect(() => {
    localStorage.setItem('pomodoroTimerState', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    let intervalId;

    if (state.isRunning) {
      intervalId = window.setInterval(() => {
        setState(previousState => {
          if (previousState.timeLeft <= 1) {
            const now = Date.now();
            const newSessionHistory = [...previousState.sessionHistory];
            
            if (previousState.startTime) {
              newSessionHistory.push({
                mode: previousState.mode,
                startTime: previousState.startTime,
                endTime: now,
                duration: previousState.durations[previousState.mode],
                taskId: previousState.currentTaskId || undefined,
              });
            }

            const audio = new Audio('/notification.mp3');
            audio.play().catch(error => console.log('Audio play failed:', error));
            
            if (Notification.permission === 'granted') {
              new Notification(`${previousState.mode === 'pomodoro' ? 'Break time!' : 'Time to focus!'}`, {
                body: `${previousState.mode === 'pomodoro' ? 'Take a break!' : 'Start a new Pomodoro session!'}`,
                icon: '/favicon.ico',
              });
            }

            let nextMode;
            let nextSessionsCompleted = previousState.sessionsCompleted;
            
            if (previousState.mode === 'pomodoro') {
              nextSessionsCompleted = previousState.sessionsCompleted + 1;
              nextMode = nextSessionsCompleted % 4 === 0 ? 'longBreak' : 'shortBreak';
            } else {
              nextMode = 'pomodoro';
            }

            return {
              ...previousState,
              isRunning: false,
              timeLeft: previousState.durations[nextMode],
              mode: nextMode,
              sessionsCompleted: nextSessionsCompleted,
              startTime: null,
              sessionHistory: newSessionHistory,
            };
          }
          
          return {
            ...previousState,
            timeLeft: previousState.timeLeft - 1,
          };
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [state.isRunning]);

  useEffect(() => {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  const startTimer = useCallback(() => {
    setState(previousState => ({
      ...previousState,
      isRunning: true,
      startTime: previousState.startTime || Date.now(),
    }));
  }, []);

  const pauseTimer = useCallback(() => {
    setState(previousState => ({
      ...previousState,
      isRunning: false,
    }));
  }, []);

  const resetTimer = useCallback(() => {
    setState(previousState => ({
      ...previousState,
      isRunning: false,
      timeLeft: previousState.durations[previousState.mode],
      startTime: null,
    }));
  }, []);

  const skipTimer = useCallback(() => {
    setState(previousState => {
      let nextMode;
      let nextSessionsCompleted = previousState.sessionsCompleted;
      
      if (previousState.mode === 'pomodoro') {
        nextSessionsCompleted = previousState.sessionsCompleted + 1;
        nextMode = nextSessionsCompleted % 4 === 0 ? 'longBreak' : 'shortBreak';
      } else {
        nextMode = 'pomodoro';
      }

      return {
        ...previousState,
        isRunning: false,
        timeLeft: previousState.durations[nextMode],
        mode: nextMode,
        sessionsCompleted: nextSessionsCompleted,
        startTime: null,
      };
    });
  }, []);

  const setDuration = useCallback((mode, minutes) => {
    const seconds = Math.max(1, Math.min(60, minutes)) * 60;
    
    setState(previousState => {
      const newDurations = {
        ...previousState.durations,
        [mode]: seconds,
      };
      
      const newTimeLeft = mode === previousState.mode
        ? seconds
        : previousState.timeLeft;
      
      return {
        ...previousState,
        durations: newDurations,
        timeLeft: newTimeLeft,
        isRunning: false,
        startTime: null,
      };
    });
  }, []);

  const setMode = useCallback((mode) => {
    setState(previousState => ({
      ...previousState,
      mode,
      timeLeft: previousState.durations[mode],
      isRunning: false,
      startTime: null,
    }));
  }, []);

  const setCurrentTaskId = useCallback((taskId) => {
    setState(previousState => ({
      ...previousState,
      currentTaskId: taskId,
    }));
  }, []);

  const contextValue = {
    ...state,
    startTimer,
    pauseTimer,
    resetTimer,
    skipTimer,
    setDuration,
    setMode,
    setCurrentTaskId,
  };

  return (
    <TimerContext.Provider value={contextValue}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
}
