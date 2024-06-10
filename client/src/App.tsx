import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextPovider from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <AuthContextPovider>
          <Suspense fallback={<>Loading...</>}>
            <AppRoutes/>
          </Suspense>
        </AuthContextPovider>
      </Router>
    </HelmetProvider>
  );
};

export default App;
