import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw Error("Must be inside of an AuthContextProvider");
    }
    return context;
}

