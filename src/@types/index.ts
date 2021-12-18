declare namespace Express {
  export interface Request {
    user: {
      id: string;
      first_name: string;
      last_name: string
    };
  }
}
