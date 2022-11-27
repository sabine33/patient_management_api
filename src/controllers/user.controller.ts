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

  updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;
    if (!id) {
      throw new Error("Authentication failed.");
    }
    const updatedInfo = req.body;
    updatedInfo.password = updatedInfo?.password || null;

    updatedInfo.password_again = updatedInfo?.password_again || null;

    if (updatedInfo?.password_again !== updatedInfo?.password) {
      throw new Error("Both password must be same.");
    }

    let updatedUser = await this.userService.updateProfile(
      id,
      updatedInfo?.username,
      updatedInfo?.password
    );

    res.success({
      status: true,
      data: updatedUser,
      message: "Profile updated successfully.",
    });
  };

  updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;
    if (!id) {
      throw new Error("Authentication failed.");
    }
    const { password } = req.body;
    const updatedUser = await this.userService.updatePassword(id, password);
    res.success({
      status: true,
      data: exclude(updatedUser, password),
      message: "Password updated successfully.",
    });
  };
}
export default new UserController();
