import { UserModel } from "../../data";
import { UserDataSource } from "../../domain";
import bcrypt from "bcryptjs";
import { jwtGenerator } from "../../config";

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

export class MongoUserDataSource implements UserDataSource {
  async findByEmail(email: string): Promise<UserFoundByEmail | null> {
    let user = await UserModel.findOne({ email });

    if (user) {
      let userFound = {
        name: user.name,
        email: user.email,
        password: user.password,
        id: user.id,
      };

      return userFound;
    }

    return null;
  }

  async createUser(userData: UserData): Promise<User> {
    let user = await UserModel.create(userData);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(userData.password, salt);

    await user.save();

    const token = await jwtGenerator(user.id, user.name);

    const newUser = {
      name: user.name,
      id: user.id,
      token: token as string,
    };

    return newUser;
  }
}
