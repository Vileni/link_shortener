import { Router } from 'express';
import { createShortUrl, getAllMyInfo, redirect } from '../controllers/urlController';
import { alreadyIn, beforeRedirect, logIn, protect } from '../controllers/userController';

const router = Router();

router.post('/login', logIn);
router.post('/create', alreadyIn, createShortUrl);
router.post('/redirect/:ending', beforeRedirect, redirect);
router.get('/getallmyinfo', protect, getAllMyInfo);

export default router;
