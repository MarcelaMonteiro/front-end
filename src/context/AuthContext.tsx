"use client";

import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

type AuthContextType = {
	token: string | null;
	isAuthenticated: boolean;
	loading: boolean;
	login: (token: string) => Promise<void>;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = "token";

/** cookie simples pro middleware (não é httpOnly) */
function setTokenCookie(token: string | null) {
	if (typeof document === "undefined") return;

	if (!token) {
		// expira cookie
		document.cookie = `token=; Path=/; Max-Age=0; SameSite=Lax`;
		return;
	}

	// cookie de sessão (você pode adicionar Max-Age se quiser)
	document.cookie = `token=${encodeURIComponent(token)}; Path=/; SameSite=Lax`;
}

function readLocalToken(): string | null {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(TOKEN_KEY);
}

function isJwtExpired(token: string): boolean {
	try {
		const payloadPart = token.split(".")[1];
		if (!payloadPart) return true;

		// base64url -> base64
		const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
		const json = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
				.join(""),
		);

		const payload = JSON.parse(json);
		const exp = payload?.exp;
		if (!exp) return false; // se não tem exp, não considero expirado aqui
		const now = Math.floor(Date.now() / 1000);
		return now >= exp;
	} catch {
		return true;
	}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [token, setToken] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	// bootstrap: pega token do localStorage
	useEffect(() => {
		const saved = readLocalToken();
		if (saved && !isJwtExpired(saved)) {
			setToken(saved);
		} else {
			// limpa lixo / expirado
			if (saved) localStorage.removeItem(TOKEN_KEY);
			setToken(null);
		}
		setLoading(false);
	}, []);

	// side-effects: sempre que token mudar, sincroniza storage + cookie
	useEffect(() => {
		if (typeof window === "undefined") return;

		if (!token) {
			localStorage.removeItem(TOKEN_KEY);
			setTokenCookie(null);
			return;
		}

		localStorage.setItem(TOKEN_KEY, token);
		setTokenCookie(token);
	}, [token]);

	const value = useMemo<AuthContextType>(
		() => ({
			token,
			isAuthenticated: !!token,
			loading,
			login: async (newToken: string) => {
				// já valida exp aqui pra evitar salvar token morto
				if (isJwtExpired(newToken)) {
					setToken(null);
					return;
				}
				setToken(newToken);
			},
			logout: () => {
				setToken(null);
			},
		}),
		[token, loading],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
