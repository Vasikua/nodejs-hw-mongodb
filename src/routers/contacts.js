import { Router } from "express";
import {
  getAllContactsController,
  getContactByIdController,
  createNewContactController,
  deleteContactController,
  upsetContactController,
  patchContactController,
} from "../controllers/controllers"; 
import { ctrlWrapper } from "../utils/ctrlWrapper";

const router = Router();

router.get('/contacts', ctrlWrapper (getAllContactsController));
router.get('/contacts/:contactId', ctrlWrapper (getContactByIdController));
router.post('/contacts', ctrlWrapper(createNewContactController));  
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.put('/contacts/:contactId', ctrlWrapper(upsetContactController));
router.patch('/contacts/contactId', ctrlWrapper(patchContactController));
router.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
    next();
  });


export default router;