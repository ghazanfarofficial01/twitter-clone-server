import { User } from "@prisma/client";
import JWT from "jsonwebtoken"
import { JWTUser } from "../interfaces";
const JWT_SECRET = "jwtSecret"
  class JWTSevice {
    public static async generateTokenForUser(user: User) {
        const payload: JWTUser = {
            id: user?.id,
            email: user?.email
        };

        const token = JWT.sign(payload,JWT_SECRET);
        return token;
    }

    public static decodeToken(token: string) {
      try{
        //console.log(token);
        const payload = JWT.verify(token,JWT_SECRET) as JWTUser;
        return payload;
      }
      catch(e){
        console.log(e) 
      }
    }
  }

  export default JWTSevice;