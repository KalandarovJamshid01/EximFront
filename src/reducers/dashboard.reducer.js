const reducer = (state, action) => {
    switch (action.type) {
        case "SET_DASHBOARD_USER": return setDashboardUser(state, action);
        case "ADD_APPLICATIONS": return addApplications(state, action);
        case "CHANGE_APPLICATION_STATUS": return changeApplicationStatus(state, action);
        case "OPEN_FULL_MODAL": return openFullModal(state, action);
        case "CHANGE_MODAL_INDEX": return changeIndexModel(state, action);
        case "RESET_MODAL": return resetFullModal(state);
        default: return state;
    }
}

export default reducer;

const setDashboardUser = (state, action) => {
    return {
        ...state,
        user: action.user
    }
}

const addApplications = (state, action) => {
    return {
        ...state,
        applications: action.applications.reverse()
    }
}

const changeApplicationStatus = (state, action) => {
    const updatedApplications = state.applications.map(prevApplication =>
        prevApplication._id === action.application._id ? action.application : prevApplication
    );
    return {
        ...state,
        applications: updatedApplications
    };
}

const changeIndexModel = (state, action) => {
    return {
        ...state,
        modal: {
            ...state.modal,
            index: action.index
        }
    }
}

const openFullModal = (state, action) => {
    return {
        ...state,
        modal: {
            open: true,
            index: action.index,
            view: action.view
        }
    }
}

const resetFullModal = (state) => {
    return {
        ...state,
        modal: {
            open: false,
            index: false,
            view: null
        }
    }
}