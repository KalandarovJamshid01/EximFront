import { createContext, useContext, useReducer, useEffect, useState } from 'react';
import DashboardReducer from '../reducers/dashboard.reducer';
import{ SnackbarProvider } from '../contexts/SnackbarContext';
import { RootContext } from './RootContext';
import Backdrop from '../miniComponents/backDrop';
import axios from 'axios';
import { peekaboo } from '../PEEKABOO';

export const DashboardContext = createContext();
export const DashboardDispatch = createContext();

export function DashboardProvider({ children }) {
    const rootState = useContext(RootContext);
    const [dashboardView, setDashboardView] = useState(false);
    const [state, dispatch] = useReducer(DashboardReducer, {
        modal: {
            open: false,
            index: 1,
            view: null
        },
        applications: []
    });
    useEffect(() => {
        axios.get(`${peekaboo}/admins/me`,  { headers: { 'Authorization':  `Bearer ${rootState.user.token}` }})
            .then(response => {
                if (response.status === 200) {
                    const dashboardUser = {
                        id: response.data.users._id,
                        role: 'admin',
                        isVerified: false,
                        token: rootState.user.token,
                        details: response.data.users
                    };
                    axios.get(`${peekaboo}/document`, { headers: { 'Authorization': `Bearer ${rootState.user.token}` }})
                        .then(response => {
                            dispatch({ type: 'SET_DASHBOARD_USER', user: dashboardUser });
                            dispatch({ type: 'ADD_APPLICATIONS', applications: response.data.data });
                            setDashboardView(children);
                        });
                }
            });
            //eslint-disable-next-line
    }, []);
    return (
        <DashboardContext.Provider value={state}>
            <DashboardDispatch.Provider value={dispatch}>
                <SnackbarProvider>
                    {dashboardView ? dashboardView : <Backdrop open={true} background/>}
                </SnackbarProvider>
            </DashboardDispatch.Provider>
        </DashboardContext.Provider>
    )
}