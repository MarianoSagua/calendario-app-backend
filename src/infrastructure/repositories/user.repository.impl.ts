import { UserDataSource, UserRepository } from "../../domain";

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

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) {}

  async findByEmail(email: string): Promise<UserFoundByEmail | null> {
    return this.userDataSource.findByEmail(email);
  }

  async createUser(userData: UserData): Promise<User> {
    return this.userDataSource.createUser(userData);
  }
}
