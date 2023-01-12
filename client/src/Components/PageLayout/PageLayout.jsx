import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../../Contexts/UserContextWraper";


export const PageLayout = () => {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            <Outlet />
        </div>
    )
};