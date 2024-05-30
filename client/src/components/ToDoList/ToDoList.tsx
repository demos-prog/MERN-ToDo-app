import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ToDoItem from '../ToDoItem/ToDoItem';
import css from './ToDoList.module.css'

export type ToDo = {
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
  const [user, setuser] = useState<User>();
  const [inpText, setInpText] = useState('');

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

  const chInput = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInpText(e.target.value)
  }

  const sendToDo = () => {
    if (inpText !== '') {
      addToDo({
        text: inpText,
        complition: false
      })
      setInpText('')
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
        <p>{user && `Hello ${user!.name} !`}</p>
        <input
          type="text"
          value={inpText}
          placeholder='what should be done ?'
          onChange={chInput}
        />
        <button onClick={sendToDo}>
          Add ToDo
        </button>
        <div className={css.toDoListWrap}>
          {user && user.todos && user.todos.length > 0 && user.todos.map((todo, i) => {
            if (!todo) return null;
            return (
              <ToDoItem
                key={i}
                todo={todo}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;