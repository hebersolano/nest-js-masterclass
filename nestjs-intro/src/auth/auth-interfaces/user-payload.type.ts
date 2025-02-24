type TokenData = {
  iat: number;
  exp: number;
  aud: string;
  iss: string;
};

export type RefreshTokenData = TokenData & {
  uid: number;
};

export type AccessTokenData = RefreshTokenData & {
  email: string;
};
