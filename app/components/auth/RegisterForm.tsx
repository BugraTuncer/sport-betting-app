import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/common/Button';
import Input from '~/components/common/Input';
import type { RegisterFormProps } from '~/models/auth';
import EyeIcon from 'public/icons/EyeIcon';

export default function RegisterForm({ onSubmit, error, loading }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create new account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                E-mail
              </label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-primary focus:outline-none rounded-md"
                placeholder="E-mail"
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
                  type={showPassword.password ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-primary focus:outline-none rounded-md"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() =>
                    setShowPassword({ ...showPassword, password: !showPassword.password })
                  }
                >
                  <EyeIcon isVisible={showPassword.password} />
                </Button>
              </div>
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-primary focus:outline-none rounded-md"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <Button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      confirmPassword: !showPassword.confirmPassword,
                    })
                  }
                >
                  <EyeIcon isVisible={showPassword.confirmPassword} />
                </Button>
              </div>
            </div>
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <div className="flex flex-col gap-4">
            <Button disabled={loading} onClick={handleSubmit}>
              {loading ? 'Loading...' : 'Register'}
            </Button>
            <Button onClick={() => navigate('/login')}>Already have an account?</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
