import React from 'react';
import { ToDo } from '../ToDoList/ToDoList';
import deleteIcon from '../../assets/delete.svg';
import css from './ToDoItem.module.css'

type ToDoItemProps = {
  todo: ToDo
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo }) => {


  return (
    <div className={css.itemWrap}>
      <span>
        {todo.text}
      </span>
      <div className={css.actions}>
        <img
          className={css.delImg}
          src={deleteIcon}
          alt="delete"
        />
      </div>
    </div>
  );
};

export default ToDoItem;