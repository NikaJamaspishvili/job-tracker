import { createContext,useContext } from "react";

export const MyContext = createContext<{showAddJob:boolean,setShowAddJob:React.Dispatch<React.SetStateAction<boolean>>}| null>(null);

export const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("useMyContext must be used within a MyContextProvider");
    return context;
}