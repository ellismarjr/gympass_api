import type { Gym } from "@prisma/client";
import type { GymsRepository } from "@/repositories/gyms-repository";

type Params = {
	userLatitude: number;
	userLongitude: number;
};

interface FetchNearbyGymsUseCaseResponse {
	gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
	constructor(private gymsRepository: GymsRepository) {}

	async execute({
		userLatitude,
		userLongitude,
	}: Params): Promise<FetchNearbyGymsUseCaseResponse> {
		const gyms = await this.gymsRepository.findManyNearby({
			latitude: userLatitude,
			longitude: userLongitude,
		});

		return {
			gyms,
		};
	}
}
