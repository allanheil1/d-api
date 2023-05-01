import { cannotBookError, notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import bookingRepository from '@/repositories/booking-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import roomRepository from '@/repositories/room-repository';

async function getBookings(userId: number) {
  const booking = await bookingRepository.getBookingsByUserId(userId);
  if (!booking) throw notFoundError();
  return booking;
}

async function checkEnrollmentAndTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw cannotBookError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotBookError();
  }
}

async function validateBooking(roomId: number) {
  const room = await roomRepository.getRoomById(roomId);
  const bookings = await bookingRepository.getBookingsByRoomId(roomId);

  if (!room) throw notFoundError();

  if (room.capacity <= bookings.length) throw cannotBookError();
}

async function postBooking(userId: number, roomId: number) {
  await checkEnrollmentAndTicket(userId);
  await validateBooking(roomId);

  return bookingRepository.create({ roomId, userId });
}

async function changeBookingById(userId: number, roomId: number) {
  await validateBooking(roomId);
  const booking = await bookingRepository.getBookingsByUserId(userId);

  if (!booking) throw notFoundError();

  if (booking.userId !== userId) throw cannotBookError();

  return bookingRepository.upsertBooking({
    id: booking.id,
    roomId,
    userId,
  });
}

export default { getBookings, postBooking, checkEnrollmentAndTicket, validateBooking, changeBookingById };
