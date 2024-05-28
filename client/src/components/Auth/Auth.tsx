import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import css from '../Registration/Registration.module.css'



const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')

  function setName(e: { target: { value: React.SetStateAction<string>; }; }) {
    setUserName(e.target.value)
  }

  function setPass(e: { target: { value: React.SetStateAction<string>; }; }) {
    setUserPassword(e.target.value)
  }

  async function authentication(e: { preventDefault: () => void; }) {
    e.preventDefault();

    const res = await fetch(`http://localhost:5050/todo/auth/${userName}/${userPassword}`)

    if (res.ok) {
      navigate(`/todo/${userName}`);
    } else {
      const errorMessage = await res.json();
      alert(errorMessage.message);
    }
  }

  return (
    <div className={css.wrap}>
      <p>Don't have an account? <Link to={'/'}>Sign up</Link></p>
      <form onSubmit={authentication}>
        <input
          className={css.inp}
          placeholder='Name'
          type="text"
          value={userName}
          onChange={setName}
        />
        <input
          className={css.inp}
          placeholder='Password'
          type="text"
          value={userPassword}
          onChange={setPass}
        />
        <input id={css.submit} type="submit" value="Sign in" />
      </form>
    </div>
  );
};

export default Auth;