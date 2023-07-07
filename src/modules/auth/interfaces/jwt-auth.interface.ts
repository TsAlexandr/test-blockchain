export interface JwtAuthInterface {
  access: JwtTokenInterface;
  refresh: JwtTokenInterface;
}
interface JwtTokenInterface {
  secret: string;
  expiresIn: number;
}
