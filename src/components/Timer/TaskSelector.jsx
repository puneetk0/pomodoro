import React, { useState } from 'react';
import { CheckSquare, Plus, ArrowDownAZ, Circle } from 'lucide-react';
import { useTimer } from '../../context/TimerContext';
import { useTasks } from '../../context/TaskContext';

const TaskSelector = () => {
  const { currentTaskId, setCurrentTaskId } = useTimer();
  const { tasks, addTask } = useTasks();
  const [isOpen, setIsOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  const activeTasks = tasks.filter(task => !task.completed);
  const selectedTask = tasks.find(task => task.id === currentTaskId);
  
  const handleTaskSelect = (taskId) => {
    setCurrentTaskId(taskId);
    setIsOpen(false);
  };
  
  const handleAddTask = (event) => {
    event.preventDefault();
    if (newTaskTitle.trim()) {
      const newTask = addTask({
        title: newTaskTitle.trim(),
        pomodorosEstimated: 1,
      });
      setCurrentTaskId(newTask.id);
      setNewTaskTitle('');
      setIsOpen(false);
    }
  };
  
  return (
    <div className="relative w-full max-w-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-left"
      >
        <div className="flex items-center space-x-3">
          <CheckSquare className="text-red-500 dark:text-red-400" size={20} />
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            {selectedTask ? selectedTask.title : 'Select a task...'}
          </span>
        </div>
        <div className="text-gray-500 dark:text-gray-400">
          {isOpen ? (
            <Circle className="transform rotate-180" size={18} />
          ) : (
            <Circle size={18} />
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <ArrowDownAZ size={16} className="text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Tasks</span>
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {activeTasks.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 italic">
                No active tasks. Add one below!
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {activeTasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => handleTaskSelect(task.id)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                              ${task.id === currentTaskId ? 'bg-red-50 dark:bg-red-900/20' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-800 dark:text-gray-200">
                        {task.title}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                        {task.pomodorosCompleted}/{task.pomodorosEstimated}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 p-3">
            <form onSubmit={handleAddTask} className="flex items-center space-x-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(event) => setNewTaskTitle(event.target.value)}
                  placeholder="Add a new task..."
                  className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-600
                            focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <button
                type="submit"
                disabled={!newTaskTitle.trim()}
                className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 
                          disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskSelector;