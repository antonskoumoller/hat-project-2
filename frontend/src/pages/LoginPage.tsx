import LoggedInPage from "../components/login/LoggedInPage";
import LoginForm from "../components/login/LoginForm";
import { useLogin } from "../context/LoginContext";


export default function LoginPage() {
	const loginContext = useLogin();
	// This is rendered if user is already logged in
	if (loginContext.isLoggedIn) {
		return(
			<LoggedInPage></LoggedInPage>
		);
	} 
	// This is rendered if user is not logged in
	else {
		return(
			//style: creates flex-container where child is in center
        	<div className="flex justify-center p-4">
				<LoginForm></LoginForm>
			</div>
		);
	}
		
}
