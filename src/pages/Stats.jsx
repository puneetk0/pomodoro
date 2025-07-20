import React from 'react';
import Navbar from '../components/Layout/Navbar';
import { useTimer } from '../context/TimerContext';
import { useTasks } from '../context/TaskContext';
import { Clock, CheckSquare, Target, TrendingUp } from 'lucide-react';

const Stats = () => {
  const { sessionHistory, sessionsCompleted } = useTimer();
  const { tasks } = useTasks();
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;
  
  const totalFocusTime = sessionHistory
    .filter(session => session.mode === 'pomodoro')
    .reduce((total, session) => total + (session.duration / 60), 0);
  
  const totalBreakTime = sessionHistory
    .filter(session => session.mode === 'shortBreak' || session.mode === 'longBreak')
    .reduce((total, session) => total + (session.duration / 60), 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow w-full max-w-6xl mx-auto pt-24 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Simple Stats</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            See your progress at a glance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                <Clock className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Pomodoro Sessions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sessionsCompleted}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Focus Time
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(totalFocusTime)} min
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <CheckSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Tasks Done
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {completedTasks}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Tasks
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activeTasks}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Summary
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Total Sessions Completed:</span>
              <span className="font-medium text-gray-900 dark:text-white">{sessionsCompleted}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Total Focus Time:</span>
              <span className="font-medium text-gray-900 dark:text-white">{Math.round(totalFocusTime)} minutes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Total Break Time:</span>
              <span className="font-medium text-gray-900 dark:text-white">{Math.round(totalBreakTime)} minutes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Tasks Completed:</span>
              <span className="font-medium text-gray-900 dark:text-white">{completedTasks} out of {totalTasks}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Stats;