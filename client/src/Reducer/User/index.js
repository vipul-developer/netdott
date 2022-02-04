import { AUTH_USER,LOGIN_USER,REGISTER_USER,LOGGED_USER } from "../../Action/ActionTypes";

export default function(state={},action){
    switch(action.type){
        case AUTH_USER:
            return { ...state, authUser: action.payload }
        case LOGIN_USER:
            return { ...state, loginUser: action.payload }
        case REGISTER_USER:
            return { ...state, registerUser: action.payload }
        case LOGGED_USER:
            return { ...state, loggedUser: action.payload }
        default:
            return state
    }
};
