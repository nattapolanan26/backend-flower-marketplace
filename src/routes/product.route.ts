import express from 'express';
import {
  createProductHandler, deleteProductHandler, getAllProducts, getProductMe, updateProductHandler,
} from '../controllers/product.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

// upload
import multer from "multer";
import storage from '../middleware/fileStorage';

const upload = multer({ storage: storage });
const router = express.Router();

router.use(deserializeUser, requireUser);

router.get('/', getAllProducts);

router.get('/me/:userId', getProductMe);

router.post('/create', upload.single('file'), createProductHandler);

router.post('/update', upload.single('file'), updateProductHandler);

router.delete('/:id', deleteProductHandler);

export default router;

