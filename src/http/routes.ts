import type { FastifyInstance } from "fastify";
import { userRegister } from "./controllers/users/users-register";
import { authenticate } from "./controllers/auth/authenticate";

export async function appRoutes(app: FastifyInstance) {
	app.post("/users", userRegister);
	app.post("/sessions", authenticate);
}
