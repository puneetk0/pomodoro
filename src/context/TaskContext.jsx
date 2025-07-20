import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext(undefined);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('pomodoroTasks');
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (error) {
        console.error('Failed to parse saved tasks:', error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('pomodoroTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((taskData) => {
    const newTask = {
      id: uuidv4(),
      title: taskData.title,
      completed: false,
      createdAt: Date.now(),
      pomodorosCompleted: 0,
      pomodorosEstimated: taskData.pomodorosEstimated,
      notes: taskData.notes,
    };
    
    setTasks(previousTasks => [...previousTasks, newTask]);
    return newTask;
  }, []);

  const updateTask = useCallback((id, updates) => {
    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(previousTasks => previousTasks.filter(task => task.id !== id));
  }, []);

  const completeTask = useCallback((id) => {
    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === id
          ? { ...task, completed: true, completedAt: Date.now() }
          : task
      )
    );
  }, []);

  const incrementPomodorosCompleted = useCallback((id) => {
    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === id
          ? { ...task, pomodorosCompleted: task.pomodorosCompleted + 1 }
          : task
      )
    );
  }, []);

  const filteredTasks = useCallback(
    (filter) => {
      switch (filter) {
        case 'active':
          return tasks.filter(task => !task.completed);
        case 'completed':
          return tasks.filter(task => task.completed);
        case 'all':
        default:
          return tasks;
      }
    },
    [tasks]
  );

  const contextValue = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    incrementPomodorosCompleted,
    filteredTasks,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}