import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../Common/decorators/api-requesthandler";
import ServerError from "../../../Common/decorators/api-errors";
import { createPublicKey } from "node:crypto"
import { V4 } from "paseto"
import { UserModel } from "../../user/Schema/User.schema"
import { EUserStatus } from "../../../Common/enum"
import cache from "../../../core/local-cache.core";

export const profilePipe: RequestHandler = asyncHandler(
     async (req: Request, _res: Response, next: NextFunction) => {
          const token: string | undefined = req.cookies.access_token
          if (!token) {
               next(new ServerError("Access token not found", 401))
               return
          }

          const publicKey = createPublicKey(process.env.PUBLIC_ACCESS_TOKEN_SECRET as string)
          await V4.verify(token, publicKey).then(async (payload: any) => {
               const cachedUser: any = cache.get(`user_${payload.data.user_id}`)
               if (cachedUser) {
                    req.user = cachedUser
                    next()
                    return
               }
               const user = await UserModel.findOne({ _id: payload.data.user_id, status: EUserStatus.ACTIVE }, { password: 0 })
               if (!user) {
                    next(new ServerError("User not found", 404))
                    return
               }
               cache.set(`user_${payload.data.user_id}`, user)
               req.user = user
               next()
               return
          }).catch((err) => {
               next(new ServerError(`Invalid access token: ${err}`, 401))
               return
          })
     }
)
