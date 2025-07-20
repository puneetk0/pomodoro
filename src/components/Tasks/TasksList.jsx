import React, { useState } from 'react';
import { CheckCircle, Clock, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';

const TasksList = () => {
  const { tasks, updateTask, deleteTask, completeTask } = useTasks();
  const [filter, setFilter] = useState('active');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editEstimate, setEditEstimate] = useState(1);
  const [editNotes, setEditNotes] = useState('');
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });
  
  const startEditTask = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditEstimate(task.pomodorosEstimated);
    setEditNotes(task.notes || '');
  };
  
  const saveEditTask = () => {
    if (!editingTaskId) return;
    
    updateTask(editingTaskId, {
      title: editTitle,
      pomodorosEstimated: editEstimate,
      notes: editNotes,
    });
    
    setEditingTaskId(null);
  };
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Tasks</h2>
        
        <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner">
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all
                      ${filter === 'active'
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all
                      ${filter === 'completed'
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all
                      ${filter === 'all'
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
          >
            All
          </button>
        </div>
      </div>
      
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
          <Clock className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No tasks found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {filter === 'active' 
              ? "You don't have any active tasks. Create one to get started!" 
              : filter === 'completed'
                ? "You haven't completed any tasks yet."
                : "You don't have any tasks. Create one to get started!"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div 
              key={task.id} 
              className={`
                relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 
                overflow-hidden transition-all duration-200
                ${task.completed ? 'opacity-80' : 'hover:shadow-md'}
              `}
            >
              {editingTaskId === task.id ? (
                <div className="p-4">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(event) => setEditTitle(event.target.value)}
                    className="w-full px-3 py-2 text-base rounded border border-gray-300 dark:border-gray-600
                              focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-3"
                    placeholder="Task title"
                  />
                  
                  <div className="flex items-center mb-3">
                    <label className="mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Estimated Pomodoros:
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={editEstimate}
                      onChange={(event) => setEditEstimate(parseInt(event.target.value) || 1)}
                      className="w-16 px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600
                                focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                                bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <textarea
                    value={editNotes}
                    onChange={(event) => setEditNotes(event.target.value)}
                    placeholder="Add notes (optional)"
                    className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-600
                              focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-3"
                    rows={3}
                  />
                  
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingTaskId(null)}
                      className="px-3 py-1.5 text-sm font-medium rounded-md bg-gray-200 dark:bg-gray-700
                                text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveEditTask}
                      className="px-3 py-1.5 text-sm font-medium rounded-md bg-gradient-to-r from-red-500 to-pink-500
                                text-white hover:shadow-md transition-all"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <button
                        onClick={() => {
                          if (!task.completed) {
                            completeTask(task.id);
                          }
                        }}
                        disabled={task.completed}
                        className={`flex-shrink-0 mt-1 rounded-full p-1 transition-colors
                                  ${task.completed
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'
                                  }`}
                      >
                        {task.completed ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <CheckCircle2 className="h-5 w-5" />
                        )}
                      </button>
                      
                      <div>
                        <h3 className={`text-base font-medium text-gray-900 dark:text-white
                                      ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                          {task.title}
                        </h3>
                        
                        {task.notes && (
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
                            {task.notes}
                          </p>
                        )}
                        
                        <div className="mt-2 flex items-center space-x-4">
                          <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                            <Clock size={14} />
                            <span>
                              {task.pomodorosCompleted}/{task.pomodorosEstimated} pomodoros
                            </span>
                          </div>
                          
                          {task.completed && task.completedAt && (
                            <div className="text-xs text-green-600 dark:text-green-500">
                              Completed {new Date(task.completedAt).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {!task.completed && (
                      <div className="flex space-x-1">
                        <button
                          onClick={() => startEditTask(task)}
                          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                          aria-label="Edit task"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                          aria-label="Delete task"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksList;