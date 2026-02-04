"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import HeaderProfile from "@/components/HeaderProfile";
export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isAuthenticated, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !isAuthenticated) {
			router.replace("/login");
		}
	}, [loading, isAuthenticated, router]);

	if (loading) return null;

	return (
		<>
			{" "}
			<HeaderProfile></HeaderProfile> {children}
		</>
	);
}
