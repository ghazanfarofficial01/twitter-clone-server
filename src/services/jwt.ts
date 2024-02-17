import { User } from "@prisma/client";
import JWT from "jsonwebtoken"
const JWT_SECRET = "jwtSecret"
  class JWTSevice {
    public static async generateTokenForUser(user: User) {
        const payload = {
            id: user?.id,
            email: user?.email
        };

        const token = JWT.sign(payload,JWT_SECRET);
        return token;
    }
  }

  export default JWTSevice;