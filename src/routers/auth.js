import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
    registerUserController,
    loginUserController,
    refreshUserController,
    singoutController
} from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
    userSingupSchema,
    userSinginSchema,
   } from "../validation/user.js";
import {
    requestResetEmailSchema,
    resetPasswordSchema
} from "../validation/auth.js"; 
import {
    requestResetEmailController,
    resetPasswordController
} from "../controllers/auth.js";

const authRouter = Router();

authRouter.post('/auth/register', validateBody(userSingupSchema), ctrlWrapper(registerUserController));
authRouter.post('/auth/login', validateBody(userSinginSchema), ctrlWrapper(loginUserController));
authRouter.post('/auth/refresh', ctrlWrapper(refreshUserController));
authRouter.post('/auth/logout', ctrlWrapper(singoutController));
authRouter.post('/auth/request-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));
authRouter.post('/auth/reset-pwd', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

export default authRouter;