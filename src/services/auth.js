import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';

import { userCollection } from "../db/models/user.js";
import { SMTP } from "../constants/index.js";
import { env } from "../utils/env.js";
import { sendEmail } from "../utils/sendMail.js";
import { TEMPLATES_DIR } from "../constants/index.js";
import {
    getFullNameFromGoogleTokenPayload,
    validateCode
} from "../utils/googleOAuth2.js";
import { randomBytes } from "node:crypto";
import { createSession } from "./session.js";
import { sessioCollection } from "../db/models/session.js";

export const findUser = filter => userCollection.findOne(filter); 

export const registerUser = async (data) => {
    const { password } = data;
    const hashPassword = await bcrypt.hash(password, 10);
    return await userCollection.create({...data, password:hashPassword});

};

export const requestResetToken = async (email) => {
    const user = await userCollection.findOne({ email });
    if (!user) {
        throw createHttpError(404, 'User not found');
    }
    const resetToken = jwt.sign({
        sub: user._id,
        email,
    },
        env('JWT_SECRET'),
        {
            expiresIn: '5m',
        }
    );
    const resetPasswordTemplatePath = path.join(
        TEMPLATES_DIR,
        'reset-password-email.html',
    );
    const templatesSource = (
        await fs.readFile(resetPasswordTemplatePath)).toString();
    const template = handlebars.compile(templatesSource);
    const html = template({
        name: user.name,
        link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`,
        });
    
    
        await sendEmail({
            from: env(SMTP.SMTP_FROM),
            to: email,
            subject: 'Reset your password',
            html,
        });
    console.log(email);
};

export const resetPassword = async (payload) => {
  let entries;
    try {
    entries = jwt.verify(payload.token, env('JWT_SECRET'));
  } catch (err) {
        if (err instanceof Error) throw createHttpError(401, err.message);
    throw err;
    }
    
    const user = await userCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });
    
    if (!user) {
        throw createHttpError(404, 'User not found');
    }
     const encryptedPassword = await bcrypt.hash(payload.password, 10);
    
    await userCollection.updateOne(
        { _id: user._id },
        { password: encryptedPassword },
    );

};



export const loginOrSignupWithGoogle = async (code) => {
    const loginTicket = await validateCode(code);
    const payload = loginTicket.getPayload();
    if (!payload) throw createHttpError(401);
    
    let user = await userCollection.findOne({email: payload.email});

    if (!user) {
        const password = await bcrypt.hash(randomBytes(10), 10);
        user = await userCollection.create({
            email: payload.email,
            name: getFullNameFromGoogleTokenPayload(payload),
            password,
            role: 'parent',
        }); 
    };

    const newSession = createSession();
    return await sessioCollection.create({
        userId: user._id,
        ...newSession,
    });
};