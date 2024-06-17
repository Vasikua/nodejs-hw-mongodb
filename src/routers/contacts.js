import { Router } from "express";
import { getAllContactsController, getContactByIdController } from "../controllers/controllers"; 

const router = Router();

router.get('/contacts',getAllContactsController);
router.get('/contacts/:contactId',getContactByIdController);
  router.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
    next();
  });


export default router;