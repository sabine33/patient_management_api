import { IUser } from "@/interfaces/user.interface";
import AuthService from "../../services/auth.service";
import Container from "typedi";
import { object } from "zod";

describe("The AuthenticationService", () => {
  describe("when registering a user", () => {
    describe("if the email is not taken", () => {
      it("should not throw an error", async () => {
        const userData: Partial<IUser> = {
          email: "john@smith.com",
          password: "strongPassword123",
        };
        process.env.JWT_SECRET = "jwt_secret";

        const authenticationService = new AuthService();
        await expect(
          authenticationService.signIn({
            email: userData.email,
            password: userData.password,
          })
        ).resolves.toBeDefined();
      });
    });
  });
});
