import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Registration from './components/Registration/Registration.tsx';
import ToDoList from './components/ToDoList/ToDoList.tsx';
import Auth from './components/Auth/Auth.tsx';
import './null_styles.css'

// export const SERVER_LINK = 'https://server-bi2rst9xr-demosprogs-projects.vercel.app';
export const SERVER_LINK = 'http://localhost:5050'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Registration />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/todo/:name",
    element: <ToDoList />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
