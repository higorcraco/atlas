export type User = {
  username?: string;
  password?: string;
};

export type LoggedUser = {
  username?: string;
  acessToken?: string;
  refreshToken?: string;
};
