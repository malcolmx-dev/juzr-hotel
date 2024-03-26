import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE= {
    user: JSON.parse(localStorage.getItem("user")) ,
    loading: false,
    error: null
}

export const AuthContest= createContext(INITIAL_STATE)

const AuthReducer = (state, action) =>{
    switch(action.type){
        case "LOGIN_START":
            return{
                user:null,
                loading:true,
                error:null
            }
        case "LOGIN_SUCCES":
            return{
                user:action.payload,
                loading:false,
                error:null
            }
        case "LOGIN_ERROR":
            return{
                user:null,
                loading:false,
                error:action.payload
            }
        case "LOG_OUT":
            return{
                user:null,
                loading:false,
                error:null
            }
        default:
            return state
            
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

     useEffect(() =>{
        state && localStorage.setItem("user", JSON.stringify(state.user))
    },[state?.user, state])

    useEffect(() =>{
        state?.user?.isAdmin && localStorage.removeItem("isAdmin")
    },[state?.user, state])

    return(
        
        <AuthContest.Provider
        value={{
            user: state?.user,
            loading: state?.loading,
            error: state?.error,
            dispatch
        }}>
            {children}
        </AuthContest.Provider>
        )
    }