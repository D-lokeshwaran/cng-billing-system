import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextPovider from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import "react-datepicker/dist/react-datepicker.css";

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <AuthContextPovider>
          <AppRoutes/>
        </AuthContextPovider>
      </Router>
    </HelmetProvider>
  );
};

export default App;
