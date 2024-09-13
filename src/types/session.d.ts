type RegisterFormValues = {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  passwordhash: string;
};

type LoginFormValues = {
  email: string;
  passwordhash: string;
};

type User = {
  iduser: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  role: string;
}