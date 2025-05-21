import { useState } from "react";
import { useLogin } from "../context/LoginContext";
import LoggedInPage from "../components/login/LoggedInPage";

export type LoginInfo = {
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

	const loginContext = useLogin();
	const { login, register } = loginContext;

	//validation-functions for individual fields
	const validateFullName = (name: string): InfoErrors => {
		//regex for valid name (a first name, optionally with another name separated by -, followed by one or more other names)
		const regName: RegExp =
			/^[a-zA-Z]([\-]?[a-zA-Z]+)*( [a-zA-Z]([\-]?[a-zA-Z]+)*)+$/;
		if (!regName.test(name)) {
			return { fullName: "Not a valid full name" };
		}
		return { fullName: undefined };
	};
	const validateEmail = (email: string): InfoErrors => {
		//regex for valid email (some non-white-space letters, followed by @, followed by more none-white-space letters, followed by ., followed by more none-white-space-letters)
		const regEmail: RegExp = /^\S+@\S+\.\S+$/;
		if (!regEmail.test(email)) {
			return { email: "Not a valid email" };
		}
		return { email: undefined };
	};
	const validatePassword = (password: string): InfoErrors => {
		// just checks length of password
		if (password.length < 5) {
			return { password: "Password is too short" };
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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault(); //prevent (default) submission to webserver
		const validation = validate();
		if (validation.fullName || validation.email || validation.password) {
			alert("Provided info not valid!");
		} else {
			login(loginInfo);
			clearForm();
		}
	};

	//for processing submission of input
	const registerUser = () => {
		const validation = validate();
		if (validation.fullName || validation.email || validation.password) {
			alert("Provided info not valid!");
		} else {
			register(loginInfo);
			clearForm();
		}
	};

	// This is rendered if user is already logged in
	if (loginContext.isLoggedIn) {
		return(
			<LoggedInPage></LoggedInPage>
		);
	} else
		// This is rendered if user is not logged in
		return (
			//stylecreates flex-container where child is in center
			<div className="flex justify-center p-4">
				{/* style: child is form, which is flex in column-style of fixed size */}
				<form
					className="flex flex-col justify-center w-full max-w-md border border-primary rounded p-4"
					onSubmit={handleSubmit}
				>
					{/* style: This column entry has label and input in each end with given margins */}
					<div className="flex justify-between text-sm mx-2 sm:text-base sm:mx-8">
						{/* label associated to element with id specified in htmlFor */}
						<label className="" htmlFor="name-input">
							{" "}
							Full name:{" "}
						</label>
						{/* input-field */}
						<input
							className="border border-primary rounded-sm w-1/2 sm:w-2/3"
							id="name-input"
							name="fullName"
							onChange={handleInputChange}
							value={loginInfo.fullName}
							placeholder="your full name"
						/>
					</div>
					{/* inline error-message for ivalid input (adds invisible line if no error-message, for styling purposes)*/}
					{infoErrors.fullName ? (
						<p
							className="flex justify-start text-xs ml-10 sm:ml-27 sm:text-base"
							style={{ color: "red" }}
						>
							{" "}
							{infoErrors.fullName}
						</p>
					) : (
						<p className="invisible text-xs sm:text-base">*</p>
					)}

					<div className="flex justify-between text-sm mx-2 sm:text-base sm:mx-8">
						<label className="" htmlFor="email-input">
							{" "}
							Email adress:{" "}
						</label>
						<input
							className="border border-primary rounded-sm w-1/2 sm:w-2/3"
							id="email-input"
							name="email"
							onChange={handleInputChange}
							value={loginInfo.email}
							placeholder="your@email.tld"
						/>
					</div>
					{infoErrors.email ? (
						<p
							className="flex justify-start text-xs ml-10 sm:ml-27 sm:text-base"
							style={{ color: "red" }}
						>
							{" "}
							{infoErrors.email}
						</p>
					) : (
						<p className="invisible text-xs sm:text-base">*</p>
					)}

					<div className="flex justify-between text-sm mx-2 sm:text-base sm:mx-8">
						<label className="" htmlFor="password-input">
							{" "}
							Password:{" "}
						</label>
						<input
							className="border border-primary rounded-sm w-1/2 sm:w-2/3"
							type="password" //hides password
							id="password-input"
							name="password"
							onChange={handleInputChange}
							value={loginInfo.password}
							placeholder="*****"
						/>
					</div>
					{infoErrors.password ? (
						<p
							className="flex justify-start text-xs ml-10 sm:ml-27 sm:text-base"
							style={{ color: "red" }}
						>
							{" "}
							{infoErrors.password}
						</p>
					) : (
						<p className="invisible text-xs sm:text-base">*</p>
					)}

					<div className="flex justify-center text-sm sm:text-base flex-wrap">
						{/* the submit-button */}
						<button className="btn-primary m-2" type="submit">
							{" "}
							Login{" "}
						</button>
						{/* buttons that doen't perform submit-action */}
						<button
							className="btn-primary m-2"
							type="button"
							onClick={registerUser}
						>
							{" "}
							Register{" "}
						</button>
						<button
							className="btn-secondary m-2"
							type="button"
							onClick={clearForm}
						>
							{" "}
							Clear input{" "}
						</button>
					</div>
				</form>
			</div>
		);
}
