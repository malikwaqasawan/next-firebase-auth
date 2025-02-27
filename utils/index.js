export const validateForm = (email, password) => {
  let isFormValid = true;
  const errors = { email: '', password: '' };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    errors.email = 'Email is invalid';
    isFormValid = false;
  }

  if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters long.';
    isFormValid = false;
  }

  return { isFormValid, errors };
};
