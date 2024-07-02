// import { raw } from "express";
import { contactsCollection } from "../db/models/contact.js";
import { calcPaginationData } from "../utils/calcPaginationData.js";


export const getAllContacts = async ({filter, page, perPage, sortBy = "_id", sortOrder = "asc" }) => {
    const skip = (page - 1) * perPage;
    const dataBaseQuery = contactsCollection.find();
    if (filter.contactType) {
        dataBaseQuery.where("contactType").equals(filter.contactType);
    };
    if (filter.isFavourite) {
        dataBaseQuery.where("isFavourite").equals(filter.isFavourite);
     };
    
    
    const data = await dataBaseQuery.skip(skip).limit(perPage).sort({ [sortBy]: sortOrder });
    const totalItems = await contactsCollection.find().merge(dataBaseQuery).countDocuments();
    const { totalPages, hasNextPage, hasPreviousPage } = calcPaginationData({total: totalItems, page, perPage});
    
    return {
        data,
        page,
        perPage,
        totalItems,
        totalPages,
        hasNextPage,
        hasPreviousPage,
    };
       
};

export const getContactById = async (contactId) => {
    const contact = await contactsCollection.findById(contactId);
    return contact;
};
export const createContact = async (payload) => {
    const contact = await contactsCollection.create(payload);
    return contact;
};

export const deleteContact = async (contactId) => {
    const contact = await contactsCollection.findOneAndDelete({
        _id: contactId,
    });
    return contact;
};
export const updateContact = async (contactId, payload, options = {}) => {
    const rawResult = await contactsCollection.findOneAndUpdate({
        _id: contactId,
    },
        payload,
        {
            // new: true, 
            // runValidators: true, 
            includeResultMetadata: true,
            ...options,
        },);
    if (!rawResult || !rawResult.value) return null;
    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};