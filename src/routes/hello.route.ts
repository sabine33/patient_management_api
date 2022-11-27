import HelloController from "../controllers/hello.controller";
import { Request, Response, Router } from "express";

const router = Router();
export default () => {
  router.get("/", HelloController.index);

  return router;
};
