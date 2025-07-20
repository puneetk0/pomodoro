import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { useTimer } from '../../context/TimerContext';

const TimerSettings = ({ onClose }) => {
  const { durations, setDuration } = useTimer();
  
  const [settings, setSettings] = useState({
    pomodoro: durations.pomodoro / 60,
    shortBreak: durations.shortBreak / 60,
    longBreak: durations.longBreak / 60,
  });
  
  const handleChange = (mode, value) => {
    const minutes = parseInt(value, 10);
    if (!isNaN(minutes) && minutes >= 1 && minutes <= 60) {
      setSettings({
        ...settings,
        [mode]: minutes,
      });
    }
  };
  
  const handleSave = () => {
    Object.entries(settings).forEach(([mode, minutes]) => {
      setDuration(mode, minutes);
    });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-6 m-4 transform transition-all">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Timer Settings</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
            aria-label="Close settings"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pomodoro Duration (minutes)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={settings.pomodoro}
              onChange={(event) => handleChange('pomodoro', event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm 
                        bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Short Break Duration (minutes)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={settings.shortBreak}
              onChange={(event) => handleChange('shortBreak', event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm 
                        bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Long Break Duration (minutes)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={settings.longBreak}
              onChange={(event) => handleChange('longBreak', event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm 
                        bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-md 
                      shadow-sm hover:shadow-md transition-all flex items-center space-x-2"
          >
            <Save size={18} />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerSettings;