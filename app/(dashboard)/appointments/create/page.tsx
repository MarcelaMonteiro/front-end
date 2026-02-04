"use client";

import { useState } from "react";

export default function CreateAppointment() {
	const [petName, setPetName] = useState("");
	const [petSize, setPetSize] = useState<"SMALL" | "MEDIUM" | "LARGE">("SMALL");
	const [serviceType, setServiceType] = useState<
		"BATH" | "GROOMING" | "BATH_AND_GROOMING"
	>("BATH");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setSuccess(false);

		if (!petName || !date || !time) {
			setError("Preencha todos os campos");
			return;
		}

		try {
			setLoading(true);

			const res = await fetch("http://localhost:3001/appointments", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`, // ajuste se usar cookie
				},
				body: JSON.stringify({
					petName,
					petSize,
					serviceType,
					date,
					time,
				}),
			});

			if (!res.ok) {
				throw new Error("Erro ao criar agendamento");
			}

			setSuccess(true);
			setPetName("");
			setDate("");
			setTime("");
		} catch {
			setError("Não foi possível criar o agendamento");
		} finally {
			setLoading(false);
		}
	}

	return (
		<section className="min-h-screen flex items-center justify-center bg-[#F4ECE6]">
			<form
				onSubmit={handleSubmit}
				className="bg-[#FBF7F4] w-[360px] p-6 rounded-2xl shadow"
			>
				<h2 className="text-xl font-bold text-[#6A5A4E] mb-4 text-center">
					Novo Agendamento
				</h2>

				<div className="flex flex-col gap-4">
					<input
						type="text"
						placeholder="Nome do pet"
						value={petName}
						onChange={(e) => setPetName(e.target.value)}
						className="input"
					/>

					<select
						value={petSize}
						onChange={(e) => setPetSize(e.target.value as any)}
						className="input"
					>
						<option value="SMALL">Pequeno</option>
						<option value="MEDIUM">Médio</option>
						<option value="LARGE">Grande</option>
					</select>

					<select
						value={serviceType}
						onChange={(e) => setServiceType(e.target.value as any)}
						className="input"
					>
						<option value="BATH">Banho</option>
						<option value="GROOMING">Tosa</option>
						<option value="BATH_AND_GROOMING">Banho + Tosa</option>
					</select>

					<input
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						className="input"
					/>

					<input
						type="time"
						value={time}
						onChange={(e) => setTime(e.target.value)}
						className="input"
					/>

					{error && <p className="text-red-500 text-sm">{error}</p>}
					{success && (
						<p className="text-green-600 text-sm">
							Agendamento criado com sucesso!
						</p>
					)}

					<button
						type="submit"
						disabled={loading}
						className="bg-[#B99577] text-white rounded-full h-11 font-semibold disabled:opacity-60"
					>
						{loading ? "Salvando..." : "Agendar"}
					</button>
				</div>
			</form>

			<style jsx>{`
				.input {
					padding: 12px;
					border-radius: 12px;
					border: 1px solid #e1d2c6;
					outline: none;
				}
				.input:focus {
					border-color: #b99577;
				}
			`}</style>
		</section>
	);
}
