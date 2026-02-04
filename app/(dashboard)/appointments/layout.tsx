"use client";

import React from "react";
import HeaderProfile from "@/components/HeaderProfile";
import { useRouter } from "next/router";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div className="">{children}</div>
		</>
	);
}
