export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface InputErrors {
  required?: boolean;
  pattern?: boolean;
  minlength?: boolean;
  containName?: boolean;
  caseLetters?: boolean;
}
