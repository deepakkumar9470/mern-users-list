import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
  } from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store'
import Home from './components/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import PrivateRoutes from './components/PrivateRoutes';
import EditUser from './components/EditUser';
import UsersList from './components/UsersList';
import ConnectionDetector from './components/ConnectionDetector';

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App />}>
        <Route index={true} path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='' element={<PrivateRoutes />} >
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/list' element={<UsersList />} />
          <Route path='/edit/:id' element={<EditUser />} />
        </Route>
      </Route>
    )
  );
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider> 
  
);



