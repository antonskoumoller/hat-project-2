import React, { createContext, useContext, useState } from "react";

type User = {
	name: string;
	email: string;
};
//Maybe add fullname here
type LoginCredentials = {
	email: string;
	password: string;
};

type LoginContextType = {
	user: User | null;
	isLoggedIn: boolean;
	login: (credentials: LoginCredentials) => void;
	logout: () => void;
};

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	function login(credentials: LoginCredentials) {
		// Some login validation from the other login thing
		setUser({
			name: "Demo User",
			email: credentials.email
		});
	}

	function logout() {
		setUser(null);
	}

	const value: LoginContextType = {
		user,
		isLoggedIn: !!user,
		login,
		logout
	};

	return (
		<LoginContext.Provider value={value}>{children}</LoginContext.Provider>
	);
}

// Hook to access the context
export function useLogin() {
	const context = useContext(LoginContext);
	if (!context)
		throw new Error("useLogin must be used within a LoginProvider");
	return context;
}
