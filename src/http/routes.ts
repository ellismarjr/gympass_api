import type { FastifyInstance } from "fastify";
import { userRegister } from "./controllers/users/users-register";

export async function appRoutes(app: FastifyInstance) {
	app.post("/users", userRegister);
}
