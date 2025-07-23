import React from 'react';
import Navbar from '../components/Layout/Navbar';
import PomodoroTimer from '../components/Timer/PomodoroTimer';

const Timer = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="w-full max-w-xl mx-auto">
          <h1 className="sr-only">Pomodoro Timer</h1>
          <PomodoroTimer />
        </div>
      </main>
    </div>
  );
};

export default Timer;