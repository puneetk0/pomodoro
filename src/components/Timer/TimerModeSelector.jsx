import React from 'react';
import { useTimer } from '../../context/TimerContext';

const TimerModeSelector = () => {
  const { mode, setMode, isRunning } = useTimer();
  
  const modes = [
    { value: 'pomodoro', label: 'Pomodoro' },
    { value: 'shortBreak', label: 'Short Break' },
    { value: 'longBreak', label: 'Long Break' },
  ];
  
  const handleModeChange = (newMode) => {
    if (mode !== newMode && !isRunning) {
      setMode(newMode);
    }
  };
  
  return (
    <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner">
      {modes.map((modeOption) => (
        <button
          key={modeOption.value}
          onClick={() => handleModeChange(modeOption.value)}
          disabled={isRunning}
          className={`
            px-4 py-2 text-sm font-medium rounded-md transition-all
            ${mode === modeOption.value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
            }
            ${isRunning ? 'cursor-not-allowed opacity-70' : ''}
          `}
        >
          {modeOption.label}
        </button>
      ))}
    </div>
  );
};

export default TimerModeSelector;