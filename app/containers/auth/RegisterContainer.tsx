import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, signUp } from '~/store/slices/authSlice';
import type { RootState, AppDispatch } from '~/store';
import RegisterForm from '~/components/auth/RegisterForm';

export default function RegisterContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (formData: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      await dispatch(signUp({ email: formData.email, password: formData.password })).unwrap();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return <RegisterForm onSubmit={handleSubmit} error={error} loading={loading} />;
}
