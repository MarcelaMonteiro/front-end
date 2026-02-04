import { apiFetch } from "./api";

export type Appointment = {
	id: number;
	petName: string;
	petSize: "SMALL" | "MEDIUM" | "LARGE";
	serviceType: "BATH" | "GROOMING" | "BATH_AND_GROOMING";
	date: string;
	time: string;
	price: number;
};

export async function getMyAppointments(): Promise<Appointment[]> {
	const res = await apiFetch("/appointments/me");
	console.log("STATUS:", res.status);

	if (!res.ok) {
		throw new Error("Erro ao buscar agendamentos");
	}

	return res.json();
}
