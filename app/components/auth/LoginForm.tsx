import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/common/Button';
import Input from '~/components/common/Input';
import type { LoginFormProps } from '~/models/auth';
import GoogleIcon from 'public/icons/GoogleIcon';
import EyeIcon from 'public/icons/EyeIcon';

export default function LoginForm({ onSubmit, error, loading, onGoogleLogin }: LoginFormProps) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent | React.MouseEvent) => {
    onSubmit(formData);
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
        </div>
        <form className="mt-8 space-y-6 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-primary focus:outline-none rounded-md"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-primary focus:outline-none rounded-md"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 cursor-pointer"
                >
                  <EyeIcon isVisible={showPassword} />
                </Button>
              </div>
            </div>
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <div className="flex flex-col gap-4">
            <Button disabled={loading} onClick={handleSubmit}>
              {loading ? 'Loading...' : 'Login'}
            </Button>
            <Button type="button" onClick={() => navigate('/register')}>
              Dont have an account?
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            <Button
              onClick={onGoogleLogin}
              type="button"
              className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 p-2 rounded-md cursor-pointer"
            >
              <GoogleIcon />
              Sign in with Google
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
