"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

import HeaderProfile from "@/components/HeaderProfile";
export default function Profile() {
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function load() {
			try {
				const res = await apiFetch("/auth/me");
				const json = await res.json();
				setData(json);
			} finally {
				setLoading(false);
			}
		}

		load();
	}, []);

	if (loading) return <p>Carregando...</p>;
	return <section></section>;
}
