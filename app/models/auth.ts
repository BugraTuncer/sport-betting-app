export interface LoginFormProps {
  onSubmit: (formData: { email: string; password: string }) => void;
  error: string | null;
  loading: boolean;
}

export interface RegisterFormProps {
  onSubmit: (formData: { email: string; password: string; confirmPassword: string }) => void;
  error: string | null;
  loading: boolean;
}
