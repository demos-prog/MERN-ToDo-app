import React from 'react';
import { ToDo } from '../ToDoList/ToDoList';
import css from './ToDoItem.module.css'

type ToDoItemProps = {
  todo: ToDo
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo }) => {


  return (
    <div className={css.itemWrap}>
      {todo.text}
    </div>
  );
};

export default ToDoItem;