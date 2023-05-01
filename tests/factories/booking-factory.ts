import faker from '@faker-js/faker';
import { Booking } from '@prisma/client';
import { prisma } from '@/config';

type CreateParameters = {
  userId: number;
  roomId: number;
};

export function createBooking({ userId, roomId }: CreateParameters) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}
