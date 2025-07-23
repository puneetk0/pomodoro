import React, { useState } from 'react';
import { CheckSquare, ChevronDown } from 'lucide-react';
import { useTimer } from '../../context/TimerContext';
import { useTasks } from '../../context/TaskContext';

const TaskSelector = () => {
  const { currentTaskId, setCurrentTaskId } = useTimer();
  const { tasks } = useTasks();
  const [isOpen, setIsOpen] = useState(false);
  
  const activeTasks = tasks.filter(task => !task.completed);
  const selectedTask = tasks.find(task => task.id === currentTaskId);
  
  const handleTaskSelect = (taskId) => {
    setCurrentTaskId(taskId);
    setIsOpen(false);
  };
  
  return (
    <div className="relative w-full max-w-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-200 text-left"
      >
        <div className="flex items-center space-x-3">
          <CheckSquare className="text-red-500" size={20} />
          <span className="text-gray-700 font-medium">
            {selectedTask ? selectedTask.title : 'Select a task...'}
          </span>
        </div>
        <div className="text-gray-500">
          <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} size={18} />
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="max-h-60 overflow-y-auto">
            {activeTasks.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 italic">
                No active tasks. Go to Tasks page to add one!
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {activeTasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => handleTaskSelect(task.id)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors
                              ${task.id === currentTaskId ? 'bg-red-50' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-800">
                        {task.title}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        {task.pomodorosCompleted}/{task.pomodorosEstimated}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskSelector;