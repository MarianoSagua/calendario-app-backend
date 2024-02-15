import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { jwtGenerator } from "../../config";
import { UserRepository } from "../../domain";

interface AuthenticatedRequest extends Request {
  uid?: string;
  name?: string;
}

export class AuthController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  registerUser = async (req: AuthenticatedRequest, res: Response) => {
    const { email, password, name } = req.body;

    try {
      let user = await this.userRepository.findByEmail(email);

      if (user != null) {
        return res.status(400).json({
          ok: false,
          msg: "User already exist !!",
        });
      }

      const userData = {
        name,
        email,
        password,
      };

      const newUser = await this.userRepository.createUser(userData);

      res.status(201).json({
        ok: true,
        msg: "Succesfull Register!!",
        name,
        uid: newUser.id,
        token: newUser.token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Please talk to the administrator!!",
      });
    }
  };

  loginUser = async (req: AuthenticatedRequest, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        return res.status(400).json({
          ok: false,
          msg: "No user has been found with that email!!",
        });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({
          ok: false,
          msg: "Incorrect Password!!",
        });
      }

      const token = await jwtGenerator(user.id, user.name);

      res.json({
        ok: true,
        msg: "Successfull Login!!",
        uid: user.id,
        name: user.name,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: "Please talk to the administrator!!",
      });
    }
  };

  renewToken = async (req: AuthenticatedRequest, res: Response) => {
    const { uid, name } = req;
    const token = await jwtGenerator(uid, name!);

    res.json({
      ok: true,
      msg: "Token Renewed!",
      uid,
      name,
      token,
    });
  };
}
