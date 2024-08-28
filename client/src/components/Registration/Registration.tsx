import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ErrorComp from '../ErrorComp/ErrorComp';
import { SERVER_LINK } from '../../main';
import css from './Registration.module.css'
import Loader from '../Loader/Loader';

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')
  const [nameWarn, setNameWarn] = useState(false)
  const [passWarn, setPassWarn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState('');

  function setName(e: { target: { value: React.SetStateAction<string>; }; }) {
    setNameWarn(false);
    setUserName(e.target.value);
  }

  function setPass(e: { target: { value: React.SetStateAction<string>; }; }) {
    setPassWarn(false);
    setUserPassword(e.target.value);
  }

  function registration(e: { preventDefault: () => void; }) {
    e.preventDefault();

    if (userName === '') {
      setNameWarn(true);
      return
    }
    if (userPassword === '') {
      setPassWarn(true);
      return
    }

    setIsLoading(true)
    const newUser = {
      name: userName,
      password: userPassword,
    }

    const res = fetch(`${SERVER_LINK}/todo/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(newUser)
    })

    res.then(() => {
      localStorage.setItem('toDoUser', JSON.stringify(
        {
          name: userName,
          password: userPassword,
        }
      ));
      navigate(`/todo/${userName}`);
    }).catch(() => {
      setErrorText('Registration Error');
    }).finally(() => {
      setIsLoading(false)
    })
  }

  useEffect(() => {
    const userFromStorage = localStorage.getItem('toDoUser');
    if (userFromStorage) {
      const user = JSON.parse(userFromStorage);
      navigate(`/todo/${user.name}`);
    }
  }, [navigate, userName])

  return (
    <div className={css.wrap}>
      <span>Welcome to the <b>ToDo App</b></span>
      <span>Please create a user</span>
      <p>Already have an account? <Link to={'/auth'}>Sign in</Link></p>
      {errorText !== '' && <ErrorComp text={errorText} />}
      <form id={css.regForm} onSubmit={registration}>
        <input
          className={css.inp}
          name='name'
          placeholder='Name'
          style={nameWarn ? { borderColor: 'red' } : {}}
          type="text"
          value={userName}
          autoComplete='false'
          onChange={setName}
        />
        <input
          className={css.inp}
          placeholder='Password'
          name='Password'
          style={passWarn ? { borderColor: 'red' } : {}}
          type="text"
          value={userPassword}
          autoComplete='false'
          onChange={setPass}
        />
        <input id={css.submit} type="submit" value="Create user" />
      </form>

      {isLoading && <Loader passedText={'This can take a long time because of using a free plan to deploy the server'} />}
    </div>
  );
};

export default Registration;