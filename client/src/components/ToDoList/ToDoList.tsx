import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import css from './ToDoList.module.css'

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

  const addToDo = async (todo: ToDo) => {
    const res = await fetch(`http://localhost:5050/todo/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(todo)
    })

    if (res.ok) {
      getUsersData().then((data) => {
        console.log(data);
        setuser(data)
      })
    } else {
      const errorMessage = await res.json();
      alert(errorMessage.message);
    }
  }


  useEffect(() => {
    getUsersData().then((data) => {
      console.log(data);
      setuser(data)
    })
  }, [getUsersData])

  return (
    <div id={css.wrap}>
      <div className={css.body}>
        {user && user!.name}
        <button onClick={() => {
          addToDo({
            text: 'gggg',
            complition: false
          })
        }}>Add ToDo</button>
        <ul>
          {user && user.todos && user.todos.length > 0 && user.todos.map((todo, i) => {
            if (!todo) return null;
            return (
              <li key={i}>
                {todo.text}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;