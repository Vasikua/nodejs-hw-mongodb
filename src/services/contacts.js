import { contactsCollection } from "../db/models/contact.js";
import { calcPaginationData } from "../utils/calcPaginationData.js";
import { fieldList, sortOrderList } from "../constants/index.js";

export const getAllContacts = async ({filter, page, perPage, sortBy = fieldList[0], sortOrder = sortOrderList[0]}) => {
    const skip = (page - 1) * perPage;
    const dataBaseQuery = contactsCollection.find();
    if (filter.contactType) {
        dataBaseQuery.where("contactType").equals(filter.contactType);
    };
    if (filter.isFavourite) {
        dataBaseQuery.where("isFavourite").equals(filter.isFavourite);
     };
       
    const data = await dataBaseQuery.skip(skip).limit(perPage).sort({[sortBy]: sortOrder});
                 
    const totalItems = await contactsCollection.find().merge(dataBaseQuery).countDocuments();
                                               
    const {totalPages, hasNextPage, hasPreviousPage} = calcPaginationData({total: totalItems, page, perPage});
    
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

export const getContactById = (contactId) => contactsCollection.findById(contactId);

export const createContact = data => contactsCollection.create(data);

export const upsertContact = async (filter, data, options = {}) => {
    const result = await contactsCollection.findOneAndUpdate(filter, data, {
        
            includeResultMetadata: true,
            ...options,
    },);
    
    if (!result || !result.value) return null;
    const isNew = Boolean(result?.lastErrorObject?.upserted);
                  
    return {
        data: result.value,
        isNew,
    };
};

export const deleteContact = filter => contactsCollection.findOneAndDelete(filter);