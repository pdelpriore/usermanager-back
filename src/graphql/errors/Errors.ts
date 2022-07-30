export const ErrorCodes = {
  "23505-email": "UNIQUE_EMAIL",
};

export enum ErrorResponse {
  ISEMAIL_EMAIL = "ISEMAIL_EMAIL",
  MINLENGTH_PASSWORD = "MINLENGTH_PASSWORD",
  MINLENGTH_LOGIN = "MINLENGTH_LOGIN",
  MINLENGTH_FIRSTNAME = "MINLENGTH_FIRSTNAME",
  MINLENGTH_LASTNAME = "MINLENGTH_LASTNAME",
  UNIQUE_EMAIL = "UNIQUE_EMAIL",
}

interface IErrorTypes {
  [key: string]: string;
}

export const ErrorTypes: IErrorTypes = {
  [ErrorResponse.ISEMAIL_EMAIL]: "Niepoprawny adres email.",
  [ErrorResponse.MINLENGTH_PASSWORD]: "Hasło musi zawierać conajmniej 8 znaków",
  [ErrorResponse.MINLENGTH_LOGIN]: "Login musi zawierać conajmniej 3 znaki",
  [ErrorResponse.MINLENGTH_FIRSTNAME]: "Imię musi zawierać conajmniej 3 znaki",
  [ErrorResponse.MINLENGTH_LASTNAME]:
    "Nazwisko musi zawierać conajmniej 3 znaki",
  [ErrorResponse.UNIQUE_EMAIL]: "Podany adres email jest już zajęty",
};
