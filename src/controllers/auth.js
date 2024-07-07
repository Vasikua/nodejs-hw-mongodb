import createHttpError from "http-errors";
import { registerUser, findUser } from "../services/auth.js";
 
export const registerUserController = async (req, res) => {
    const { email } = req.body;
    const userOne = await findUser({ email });
    
    if (userOne ) {
        
        throw createHttpError(401, "Email is use");
    }
    const user = await registerUser(req.body);
    const data = { 
        name: user.name,
        email: user.email,
    };

    res.json({
        status: 201,
        message: 'user successfully registered',
        data,
    });
};