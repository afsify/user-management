import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/User/SignIn'
import SignUp from './pages/User/SignUp'
import Home from './pages/User/Home'
import Profile from './pages/User/Profile'
import Login from './pages/Admin/Login'
import Dashboard from './pages/Admin/Dashboard'
import Edit from './pages/Admin/Edit'
import { Toaster } from 'react-hot-toast'
import { useSelector} from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

function App() {

    const {loading} = useSelector((state) => state.alerts)

    return (
        <BrowserRouter>
            {loading &&(
                <div className="spinner-parent">
                    <div class="spinner-border text-primary" role="status"></div>
                </div>
            )}
            <Toaster position='top-right' reverseOrder={false} />
            <Routes>
                <Route
                    path='/sign-up'
                    element={
                        <PublicRoute>
                            <SignUp />
                        </PublicRoute>
                    }
                />
                <Route
                    path='/sign-in'
                    element={
                        <PublicRoute>
                            <SignIn />
                        </PublicRoute>
                    }
                />
                <Route
                    path='/'
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/profile'
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/admin/login'
                    element={
                        <Login />
                    }
                />
                <Route
                    path='/admin/dashboard'
                    element={
                        <Dashboard />
                    }
                />
                <Route
                    path='/admin/edit'
                    element={
                        <Edit />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
