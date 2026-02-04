"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { div } from "framer-motion/client";
import Link from "next/link";

export default function HeaderProfile() {
	const [open, setOpen] = useState(false);
	const { user, logout } = useAuth();
	const router = useRouter();

	function handleLogout() {
		logout();
		router.push("/login");
	}

	return (
		<header className="bg-[#F4ECE6]/80 backdrop-blur-md ">
			<nav className="flex items-center md:justify-between md:px-10">
				<div className="md:hidden flex items-center">
					<button
						className="md:hidden mr-24 px-3 flex items-center  "
						onClick={() => setOpen(!open)}
					>
						{open ? <X size={28} /> : <Menu size={28} />}
					</button>
				</div>
				{open && (
					<div className=" absolute top-full left-0 w-full md:hidden bg-[#F6F1EC] border-t border-[#E2D5C8] flex flex-col items-center px-6 py-6 space-y-4 shadow-lg ">
						<span className="text-[#2B2B2B]">Olá, {user?.name}</span>
						<hr className="py-full px-6 border-[#A98063] " />
						<Link href="/appointments" className="text-[#2B2B2B]">
							Meus agendamentos
						</Link>
						<hr className="py-full px-6 border-[#A98063] " />
						<Link href="/profile" className="text-[#2B2B2B]">
							Meu Perfil
						</Link>
						<hr className="py-full px-6 border-[#A98063] " />
						<button
							onClick={handleLogout}
							className="text-red-600 font-semibold"
						>
							Sair
						</button>
					</div>
				)}
				<div className="flex justify-center items-center py-4 ">
					<Image
						src="/spalogo.png"
						alt="Logo do Spa dos focinhos"
						width={100}
						height={100}
					/>
				</div>
				<div className="hidden md:block ">
					<div className="flex gap-4">
						<span className="font-title">Olá, {user?.name}</span>

						<Link
							href="/appointments"
							className="font-title hover:text-[#8B6A4F]"
						>
							Meus agendamentos
						</Link>
						<button
							onClick={logout}
							className="text-red-600 font-semibold hover:text-red-700 cursor-pointer"
						>
							Sair
						</button>
					</div>
				</div>
			</nav>
		</header>
	);
}
