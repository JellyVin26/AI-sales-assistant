import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoginPage, RegisterPage } from './pages/Auth';
import { DashboardPage } from './pages/Dashboard';
import { AIChatPage } from './pages/AIChat';
import { ProductsPage } from './pages/Products';
import { KnowledgeBasePage } from './pages/KnowledgeBase';
import { AnalyticsPage } from './pages/Analytics';
import { SettingsPage } from './pages/Settings';

import MainLayout from './components/layout/MainLayout';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/chats" element={<AIChatPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/knowledge" element={<KnowledgeBasePage />} />
        <Route path="/customers" element={<DashboardPage />} /> {/* Placeholder */}
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
