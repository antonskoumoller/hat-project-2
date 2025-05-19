import React, { createContext, useContext, useState } from "react";
import { LoginInfo } from "../pages/LoginPage";


type User = {
	name: string;
	email: string;
};

//Maybe add fullname here
type LoginCredentials = {
	name: string
	email: string;
	password: string;
};

type LoginContextType = {
	user: User | null;
	isLoggedIn: boolean;
	login: (credentials: LoginInfo) => void;
	logout: () => void;
	register: (credentials: LoginInfo) => void;
};

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	function login(credentials: LoginInfo) {
		// Some login validation from the other login thing***
				fetch(`http://localhost:3000/customers/${encodeURIComponent(credentials.email)}`)
				.then((res) => {
					if(res.status===404){
						alert(`user with mail ${credentials.email} doesn't exist`)
						return null;
					}else{
						return res.json()}
					}
				).then((data) => {
					if(data){
						setUser({
						name: data.name,
						email: data.email
						})
					}
				})
				.catch((err) => {
					console.error(err)
				});
	}

	function register(credentials: LoginInfo) {
				fetch(`http://localhost:3000/customers/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ 
						name: `${credentials.fullName}`, 
						email: `${credentials.email}`, 
						password: `${credentials.password}` 
					}),
				})
				.then((res) => {
					if(res.status===409){
						alert(`user with mail ${credentials.email} already exist`)
					}else{
						setUser({
							name: credentials.fullName,
							email: credentials.email
						})
					}
				})
				.catch((err) => {
					console.error(err)
				});
	}

	function logout() {
		setUser(null);
	}

	const value: LoginContextType = {
		user,
		isLoggedIn: !!user,
		login,
		logout,
		register
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
