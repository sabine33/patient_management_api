import { Request, Response, NextFunction } from "express";
import AuthService from "@/services/auth.service";
class AuthController {
  authService: AuthService = new AuthService();

  index = async (req: Request, res: Response, next: NextFunction) => {
    res.success({ status: true, message: "Hello from Auth Controller." });
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const response = await this.authService.signIn({ email, password });
    res.success({
      message: "User logged in successfully.",
      data: response,
      status: true,
    });
  };
  regenerateToken = async (req: Request, res: Response, next: NextFunction) => {
    const { token, email } = req.body;
    const response = await this.authService.regenerateToken({
      token,
      email,
    });
    res.success({
      message: "User token regenerated successfully.",
      data: response,
      status: true,
    });
  };

  signup = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const response = await this.authService.signUp({
      email,
      password,
    });
    res.success({
      message: "User signed up successfully.",
      data: response,
      status: true,
    });
  };
}
export default new AuthController();
