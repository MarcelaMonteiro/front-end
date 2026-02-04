import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Inter, Dancing_Script } from "next/font/google";
import type { NextFontWithVariable } from "next/font";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/src/context/AuthContext";

export const playfair: NextFontWithVariable = Playfair_Display({
	subsets: ["latin"],
	weight: ["400", "600", "700"],
	variable: "--font-playfair",
});

export const inter: NextFontWithVariable = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const dancing: NextFontWithVariable = Dancing_Script({
	subsets: ["latin"],
	variable: "--font-dancing",
});

export const metadata: Metadata = {
	title: "Spa dos Focinhos",
	description: "Site fictício de uma pet shop chamada Spa dos Focinhos",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body
				className={`${inter.variable} ${playfair.variable} ${dancing.variable} `}
			>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
