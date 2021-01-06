export interface User {
  _id: string;
  username: string;
  password: string;
  gender: string;
  role: string;
  researchCenter: string;
}

export interface TokenData {
  key: string;
  expiresIn: number;
}

export interface DataInToken {
  _id: string;
  username: string;
}
