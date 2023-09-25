import express from 'express';
import { loginHandler, logoutHandler, refreshAccessTokenHandler, registerHandler } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { createUserSchema, loginUserSchema } from '../schema/user.schema';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const router = express.Router();

// Register user route
router.post('/register', validate(createUserSchema), registerHandler);

// Login user route
router.post('/login', validate(loginUserSchema), loginHandler);

// Refresh access token route
router.get('/refresh', refreshAccessTokenHandler);

// Logout User
router.get('/logout', deserializeUser, requireUser, logoutHandler);

export default router;
