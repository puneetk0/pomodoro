import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RefreshCw, Check } from 'lucide-react';
import { useTimer } from '../../context/TimerContext';
import { useTasks } from '../../context/TaskContext';
import TimerModeSelector from './TimerModeSelector';
import TaskSelector from './TaskSelector';

const PomodoroTimer = () => {
  const { 
    mode, 
    isRunning, 
    timeLeft, 
    startTimer, 
    pauseTimer, 
    resetTimer, 
    currentTaskId
  } = useTimer();
  
  const { tasks, incrementPomodorosCompleted } = useTasks();
  const [progress, setProgress] = useState(100);
  const [minutesInput, setMinutesInput] = useState('');
  const [secondsInput, setSecondsInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const progressCircleRef = useRef(null);
  const activeTask = tasks.find(task => task.id === currentTaskId);
  
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  
  useEffect(() => {
    if (!progressCircleRef.current) return;
    
    const durations = {
      pomodoro: 25 * 60,
      shortBreak: 5 * 60,
      longBreak: 15 * 60,
    };
    
    const totalDuration = durations[mode];
    const newProgress = (timeLeft / totalDuration) * 100;
    setProgress(newProgress);
    
    const circumference = 2 * Math.PI * 120;
    const offset = circumference - (newProgress / 100) * circumference;
    progressCircleRef.current.style.strokeDashoffset = offset.toString();
  }, [timeLeft, mode]);
  
  const getModeColor = () => {
    switch (mode) {
      case 'pomodoro':
        return 'text-red-500';
      case 'shortBreak':
        return 'text-green-500';
      case 'longBreak':
        return 'text-blue-500';
      default:
        return 'text-red-500';
    }
  };
  
  const getModeBgColor = () => {
    switch (mode) {
      case 'pomodoro':
        return 'from-red-500 to-pink-500';
      case 'shortBreak':
        return 'from-green-500 to-teal-500';
      case 'longBreak':
        return 'from-blue-500 to-indigo-500';
      default:
        return 'from-red-500 to-pink-500';
    }
  };
  
  const getProgressColor = () => {
    switch (mode) {
      case 'pomodoro':
        return 'stroke-red-500';
      case 'shortBreak':
        return 'stroke-green-500';
      case 'longBreak':
        return 'stroke-blue-500';
      default:
        return 'stroke-red-500';
    }
  };
  
  const handleStartPause = () => {
    if (isRunning) {
      pauseTimer();
    } else {
      if (mode === 'pomodoro' && currentTaskId) {
        incrementPomodorosCompleted(currentTaskId);
      }
      startTimer();
    }
  };
  
  const handleEditTime = () => {
    setMinutesInput(minutes);
    setSecondsInput(seconds);
    setIsEditing(true);
  };
  
  const handleTimeSubmit = () => {
    setIsEditing(false);
  };
  
  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <TimerModeSelector />
      
      <div className="relative mt-8 mb-6">
        <svg width="300" height="300" viewBox="0 0 300 300">
          <circle
            cx="150"
            cy="150"
            r="120"
            fill="none"
            strokeWidth="12"
            className="stroke-gray-200"
          />
          
          <circle
            ref={progressCircleRef}
            cx="150"
            cy="150"
            r="120"
            fill="none"
            strokeWidth="12"
            strokeLinecap="round"
            className={`${getProgressColor()}`}
            style={{
              strokeDasharray: 2 * Math.PI * 120,
              strokeDashoffset: 0,
              transformOrigin: 'center',
              transform: 'rotate(-90deg)',
            }}
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isEditing ? (
            <div className="flex items-center space-x-1">
              <input
                type="text"
                value={minutesInput}
                onChange={(event) => setMinutesInput(event.target.value)}
                className="w-16 text-3xl bg-transparent text-center focus:outline-none border-b-2 border-gray-400"
                maxLength={2}
              />
              <span className="text-3xl">:</span>
              <input
                type="text"
                value={secondsInput}
                onChange={(event) => setSecondsInput(event.target.value)}
                className="w-16 text-3xl bg-transparent text-center focus:outline-none border-b-2 border-gray-400"
                maxLength={2}
              />
              <button
                onClick={handleTimeSubmit}
                className="ml-2 p-1 rounded-full bg-green-500 text-white"
              >
                <Check size={20} />
              </button>
            </div>
          ) : (
            <div 
              className={`text-5xl font-bold ${getModeColor()}`}
              onClick={!isRunning ? handleEditTime : undefined}
            >
              {minutes}:{seconds}
            </div>
          )}
          
          {activeTask && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-[200px] truncate">
              Working on: {activeTask.title}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={resetTimer}
          className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          aria-label="Reset timer"
        >
          <RefreshCw size={20} />
        </button>
        
        <button
          onClick={handleStartPause}
          className={`p-5 rounded-full bg-gradient-to-br ${getModeBgColor()} text-white shadow-lg hover:shadow-xl transform transition-all hover:scale-105 active:scale-95`}
          aria-label={isRunning ? "Pause timer" : "Start timer"}
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </div>
      
      <TaskSelector />
    </div>
  );
};

export default PomodoroTimer;