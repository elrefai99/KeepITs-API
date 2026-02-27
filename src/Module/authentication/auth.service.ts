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
     // public async login(email: string, password: string) {
     //      const user = await this.user_model.findOne({ email });
     //      if (!user) {
     //           throw new Error("User not found");
     //      }
     //      return user;
     // }

     public async check_user_exists(email: string) {
          const user = await this.user_model.findOne({ email: email.toLowerCase(), status: EUserStatus.ACTIVE }, { _id: 1 });
          if (user) {
               throw new Error("User already exists");
          }
          return user;
     }

}
