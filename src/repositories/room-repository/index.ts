import { prisma } from '@/config';

async function getRoomsByHotelId(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId: hotelId,
    },
  });
}

async function getRoomById(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });
}

const roomRepository = {
  getRoomsByHotelId,
  getRoomById,
};

export default roomRepository;
