import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { changeBooking, getBookings, postBooking } from '@/controllers';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getBookings)
  .post('/', postBooking)
  .put('/:bookingId', changeBooking);

export { bookingRouter };
