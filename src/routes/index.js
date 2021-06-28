import { Router } from 'express';
import authRoutes from './auth';
import componentRoutes from './components';
import orderRoutes from './orders';
import projectRoutes from './projects';
import userRoutes from './user';

const router = Router();

router.use('/auth', authRoutes);
router.use('/components', componentRoutes);
router.use('/orders', orderRoutes);
router.use('/projects', projectRoutes);
router.use('/users', userRoutes);


export default router;
