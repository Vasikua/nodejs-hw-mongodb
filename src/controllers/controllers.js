import { getAllContacts, getContactById } from "../services/contacts";
import createHttpError from "http-errors";

export const getAllContactsController = async (req, res, next) => {
    try {
        const contacts = await getAllContacts();
        res.status(200).json({
          status: 'sucses',
            data: contacts,
            });
    } catch (error) {
        next(error);

    }
        
        
  };
  
  export const getContactByIdController = async (req, res,next) => {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);
        if (!contact) {
            next(createHttpError(404, 'Contact not found'));
            return;
      }
     
      res.json({
        status: 200,
        message:`Successfully found contact with id ${contactId}!`,
        data: contact,
         
        });
    };