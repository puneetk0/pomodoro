import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';

const AddTaskForm = () => {
  const { addTask } = useTasks();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [pomodorosEstimated, setPomodorosEstimated] = useState(1);
  const [notes, setNotes] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (title.trim()) {
      addTask({
        title: title.trim(),
        pomodorosEstimated,
        notes: notes.trim() || undefined,
      });
      
      setTitle('');
      setPomodorosEstimated(1);
      setNotes('');
      setIsOpen(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Add New Task</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Task Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="What do you want to accomplish?"
                className="w-full px-3 py-2 rounded border border-gray-300
                          focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                          bg-white text-gray-900"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="pomodoros" className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Pomodoros
              </label>
              <input
                id="pomodoros"
                type="number"
                min="1"
                max="99"
                value={pomodorosEstimated}
                onChange={(event) => setPomodorosEstimated(parseInt(event.target.value) || 1)}
                className="w-full px-3 py-2 rounded border border-gray-300
                          focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                          bg-white text-gray-900"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Add details about this task..."
                rows={3}
                className="w-full px-3 py-2 rounded border border-gray-300
                          focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                          bg-white text-gray-900"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-md
                          shadow-sm hover:shadow-md transition-all flex items-center space-x-2"
              >
                <Plus size={18} />
                <span>Add Task</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3
                    bg-white hover:bg-gray-50
                    border border-gray-200 border-dashed
                    rounded-lg text-gray-700 
                    transition-colors"
        >
          <Plus size={20} />
          <span className="font-medium">Add New Task</span>
        </button>
      )}
    </div>
  );
};

export default AddTaskForm;