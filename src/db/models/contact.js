import { model, Schema } from "mongoose";
import { moongoseSaveError, setUpadateSettings } from "./hooks.js";

const contactShema = new Schema(

    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
        },
        isFavourite: {
            type: Boolean,
            default: false,
            required: false,
        },
        contactType: {
            type: String,
            required: false,
            default:'personal',
            enum: ['work','home','personal'],
            
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

contactShema.post("save", moongoseSaveError);

contactShema.pre("findOneAndUpdate", setUpadateSettings );

contactShema.post("findOneAndUpdate", moongoseSaveError);

export const contactsCollection = model('contacts', contactShema);
