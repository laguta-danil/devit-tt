import * as Yup from 'yup';

export const SignipSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Login must contain 3 characters').max(50, 'Login too long').required('Required'),
  password: Yup.string().min(3, 'Password must contain 3 characters').max(50, 'Password too long').required('Required')
});
