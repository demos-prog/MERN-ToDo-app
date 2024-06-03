import React from 'react';
import { ToDo } from '../ToDoList/ToDoList';
import deleteIcon from '../../assets/delete.svg';
import completeIcon from '../../assets/complete.svg';
import css from './ToDoItem.module.css'

type ToDoItemProps = {
  todo: ToDo,
  name: string,
  password: string,
  getUsersData: () => Promise<void>,
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, name, password, getUsersData }) => {

  const deleteToDo = () => {
    const url = `http://localhost:5050/todo/${name}/${password}/${todo.text}/${todo.completion}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete the todo item');
        }
        return response.text();
      })
      .then(text => {
        getUsersData();
        if (text) {
          const data = JSON.parse(text);
          console.log('Delete successful', data);
        } else {
          console.log('Delete successful, no content returned');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const completeToDo = () => {
    const url = `http://localhost:5050/todo/${name}/${password}/${todo.text}/${!todo.completion}`;
    fetch(url, {
      method: 'PATCH'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update the todo item');
        }
        return response.text();
      })
      .then(text => {
        getUsersData();
        if (text) {
          const data = JSON.parse(text);
          console.log(data);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }


  return (
    <div className={todo.completion ? `${css.itemWrap} ${css.completed}` : css.itemWrap}>
      <span>
        {todo.text}
      </span>
      <div className={css.actions}>
        <img
          className={css.completeImg}
          onClick={completeToDo}
          src={completeIcon}
          alt="complete"
        />
        <img
          className={css.delImg}
          onClick={deleteToDo}
          src={deleteIcon}
          alt="delete"
        />
      </div>
    </div>
  );
};

export default ToDoItem;