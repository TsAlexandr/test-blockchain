export interface JwtPayloadInterface {
  address: string;
}

export interface JwtPayloadRefreshInterface extends JwtPayloadInterface {
  exp: number;
  iat: number;
}
