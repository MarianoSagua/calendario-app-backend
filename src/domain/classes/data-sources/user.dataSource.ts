interface UserData {
  name: string;
  email: string;
  password: string;
}

interface User {
  name: string;
  id: string;
  token: string;
}

interface UserFoundByEmail {
  name: string;
  email: string;
  password: string;
  id?: string;
}

export abstract class UserDataSource {
  abstract findByEmail(email: string): Promise<UserFoundByEmail | null>;
  abstract createUser(userData: UserData): Promise<User>;
}
