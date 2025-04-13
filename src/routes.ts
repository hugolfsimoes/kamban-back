import { Router } from 'express';
import userRoutes from './modules/user/userRoutes';
import boardRoutes from './modules/board/boardRoutes';
import organizationRoutes from './modules/organization/organizationRoutes';
import columnRoutes from './modules/column/collumnRoutes';
import cardRoutes from './modules/card/cardRoutes';
import AuthRoutes from './modules/auth/authRoutes';
import { authMiddleware } from './modules/auth/middleware/authMiddleware';

const router = Router();

router.use('/auth', AuthRoutes);
router.use(authMiddleware);


router.use('/users', userRoutes);
router.use('/boards', boardRoutes);
router.use('/organizations', organizationRoutes);
router.use('/columns', columnRoutes);
router.use('/cards', cardRoutes);



export default router;
