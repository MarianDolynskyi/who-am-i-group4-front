import ScreenWrapper from '../../components/wrappers/screen-wrapper/screen-wrapper';
import GameTitle from '../../components/game-title/game-title';
import Input from '../../components/Input/Input';
import InputPassword from '../../components/Input/InputPassword';
import Btn from '../../components/btn/btn';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { registrationUser } from '../../services/users-service';
import {
  SIGN_IN,
  RGX_PASS,
  RGX_USERNAME,
  RGX_EMAIL,
} from '../../constants/constants';
import './create-account.scss';

function CreateAccount() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const formIsValid =
    RGX_PASS.test(password) &&
    RGX_EMAIL.test(email) &&
    !RGX_USERNAME.test(username) &&
    email.length >= 3 &&
    email.length < 256 &&
    username.length >= 2 &&
    username.length < 51;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await registrationUser(username, email, password);
      navigate(SIGN_IN);
      setError('');
    } catch (error) {
      if (error.request?.status === 400) {
        setError('This email is already used');
      }
      alert(error);
    }
  };

  return (
    <ScreenWrapper>
      <GameTitle />
      <form className="form-wrapper" onSubmit={submitHandler}>
        <Input
          type="text"
          name="username"
          value={username}
          onChange={(e) => usernameHandler(e)}
          placeholder="Username"
        />
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => emailHandler(e)}
          placeholder="Email"
          className={error && 'error'}
        />
        {error && <p className="error-message">{error}</p>}
        <InputPassword
          name="password"
          value={password}
          onChange={(e) => passwordHandler(e)}
          placeholder="Password"
        />
        <div className="btn-form-wrapper">
          <Btn
            className={'btn-pink-solid'}
            onClick={() => {
              navigate('/');
              setError('');
            }}
          >
            Cancel
          </Btn>
          <Btn disabled={!formIsValid} type="submit">
            create account
          </Btn>
        </div>
      </form>
    </ScreenWrapper>
  );
}

export default CreateAccount;
