import { Router } from "express";
import {
        getAllContactsController,
        getContactByIdController,
        createNewContactController,
        deleteContactController,
        upsetContactController,
        patchContactController,
                                  } from "../controllers/contacts.js"; 
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema } from "../validation/contacts.js";
import { updateContactSchema } from "../validation/contacts.js";
// import { isValidId } from "../middlewares/isValidId.js";

const contactRouter = Router();

contactRouter.get('/contacts', ctrlWrapper (getAllContactsController));
contactRouter.get('/contacts/:contactId',  ctrlWrapper (getContactByIdController));
contactRouter.post('/contacts',validateBody(createContactSchema) ,ctrlWrapper(createNewContactController));  
contactRouter.delete('/contacts/:contactId',  ctrlWrapper(deleteContactController));
contactRouter.put('/contacts/:contactId',  ctrlWrapper(upsetContactController));
contactRouter.patch('/contacts/:contactId', validateBody(updateContactSchema), ctrlWrapper(patchContactController));
contactRouter.use('*', (req, res, next) => {
  res.status(404).json({
      status: 404,
      message: 'Not found',
    });
    next();
  });


export default contactRouter;