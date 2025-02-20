import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type StackAuth = {
  Login: undefined;
  ForgotPassword: {email: string, name: string};
  Signup: undefined;
}

export type PropsLogin = NativeStackScreenProps<StackAuth, 'Login'>
export type PropsSignup = NativeStackScreenProps<StackAuth, 'Signup'>;