import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import css from '../Registration/Registration.module.css'


const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')
  const [nameWarn, setNameWarn] = useState(false)
  const [passWarn, setPassWarn] = useState(false)

  function setName(e: { target: { value: React.SetStateAction<string>; }; }) {
    setNameWarn(false);
    setUserName(e.target.value);
  }

  function setPass(e: { target: { value: React.SetStateAction<string>; }; }) {
    setPassWarn(false);
    setUserPassword(e.target.value);
  }

  async function authentication(e: { preventDefault: () => void; }) {
    e.preventDefault();

    if (userName === '') {
      setNameWarn(true);
      return
    }

    if (userPassword === '') {
      setPassWarn(true);
      return
    }

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
          style={nameWarn ? { borderColor: 'red' } : {}}
          value={userName}
          onChange={setName}
        />
        <input
          className={css.inp}
          placeholder='Password'
          type="text"
          style={passWarn ? { borderColor: 'red' } : {}}
          value={userPassword}
          onChange={setPass}
        />
        <input id={css.submit} type="submit" value="Sign in" />
      </form>
    </div>
  );
};

export default Auth;