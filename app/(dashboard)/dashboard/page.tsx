"use client";

import { useEffect, useState } from "react";
import { Appointment, getMyAppointments } from "@/lib/appointments";
import { AppointmentCard } from "@/components/AppointmentCard";
import { useRouter } from "next/navigation";
export default function Dashboard() {
	const [appointments, setAppointments] = useState<Appointment[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getMyAppointments()
			.then(setAppointments)
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return <p className="text-center mt-10">Carregando...</p>;
	}

	if (appointments.length === 0) {
		return (
			<p className="text-center mt-10 text-[#8B7766]">
				Você ainda não tem agendamentos.
			</p>
		);
	}

	return (
		<div className="max-w-3xl mx-auto mt-10 space-y-4">
			{appointments.map((a) => (
				<AppointmentCard
					key={a.id}
					petName={a.petName}
					serviceType={a.serviceType}
					date={a.date}
					time={a.time}
					price={a.price}
				/>
			))}
		</div>
	);
}
