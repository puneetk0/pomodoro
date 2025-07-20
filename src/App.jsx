import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TimerProvider } from './context/TimerContext';
import { TaskProvider } from './context/TaskContext';
import Timer from './pages/Timer';
import Tasks from './pages/Tasks';
import Stats from './pages/Stats';

function App() {
  return (
      <TimerProvider>
        <TaskProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Timer />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </Router>
        </TaskProvider>
      </TimerProvider>
  );
}

export default App;