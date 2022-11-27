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
  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const response = await this.authService.forgotPassword({ email });
    res.success({
      data: response,
      message: "Token sent successfully.",
    });
  };
  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, token } = req.body;
    const response = await this.authService.resetPassword({
      email,
      password,
      token,
    });
    res.success({
      data: response,
      message: "Password updated successfully.",
    });
  };

  validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const { id, token } = req.body;
    const isValid = await this.authService.validateToken(
      Number.parseInt(id),
      token
    );
    res.success({
      status: isValid,
      message: isValid ? "Token is valid." : "Token is invalid",
    });
  };
}
export default new AuthController();
