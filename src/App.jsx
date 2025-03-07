import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

// Layout Components
import Header from './components/Layout/Header';

// Auth Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Task Components
import TaskInput from './components/Tasks/TaskInput';
import TaskList from './components/Tasks/TaskList';

const TasksPage = () => {
  return (
    <div className="tasks-page">
      <div className="container">
        <div className="tasks-layout">
          <div className="tasks-main">
            <TaskInput />
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="container">
        <div className="home-content">
          <h1>Welcome to TaskTrek</h1>
          <p>
            Your personal task management solution with weather integration
            to help you plan your outdoor activities more effectively.
          </p>
          <div className="home-actions">
            <Link to="/login" className="btn-primary">
              Get Started
            </Link>
            <Link to="/register" className="btn-secondary">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/tasks" 
                element={
                  <ProtectedRoute>
                    <TasksPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;