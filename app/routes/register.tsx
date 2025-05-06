import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../store/slices/authSlice';
import type { RootState, AppDispatch } from '../store';
import Button from '~/components/common/Button';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      await dispatch(signUp({ email, password })).unwrap();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create new account
          </h2>
        </div>
        <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                E-mail
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-primary focus:outline-none rounded-md"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-primary focus:outline-none rounded-md"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-primary focus:outline-none rounded-md"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <div className="flex justify-center w-full">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
