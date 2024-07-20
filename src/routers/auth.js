import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
    registerUserController,
    loginUserController,
    refreshUserController,
    singoutController,
    loginWithGoogleController
} from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
    userSingupSchema,
    userSinginSchema,
    loginWithGoogleOAuthSchema,
   } from "../validation/user.js";
import {
    requestResetEmailSchema,
    resetPasswordSchema
} from "../validation/auth.js"; 
import {
    requestResetEmailController,
    resetPasswordController,
    getGoogleOAuthUrlController,
} from "../controllers/auth.js";

const authRouter = Router();

authRouter.post('/auth/register', validateBody(userSingupSchema), ctrlWrapper(registerUserController));
authRouter.post('/auth/login', validateBody(userSinginSchema), ctrlWrapper(loginUserController));
authRouter.post('/auth/refresh', ctrlWrapper(refreshUserController));
authRouter.post('/auth/logout', ctrlWrapper(singoutController));
authRouter.get('/auth/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));
authRouter.post('/auth/confirm-oauth', validateBody(loginWithGoogleOAuthSchema), ctrlWrapper(loginWithGoogleController));
authRouter.post('/auth/send-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));
authRouter.post('/auth/reset-pwd', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

export default authRouter;