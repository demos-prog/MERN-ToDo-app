import React from 'react';
import css from './ToDoItem.module.css'

type ToDoItemProps = {
  toDoText: string,
}

const ToDoItem: React.FC<ToDoItemProps> = ({ toDoText }) => {


  return (
    <div className={css.itemWrap}>
      {toDoText}
    </div>
  );
};

export default ToDoItem;