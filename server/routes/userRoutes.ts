import { Router } from 'express';
import { signUp, logIn, protect, Me, logOut } from '../controllers/userController';

const router = Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/me', protect, Me);
router.get('/logout', logOut);

export = router;
