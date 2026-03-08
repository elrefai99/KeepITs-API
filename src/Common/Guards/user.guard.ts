import { NextFunction, Request, RequestHandler, Response } from "express";
import { createPublicKey } from "node:crypto"
import { V4 } from "paseto"
import { asyncHandler } from "../decorators/api-requesthandler";
import ServerError from "../decorators/api-errors";
import { UserModel } from "../../Module/user/Schema/User.schema"
import { EUserStatus } from "../../Common/enum"

export const userGuard: RequestHandler = asyncHandler(
     async (req: Request, _res: Response, next: NextFunction) => {
          const token: string | undefined = req.cookies.__ESAA
          if (!token) {
               next(new ServerError("Access token not found", 401))
               return
          }

          const publicKey = createPublicKey(process.env.PUBLIC_ACCESS_TOKEN_SECRET as string)
          await V4.verify(token, publicKey).then(async (payload: any) => {

               const user = await UserModel.findOne({ _id: payload.data.user_id, status: EUserStatus.ACTIVE }, { _id: 1 })
               if (!user) {
                    next(new ServerError("User not found", 404))
                    return
               }
               req.user = user
               next()
               return
          }).catch((err) => {
               next(new ServerError(`Invalid access token: ${err}`, 401))
               return
          })
     }
)
