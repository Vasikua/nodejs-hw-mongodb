import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { registerUserController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { userSingupSchema, /*userSinginSchema*/ } from "../validation/user.js";


const authRouter = Router();

authRouter.post('/auth/register', validateBody(userSingupSchema), ctrlWrapper(registerUserController));
export default authRouter;