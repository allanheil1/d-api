import { Booking } from '@prisma/client';
import { prisma } from '@/config';

type CreateParameters = Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateParameters = Omit<Booking, 'createdAt' | 'updatedAt'>;

async function create({ roomId, userId }: CreateParameters) {
  return prisma.booking.create({
    data: {
      roomId: roomId,
      userId: userId,
    },
  });
}

async function getBookingsByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId: roomId,
    },
    include: {
      Room: true,
    },
  });
}

async function getBookingsByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId: userId,
    },
    include: {
      Room: true,
    },
  });
}

async function upsertBooking({ id, roomId, userId }: UpdateParameters) {
  return prisma.booking.upsert({
    where: {
      id: id,
    },
    create: {
      roomId: roomId,
      userId: userId,
    },
    update: {
      roomId: roomId,
    },
  });
}

export default { create, getBookingsByRoomId, getBookingsByUserId, upsertBooking };
