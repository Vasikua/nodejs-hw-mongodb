import { model, Schema } from "mongoose";


const sessionSchema = new Schema({
    userId: {
        type: String,
        required: true,

    },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    accessTokenValidUntil: {
        Date: true,
        required: true,
    },
    refreshTokenValidUntil: {
        Date: true,
        required: true,
    },
});

export const sessioCollection = model('session', sessionSchema);