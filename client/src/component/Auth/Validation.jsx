import * as Yup from 'yup';

// Mirror backend validation rules from allvalidation.js
export const signupValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces')
    .min(2, 'Name must be at least 2 characters'),

  email: Yup.string()
    .trim()
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'),

  password: Yup.string()
    .trim()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Password must be at least 8 characters with at least 1 letter and 1 number'
    ),

  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),

  gender: Yup.string()
    .required('Please select a gender')
    .oneOf(['male', 'female', 'other'], 'Invalid gender selection'),
});
