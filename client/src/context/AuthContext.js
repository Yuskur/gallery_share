import { createContext, useReducer } from 'react'

export const AuthContext = createContext();


//Action: 
/*
{
    type: 'LOGIN'
    payload: {
        email: example.user@gmail.com
    }
}
*/

const authReducer = (state, action) => {
    console.log("AUTH REDUCER BEING CALLED!!!");
    switch(action.type){
        case 'LOGIN': 
        return { user: action.payload }
        case 'LOGOUT': 
        return { user: null }
        default: 
        return state
    }
}   

/**
 * This function works to 
 * 
 * @param {children} param0 
 * @returns component AuthProvider
 */
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    return(
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}