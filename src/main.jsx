import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import History from './pages/History/History.jsx'
import Home from './pages/Home/Home.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import React from 'react';


const router=createBrowserRouter([
  {path:'/',
    element:<App />,
    children:[
      {
        path:'history',
        element:<History />
      },
      {
        path:'/',
        element:<Home />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);