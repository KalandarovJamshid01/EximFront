const reducer = (state, action) => {
    switch(action.type) {
        case "SET_USER": return setDefaultUser(state, action);
        case "REMOVE_USER": return removeUser(state);
        default: return state;
    }
}

export default reducer;

const setDefaultUser = (state, action) => {
    return {
        ...state,
        user: action.user
    }
}

const removeUser = (state) => {
    return {
        ...state,
        user: {
            id: false,
            role: false,
            isVerified: false,
            details: false,
            token: false
        }
    };
}