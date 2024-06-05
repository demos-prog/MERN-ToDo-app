import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ToDoItem from '../ToDoItem/ToDoItem';
import ErrorComp from '../ErrorComp/ErrorComp';
import completeIcon from '../../assets/complete.svg';
import css from './ToDoList.module.css'

export type ToDo = {
  text: string,
  completion: boolean,
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
  const [filtersValue, setFiltersValue] = useState('all')

  const name = location.pathname.split('/').pop()

  const getUsersData = useCallback(async () => {
    const response = await fetch(`http://localhost:5050/todo/${name}`);
    const data = await response.json();
    setuser(data);
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
      getUsersData().then(() => {
        setErrorText('');
      })
    } else {
      const errorMessage = await res.json();
      setErrorText(errorMessage.message);
    }
  }

  const chInput = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInpText(e.target.value)
  }

  const sendToDo = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    if (inpText !== '') {
      addToDo({
        text: inpText,
        completion: false
      })
      setInpText('')
    }
  }

  const handleChangeFilter = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setFiltersValue(e.target.value)
  }

  useEffect(() => {
    getUsersData();
  }, [getUsersData])

  const areThereSomeToDos = user && user.todos && user.todos.length > 0;

  const sortedList = areThereSomeToDos && user.todos.filter((todo) => {
    if (filtersValue === 'all') return todo
    if (filtersValue === 'true') return todo.completion
    if (filtersValue === 'false') return !todo.completion
  })

  const toDoList = (sortedList && sortedList.map((todo, i) => {
    if (!todo) return null;
    return (
      <ToDoItem
        key={i}
        getUsersData={getUsersData}
        name={user.name}
        password={user.password}
        todo={todo}
      />
    );
  }))

  const nothing = (
    <div id={css.nothing}>
      Nothing to do ... chill :)
    </div>
  )

  const filter = (
    <div id={css.filtersWrap}>
      <label
        style={filtersValue === 'all' ? { border: '1px solid #000' } : {}}
        className={css.filterItem}
      >
        All
        <input
          type="radio"
          value={'all'}
          name='all'
          style={{ display: 'none' }}
          checked={filtersValue === 'all'}
          onChange={handleChangeFilter}
        />
        <div className={css.iconWrap}>
          <img
            className={css.icon}
            src={completeIcon}
            alt="edit"
          />
        </div>
        <img
          className={css.icon}
          src={completeIcon}
          alt="edit"
        />
      </label>
      <label
        style={filtersValue === 'true' ? { border: '1px solid #000' } : {}}
        className={css.filterItem}
      >
        Completed
        <input
          type="radio"
          value={'true'}
          style={{ display: 'none' }}
          checked={filtersValue === 'true'}
          name='Completed'
          onChange={handleChangeFilter}
        />
        <div className={css.iconWrap}>
          <img
            className={css.icon}
            src={completeIcon}
            alt="edit"
          />
        </div>
      </label>
      <label
        style={filtersValue === 'false' ? { border: '1px solid #000' } : {}}
        className={css.filterItem}
      >
        Uncompleted
        <input
          type="radio"
          value={'false'}
          name='Uncompleted'
          style={{ display: 'none' }}
          checked={filtersValue === 'false'}
          onChange={handleChangeFilter}
        />
        <img
          className={css.icon}
          src={completeIcon}
          alt="edit"
        />
      </label>
    </div>
  )

  const textInput = (
    <form onSubmit={sendToDo} className={css.inpWrap}>
      <input
        className={css.textInp}
        type="text"
        name='addfield'
        value={inpText}
        placeholder='what should be done ?'
        onChange={chInput}
      />
      <button
        type='submit'
        id={css.addBtn}
      >
        Add
      </button>
    </form>
  )

  return (
    <div id={css.wrap}>
      <div className={css.body}>
        <p>{user && `Hello ${user!.name} !`}</p>
        {errorText !== '' && <ErrorComp text={errorText} />}
        {textInput}
        <div className={css.toDoListWrap}>
          {toDoList ? filter : null}
          {toDoList || nothing}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;