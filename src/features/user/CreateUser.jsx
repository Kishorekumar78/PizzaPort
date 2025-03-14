import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';

function CreateUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // Form validation
    if (!username || !password) return;

    // Dummy check for username and password
    if (username !== password) {
      setFormError(true);

      return;
    }

    dispatch(updateName(username));

    navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-8 text-sm text-stone-600 md:text-base">
        👋 Hi, Please enter your credentials
      </p>

      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setFormError(false);
          }}
          className="input mb-8 w-72"
        />
      </div>
      <input
        type="password"
        placeholder="Password"
        className="input mb-8 w-72"
        onChange={(e) => {
          setPassword(e.target.value);
          setFormError(false);
        }}
      />

      {formError && (
        <p className="mb-8 text-sm text-red-400 md:text-base text-error">
          Credentials doesn't match, Please retry..
        </p>
      )}

      <div>
        <Button type="primary" className="w-72">Login</Button>
      </div>
    </form>
  );
}

export default CreateUser;
