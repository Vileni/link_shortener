import { Router } from 'express';
import { createShortUrl, getAllMyInfo, redirect } from '@controller/urlController';
import { alreadyIn, logIn, protect } from '@server/controllers/userController';

const router = Router();

router.post('/login', logIn);
router.post('/create', alreadyIn, createShortUrl);
router.get('/redirect/:ending', alreadyIn, redirect);
router.get('/getallmyinfo', protect, getAllMyInfo);

export default router;
