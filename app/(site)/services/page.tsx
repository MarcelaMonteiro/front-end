"use client";
import CardService from "@/components/CardService";
import Image from "next/image";
import { useState } from "react";

export default function Services() {
	const [index, setIndex] = useState(0);

	function next() {
		setIndex((prev) => (prev + 1) % 4);
	}

	function prev() {
		setIndex((prev) => (prev === 0 ? 3 : prev - 1));
	}

	return (
		<section className="relative isolate min-h-[100vh] text-center font-bold font-title overflow-hidden">
			<Image
				src="/fundoservices.png"
				alt=""
				fill
				priority
				className="
          object-cover
          blur-sm
          scale-100
          -z-20
        "
			/>

			<div className="absolute inset-0 bg-white/50 md:bg-white/25 -z-10 pointer-events-none" />

			<div className="relative z-10 flex flex-col items-center justify-center min-h-[100vh] px-6 md:-mt-7 -mt-10">
				<h2 className="text-[#6A5A4E] text-3xl md:text-4xl">Nossos Serviços</h2>

				<div className="flex items-center justify-center gap-4 mt-12  md:hidden">
					<button onClick={prev}>
						<Image
							src="/setaesq-removebg-preview.png"
							alt="Seta esquerda"
							width={30}
							height={30}
						/>
					</button>

					{index === 0 && (
						<CardService
							title="Banho Relaxante"
							description="Higiêne completa com produtos suaves."
							image="/banheiraicon.png"
						/>
					)}

					{index === 1 && (
						<CardService
							title="Tosa Higiênica"
							description="Cortes de pêlo com cuidado e precisão."
							image="/tesouraicon2.png"
						/>
					)}

					{index === 2 && (
						<CardService
							title="Hidratação"
							description="Tratamento para pêlos macios e saudáveis."
							image="/hidratacaoicon1.png"
						/>
					)}

					{index === 3 && (
						<CardService
							title="Spa Completo"
							description="Pacote completo para renovação total."
							image="/patinhaicon.png"
						/>
					)}

					<button onClick={next}>
						<Image
							src="/setadir-removebg-preview.png"
							alt="Seta direita"
							width={30}
							height={30}
						/>
					</button>
				</div>

				<div className="hidden md:flex gap-7 items-center mt-10">
					<CardService
						title="Banho Relaxante"
						description="Higiêne completa com produtos suaves."
						image="/banheiraicon.png"
					/>

					<CardService
						title="Tosa Higiênica"
						description="Cortes de pêlo com cuidado e precisão."
						image="/tesouraicon2.png"
					/>

					<CardService
						title="Hidratação"
						description="Tratamento para pêlos macios e saudáveis."
						image="/hidratacaoicon1.png"
					/>

					<CardService
						title="Spa Completo"
						description="Pacote completo para renovação total."
						image="/patinhaicon.png"
					/>
				</div>

				<h3 className="md:text-[1.6rem] text-2xl text-[#B99577] mt-10">
					Seu pet merece esse cuidado
				</h3>
			</div>
		</section>
	);
}
