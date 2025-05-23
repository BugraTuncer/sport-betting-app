import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, signIn, signInWithGoogle } from '~/store/slices/authSlice';
import type { RootState, AppDispatch } from '~/store';
import LoginForm from '~/components/auth/LoginForm';

export default function LoginContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (formData: { email: string; password: string }) => {
      try {
        await dispatch(signIn(formData)).unwrap();
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    },
    [dispatch, navigate]
  );

  const handleGoogleLogin = useCallback(async () => {
    try {
      await dispatch(signInWithGoogle()).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Google login failed:', error);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <LoginForm
      onSubmit={handleSubmit}
      error={error}
      loading={loading}
      onGoogleLogin={handleGoogleLogin}
    />
  );
}
