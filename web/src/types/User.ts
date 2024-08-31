export type User = {
  username?: string;
  password?: string;
  isAccountNonExpired?: boolean;
  isAccountNonLocked?: boolean;
  isCredentialsNonExpired?: boolean;
  isEnabled?: boolean;
};

export type LoggedUser = {
  username?: string;
  acessToken?: string;
  refreshToken?: string;
};
