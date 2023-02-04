const reducer = (state, action) => {
    switch (action.type) {
        case "SET_APP_USER": return setAppUser(state, action);
        case "ADD_APPLICATIONS": return addApplications(state, action);
        case "ADD_APPLICATION": return addApplication(state, action);
        case "GET_OFFICES": return getOffices(state, action);
        case "DRAWER_OPEN_MINI": return openMiniDrawer(state, action);
        case "DRAWER_OPEN_FULL": return openFullDrawer(state, action);
        case "DRAWER_RESET": return resetDrawerConfigs(state);
        case "OPEN_FORMS": return {...state, forms: true };
        case "CLOSE_FORMS": return {...state, forms: false };
        default: return state;
    }
}

export default reducer;

const setAppUser = (state, action) => {
    return { ...state, user: action.user };
}

const addApplications = (state, action) => {
    return { ...state, applications: action.applications };
}

const addApplication = (state, action) => {
    return {
        ...state,
        applications: [action.application, ...state.applications],
        forms: false
    };
}

const getOffices = (state, action) => {
    return { ...state, postOffices: action.offices };
}

const openMiniDrawer = (state, action) => {
    return {
        ...state,
        drawer: {
            open: true,
            fullWidth: false,
            content: action.content
        }
    };
}

const openFullDrawer = (state, action) => {
    return {
        ...state,
        drawer: {
            open: true,
            fullWidth: true,
            content: action.content
        }
    };
}

const resetDrawerConfigs = (state) => {
    return {
        ...state,
        drawer: {
            open: false,
            fullWidth: false,
            content: null
        },
        forms: false
    };
}