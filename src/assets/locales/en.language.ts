export default {
  registerForm: {
    title: 'Angular Signup Form',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    password: 'Password',
    submitButton: 'Register',
    submitSuccess: 'Registered successfully',
    submitError: 'Something went wrong'
  },
  errors: {
    required: '{{ title }} is required',
    pattern: '{{ title }} must be a valid email address',
    minLength: '{{ title }} must be at least 8 characters',
    containName: '{{ title }} should not contain First or Last Name',
    caseLetters: '{{ title }} should lower and uppercase letters'
  }
};
