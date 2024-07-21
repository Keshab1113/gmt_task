// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MultiPage from './pages/MultiPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TrackingScreen from './pages/TrackingScreen';
import Profile from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext'; // Assuming you have an AuthContext
import ProtectedRoute from './components/ProtectedRoute';
import { auth } from './firebase';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MultiPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/tracking"
            element={
              <ProtectedRoute>
                <TrackingScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
