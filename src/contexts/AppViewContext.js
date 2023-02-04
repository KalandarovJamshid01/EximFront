import { createContext, useReducer, useContext, useEffect, useState } from 'react';
import AppViewReducer from '../reducers/appview.reducer';
import { RootContext } from './RootContext';
import { SnackbarProvider } from './SnackbarContext';
import Backdrop from '../miniComponents/backDrop';
import { peekaboo } from '../PEEKABOO';
import axios from 'axios';

export const AppViewContext = createContext();
export const AppViewDispatch = createContext();

export function AppViewProvider({ children }) {
    const [appView, setAppView] = useState(false);
    const rootState = useContext(RootContext);
    const [state, dispatch] = useReducer(AppViewReducer, {
        drawer: {
            open: false,
            fullWidth: false
        },
        //applications: [{ step: 1 }, { step: 2 }, { step: 3 }, { step: 4 }, { step: 5 }, { step: 6 }, { step: 7 }, { step: 8 }, { step: 9 }, { step: 0 }],
        applications: [],
        postOffices: [],
        forms: false,
        user: rootState.user
    });
    useEffect(() => {
        axios.get(`${peekaboo}/user/me`, { headers: { 'Authorization': `Bearer ${state.user.token}`}})
            .then(response => {
                if (response.status === 200) {
                    const appUser = {
                        id: response.data.data._id,
                        role: 'user',
                        isVerified: false,
                        token: state.user.token,
                        details: response.data.data
                    };
                    axios.get(`${peekaboo}/document`, { headers: { 'Authorization': `Bearer ${state.user.token}` }})
                        .then(response => {
                            dispatch({ type: 'SET_APP_USER', user: appUser });
                            dispatch({ type: "ADD_APPLICATIONS", applications: [...response.data.data].reverse() });
                            setAppView(children);     
                        });
                }
            });
        axios.get(`${peekaboo}/port_office`).then(response => {
            dispatch({ type: "GET_OFFICES", offices: response.data.data });
        });
        //eslint-disable-next-line
    }, []);
    console.log('AppViewContext is working!')
    return (
        <AppViewContext.Provider value={state}>
            <AppViewDispatch.Provider value={dispatch}>
                <SnackbarProvider>
                    {appView ? appView : <Backdrop open={true} background/>}
                </SnackbarProvider>
            </AppViewDispatch.Provider>
        </AppViewContext.Provider>
    );
}