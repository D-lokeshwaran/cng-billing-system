import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextPovider from './context/AuthContext';
import AppContextProvider from './context/AppContext';
import AppRoutes from './routes/AppRoutes';
import "react-datepicker/dist/react-datepicker.css";

const App: React.FC = () => {


    return (
        <HelmetProvider>
            <AppContextProvider>
                <Router basename="/cng-billing-system/">
                    <AuthContextPovider>
                        <AppRoutes/>
                    </AuthContextPovider>
                </Router>
            </AppContextProvider>
        </HelmetProvider>
    );
};

export default App;
