import React from 'react';
import { useLocation } from 'react-router-dom';


const ToDoList: React.FC = () => {
  const location = useLocation();


  const name = location.pathname.split('/').pop()


  return (
    <div>
      {name}
    </div>
  );
};

export default ToDoList;