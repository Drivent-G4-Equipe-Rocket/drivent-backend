import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    }
  });
}
async function findHotelsWithRooms() {
  return prisma.hotel.findMany({
    include: {
      Rooms: {
        include: {
          Booking: {
            select: {
              id: true,
              roomId: true,
            }
          }
        }
        
      },
    },
  });
}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
  findHotelsWithRooms
};

export default hotelRepository;
