import type { CheckIn, Prisma, User } from "@prisma/client";
import type { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInsRepository {
	private checkIns: CheckIn[] = [];

	async create(data: Prisma.CheckInUncheckedCreateInput) {
		const checkIn = {
			id: randomUUID(),
			gym_id: data.gym_id,
			user_id: data.user_id,
			created_at: new Date(),
			validated_at: data.validated_at ? new Date(data.validated_at) : null,
		};

		this.checkIns.push(checkIn);
		return checkIn;
	}
}
