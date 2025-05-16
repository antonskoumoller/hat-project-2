import { useState } from "react";

type LoginInfo = {
	fullName: string;
	email: string;
	password: string;
};

type InfoErrors = {
	fullName?: string;
	email?: string;
	password?: string;
};

export default function LoginPage() {
	//state related to provided info
	const [loginInfo, setLoginInfo] = useState<LoginInfo>({
		fullName: "",
		email: "",
		password: ""
	});
	//state related to errors
	const [infoErrors, setInfoErrors] = useState<InfoErrors>({});

	//validation-functions for individual fields
	const validateFullName = (name: string): InfoErrors => {
		//regex for valid name (a first name, optionally with another name separated by -, followed by one or more other names)
		const regName: RegExp =
			/^[a-zA-Z]([\-]?[a-zA-Z]+)*( [a-zA-Z]([\-]?[a-zA-Z]+)*)+$/;
		if (!regName.test(name)) {
			return { fullName: "not a valid full name" };
		}
		return { fullName: undefined };
	};
	const validateEmail = (email: string): InfoErrors => {
		//regex for valid email (some non-white-space letters, followed by @, followed by more none-white-space letters, followed by ., followed by more none-white-space-letters)
		const regEmail: RegExp = /^\S+@\S+\.\S+$/;
		if (!regEmail.test(email)) {
			return { email: "not a valid email" };
		}
		return { email: undefined };
	};
	const validatePassword = (password: string): InfoErrors => {
		// just checks length of password
		if (password.length < 5) {
			return { password: "Password must contain at least 5 characters!" };
		}
		return { password: undefined };
	};

	//function for responding to added input in fields
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name;
		const value = event.target.value;
		setLoginInfo((prevState) => ({ ...prevState, ...{ [name]: value } })); //pattern-match on name in object
		if (name === "fullName") {
			setInfoErrors((prevErrors) => ({
				...prevErrors,
				...validateFullName(value)
			}));
		} else if (name === "email") {
			setInfoErrors((prevErrors) => ({
				...prevErrors,
				...validateEmail(value)
			}));
		} else {
			setInfoErrors((prevErrors) => ({
				...prevErrors,
				...validatePassword(value)
			}));
		}
	};
	//joint validation
	const validate = (): InfoErrors => {
		return {
			...validateFullName(loginInfo.fullName),
			...validateEmail(loginInfo.email),
			...validatePassword(loginInfo.password)
		};
	};

	//for clearing input-fields
	const clearForm = () => {
		setLoginInfo({ fullName: "", email: "", password: "" });
		setInfoErrors({});
	};

	//for processing submission of input
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault(); //prevent (default) submission to webserver
		const validation = validate();
		if (validation.fullName || validation.email || validation.password) {
			alert("Provided info not valid!");
		} else {
			clearForm();
			alert("You succesfully entered information"); //behaviour for now
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				{/* label associated to element with id specified in htmlFor */}
				<label htmlFor="name-input"> Full name: </label>
				{/* input-field */}
				<input
					id="name-input"
					name="fullName"
					onChange={handleInputChange}
					value={loginInfo.fullName}
					placeholder="your full name"
				/>
				{/* inline error-message for ivalid input */}
				{infoErrors.fullName && (
					<span style={{ color: "red" }}> {infoErrors.fullName}</span>
				)}
			</div>
			<div>
				<label htmlFor="email-input"> Email adress: </label>
				<input
					id="email-input"
					name="email"
					onChange={handleInputChange}
					value={loginInfo.email}
					placeholder="your@email.com"
				/>
				{infoErrors.email && (
					<span style={{ color: "red" }}> {infoErrors.email}</span>
				)}
			</div>
			<div>
				<label htmlFor="password-input"> Password: </label>
				<input
					type="password" //hides password
					id="password-input"
					name="password"
					onChange={handleInputChange}
					value={loginInfo.password}
					placeholder="*****"
				/>
				{infoErrors.password && (
					<span style={{ color: "red" }}> {infoErrors.password}</span>
				)}
			</div>
			{/* the submit-button */}
			<button type="submit"> Login </button>
			{/* button that doesn't perform submit-action */}
			<button type="button" onClick={clearForm}>
				{" "}
				Cancel{" "}
			</button>
		</form>
	);
}
