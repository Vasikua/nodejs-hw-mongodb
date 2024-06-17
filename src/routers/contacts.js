import { Router } from "express";
import { getAllContactsController, getContactByIdController } from "../controllers/controllers"; 
import { ctrlWrapper } from "../utils/ctrlWrapper";
const router = Router();

router.get('/contacts', ctrlWrapper (getAllContactsController));
router.get('/contacts/:contactId', ctrlWrapper (getContactByIdController));
  
router.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
    next();
  });


export default router;