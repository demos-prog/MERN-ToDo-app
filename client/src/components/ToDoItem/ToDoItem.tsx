import React from 'react';
import { ToDo } from '../ToDoList/ToDoList';
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
        <button>
          delete
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;