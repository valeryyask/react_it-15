import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PropertyDetailPage from './pages/PropertyDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PropertyProvider>
          <Routes>
            {/* Public Login Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Dashboard Route (Table & Card Management) */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Dedicated Property Detail Route */}
            <Route
              path="/properties/:id"
              element={
                <ProtectedRoute>
                  <PropertyDetailPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback to Dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PropertyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
