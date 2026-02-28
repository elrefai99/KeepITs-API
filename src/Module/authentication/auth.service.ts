import ServerError from "../../Common/decorators/api-errors";
import { EUserStatus } from "../../Common/enum";
import { UserModel } from "../user/Schema/User.schema";
import { RegisterDTO } from "./DTO";

export class auth_service {
     constructor(private readonly user_model: typeof UserModel) { }


     public async register(user: RegisterDTO) {
          const newUser = await this.user_model.create(user);
          return {
               status: "success",
               data: newUser
          };
     }
     public async login(data: { email: string, password: string }) {
          const user = await this.user_model.findOne({ email: data.email.toLowerCase(), status: EUserStatus.ACTIVE });
          if (!user) {
               throw new ServerError("Invalid email or password", 400);
          }
          const isPasswordValid = await user?.comparePassword(data.password);
          if (!isPasswordValid) {
               throw new ServerError("Invalid email or password", 400);
          }
          return {
               status: "success",
               data: user
          };
     }

     public async check_user_exists(email: string) {
          const user = await this.user_model.findOne({ email: email.toLowerCase(), status: EUserStatus.ACTIVE }, { _id: 1 });
          if (user) {
               throw new Error("User already exists");
          }
          return user;
     }

}
