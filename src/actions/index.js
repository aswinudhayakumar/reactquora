export const login = (input) => {
    return{
        type : 'SIGN_IN',
        payload : input
    }
} 
export const logout = () => {
    return{
        type : 'SIGN_OUT',
        payload : null
    }
} 
export const setfeed = (input) => {
    return{
        type : 'SET_FEED',
        payload : input
    }
} 
export const setspeech = (input) => {
    return{
        type : 'SET_SPEECH',
        payload : input
    }
} 