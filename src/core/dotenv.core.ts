import path from "node:path";
import dotenv from "dotenv";

const env_file = process.env.NODE_ENV === "devMode" ? ".env.dev" : ".env"
export default dotenv.config({
     path: path.resolve(process.cwd(), env_file)
})
