import { useState } from "react";
import { Form } from "react-router-dom";

type LoginInfo = {
    fullName: string;
    email: string;
    passWord: string;
}

type InfoErrors = {
    fullName?: string;
    email?: string;
    passWord?: string;
}

export default function LoginPage() {
    const [loginInfo, setLoginInfo] = useState<LoginInfo>({fullName:"", email:"", passWord:""});
    const [infoErrors, setInfoErrors] = useState<InfoErrors>({});
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault(); //prevent (default) submission to webserver
        alert("you entered information");
    }
    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setLoginInfo(prevState => ({...prevState, ...{[name] : value}}));
    }

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name-input"> Full name:{" "} </label>
                <input 
                    id="name-input"
                    name="fullName"
                    onChange={handleInputChange}
                    value={loginInfo.fullName}
                    placeholder="your full name"
                />
            </div>
            <div>
                <label htmlFor="email-input"> Email adress:{" "} </label>
                <input 
                    id="email-input"
                    name="email"
                    onChange={handleInputChange}
                    value={loginInfo.email}
                    placeholder="your@email.com"
                />
            </div>
            <div>
                <label htmlFor="password-input"> Password:{" "} </label>
                <input 
                    id="password-input"
                    name="passWord"
                    onChange={handleInputChange}
                    value={loginInfo.passWord}
                    placeholder="********"
                />
            </div>
            
            <button type="submit"> Login </button>
        </form>
    );
}
