import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors"; 

export const isValidId = async (req, res, next) => {
    const { Id } = req.params;
    if (!isValidObjectId(Id)) {
        next(createHttpError(404, `${Id} not valid`));
    }
    next();
};