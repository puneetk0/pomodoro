import React from 'react';
import Navbar from '../components/Layout/Navbar';
import AddTaskForm from '../components/Tasks/AddTaskForm';
import TasksList from '../components/Tasks/TasksList';

const Tasks = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow w-full max-w-4xl mx-auto pt-24 px-4 sm:px-6 lg:px-8 pb-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Task Management</h1>
        
        <AddTaskForm />
        <TasksList />
      </main>
    </div>
  );
};

export default Tasks;