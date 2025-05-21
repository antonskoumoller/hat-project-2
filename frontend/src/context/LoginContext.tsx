import React, { createContext, useContext, useState } from "react";
import { LoginInfo } from "../pages/LoginPage";


type User = {
	name: string;
	email: string;
};

type LoginContextType = {
	user: User | null;
	isLoggedIn: boolean;
	login: (credentials: LoginInfo) => void;
	logout: () => void;
	register: (credentials: LoginInfo) => void;
	unregister: (credentials: LoginInfo) => void;
};

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	function login(credentials: LoginInfo) {
				fetch(`http://localhost:3000/customers/${encodeURIComponent(credentials.email)}`)
				.then((res) => {
					if(res.status===404){
						res.json().then(res=>alert(res.error))
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
						alert("You succesfully logged in - welcome back");
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
						res.json().then(res => alert(res.error));
					}else{
						setUser({
							name: credentials.fullName,
							email: credentials.email
						})
						alert("You succesfully registered - welcome!");
					}
				})
				.catch((err) => {
					console.error(err)
				});
	}

	function unregister(credentials: LoginInfo) {
		fetch(`http://localhost:3000/customers/${encodeURIComponent(credentials.email)}`,
		{
			method: "DELETE",
		})
		.then((res) => {
			if(res.status===404){
				res.json().then(res => alert(res.error));
			}else{
				logout();
				alert("You are now unregistered - we hope to see you back soon!")
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
		register,
		unregister
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
