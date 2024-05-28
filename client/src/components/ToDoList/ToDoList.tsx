import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type ToDo = {
  text: string,
  complition: boolean,
}

type User = {
  name: string,
  password: string,
  todos: ToDo[]
}

const ToDoList: React.FC = () => {
  const location = useLocation();
  const [user, setuser] = useState<User>()

  const name = location.pathname.split('/').pop()

  const getUsersData = useCallback(async () => {
    const response = await fetch(`http://localhost:5050/todo/${name}`);
    return await response.json();
  }, [name]);

  useEffect(() => {
    getUsersData().then((data) => {
      console.log(data);
      
      setuser(data)
    })
  }, [getUsersData])

  return (
    <div>
      {name}
    </div>
  );
};

export default ToDoList;