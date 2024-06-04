import React, { useEffect, useState } from 'react';
import { ToDo } from '../ToDoList/ToDoList';
import deleteIcon from '../../assets/delete.svg';
import editIcon from "../../assets/editIcon.svg";
import completeIcon from '../../assets/complete.svg';
import css from './ToDoItem.module.css'

type ToDoItemProps = {
  todo: ToDo,
  name: string,
  password: string,
  getUsersData: () => Promise<void>,
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, name, password, getUsersData }) => {
  const [inpValue, setInpValue] = useState(todo.text);
  const [isEditing, setIsEditing] = useState(false);

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

  const setNewText = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (inpValue !== todo.text && inpValue !== '') {
      const url = `http://localhost:5050/todo/update/${name}/${password}/${todo.text}/${inpValue}/${todo.completion}`;
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
          setIsEditing(false);
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
  }

  useEffect(() => {
    setInpValue(todo.text);
    setIsEditing(false);
  }, [todo.text])

  return (
    <div className={css.itemWrap}>
      {isEditing ? (
        <form className={css.changeForm} onSubmit={setNewText}>
          <input
            type="text"
            value={inpValue}
            id={css.editInput}
            onChange={(e) => setInpValue(e.target.value)}
          />
          <input
            type="submit"
            value='Change'
            id={css.submBtn}
          />
        </form>
      ) : (
        <span className={todo.completion ? `${css.completed} ${css.text}` : css.text}>
          {todo.text}
        </span>
      )}
      <div className={css.actions}>
        <img
          className={todo.completion ? `${css.completeImg} ${css.completedCheck}` : css.completeImg}
          onClick={completeToDo}
          src={completeIcon}
          alt="complete"
        />
        <img
          className={css.completeImg}
          onClick={() => setIsEditing(prev => !prev)}
          src={editIcon}
          alt="edit"
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