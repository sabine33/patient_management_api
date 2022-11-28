import { Request, Response, NextFunction } from "express";
import UserService from "@/services/user.service";
import { exclude } from "@/helpers";

class UserController {
  userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    const users = await this.userService.getAllUsers();
    res.success({
      status: true,
      data: users,
      message: "Users loaded successfully.",
    });
  };
  profile = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;
    if (!id) {
      throw new Error("Authentication failed.");
    }
    const data = await this.userService.profile(id);
    res.success({
      status: true,
      data: data,
      message: "Profile loaded successfully.",
    });
  };
}
export default new UserController();
