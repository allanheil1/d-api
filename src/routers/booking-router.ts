import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getBookings, postBooking } from '@/controllers';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken).get('/', getBookings).post('/', postBooking);

export { bookingRouter };
