import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ToDoItem from '../ToDoItem/ToDoItem';
import ErrorComp from '../ErrorComp/ErrorComp';
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
  const [errorText, setErrorText] = useState('');

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
        setuser(data)
      })
      setErrorText('');
    } else {
      const errorMessage = await res.json();
      setErrorText(errorMessage.message);
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
      setuser(data)
    })
  }, [getUsersData])

  const areThereSomeToDos = user && user.todos && user.todos.length > 0;

  const list = (areThereSomeToDos && user.todos.map((todo, i) => {
    if (!todo) return null;
    return (
      <ToDoItem
        key={i}
        todo={todo}
      />
    );
  }))

  return (
    <div id={css.wrap}>
      <div className={css.body}>
        <p>{user && `Hello ${user!.name} !`}</p>
        {errorText !== '' && <ErrorComp text={errorText} />}
        <div className={css.inpWrap}>
          <input
            className={css.textInp}
            type="text"
            name='addfield'
            value={inpText}
            placeholder='what should be done ?'
            onChange={chInput}
          />
          <button
            id={css.addBtn}
            onClick={sendToDo}>
            Add
          </button>
        </div>
        <div className={css.toDoListWrap}>
          {list || 'Nothing to do ... chill :)'}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;