import * as auth from "../services/auth"



const SET_USER = "session/setUser"
const REMOVE_USER = "session/removeUser"

const setUser = user => {
    return {
        type: SET_USER,
        user
    }
}


const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}

export const login = (email, password) => async dispatch => {
    const data = auth.login(email, password)
    dispatch(setUser(data.user))
    console.log("data inside login", data)
    return data
}


// const logout = () => async dispatch => {

// }



const initialState = {
    user: null
}

const sessionReducer = (state=initialState, action) => {
    let newState
    switch(action.type) {
        case SET_USER:
        newState = {...state}
        newState.user = action.user
        return newState
    }
}