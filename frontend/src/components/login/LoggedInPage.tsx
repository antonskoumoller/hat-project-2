import { useLogin } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";

export default function LoggedInPage(){
    const loginContext = useLogin();
	const { unregister, logout } = loginContext;
	const navigate = useNavigate();

    function confirmUnregister() {
        const confirmBox = window.confirm(
            "Are you sure you want to unregister (this can not be undone)?"
        )
        if (confirmBox === true) {
          unregister();
        }
    } 

    return (
        <div className="columns-1 flex-col justify-center pt-4">
            {/* style: child is form, which is flex in column-style of fixed size */}
            <h2 className="p-4">
                {" "}
                You are currently logged in as {loginContext.user?.name}
            </h2>
            <div className="flex justify-center flex-wrap text-sm sm:text-base">
                <button
                    className="btn-primary m-3"
                    onClick={() => navigate("/product")}
                >
                    {" "}
                    Go shopping
                </button>
                <button
                    className="btn-primary m-3"
                    onClick={() => navigate("/basket")}
                >
                    {" "}
                    Basket
                </button>
                <button className="btn-secondary m-3" onClick={logout}>
                    {" "}
                    Log out
                </button>
                <button 
                    className="btn-secondary m-3"
                    onClick={confirmUnregister}>
                    {" "}
                    Unregister
                </button>
            </div>
        </div>
    );
}