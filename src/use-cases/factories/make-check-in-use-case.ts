import { PrismaCheckInsRepository } from "@/repositories/prisma-check-ins-repository";
import { CheckInUseCase } from "../check-in";
import { PrismaGymsRepository } from "@/repositories/prisma-gyms-repository";

export function makeCheckInUseCase() {
	const prismaCheckInsRepository = new PrismaCheckInsRepository();
	const gymsRepository = new PrismaGymsRepository();
	const checkInUseCase = new CheckInUseCase(
		prismaCheckInsRepository,
		gymsRepository,
	);

	return checkInUseCase;
}
