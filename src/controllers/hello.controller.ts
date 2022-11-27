import { IHelloController } from "@/interfaces/hello.interface";
import { Request, Response, NextFunction } from "express";

class HelloController implements IHelloController {
  async index(req: Request, res: Response, next: NextFunction) {
    res.success({ message: "Hello From PPM API." });
  }
}
export default new HelloController();
