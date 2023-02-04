import { createContext, useState, Fragment } from 'react';
import { IconButton, Slide } from '@mui/material';
import Snackbar from '../miniComponents/snackbar';
import { CloseOutlined as CloseIcon } from "@mui/icons-material";

export const SnackbarContext = createContext();

export function SnackbarProvider({ children }) {
    const [snackSettings, setSnackSettings] = useState({
        type: false,
        message: false,
        snack: false
    }) //DEFAULT: { type: false, message: false, snack: false }
    const [snackTransition, setSnackTransition] = useState(undefined); //DEFAULT: undefined
    const snackTransitionLeft = props => <Slide {...props} direction='left' />;
    const handleCloseSnackbar = () => {
        setSnackSettings({
            type: false,
            message: false,
            snack: false,
            title: false
        });
    }

    const handleCallToSnack= (snackType, snackProps ) => {
        setSnackTransition(() => snackTransitionLeft);
        setSnackSettings({
            type: snackType,
            message: snackProps.message,
            title: snackProps.title,
            snack: true
        });
    }
    
    //eslint-disable-next-line
    const { snack, message, type, title } = snackSettings;

    return (
        <Fragment>
            <SnackbarContext.Provider value={{ handleCallToSnack}}>
                {children}
            </SnackbarContext.Provider>
           {snack && <Snackbar
                open={snack}
                onClose={handleCloseSnackbar}
                Transition={snackTransition}
            >
                <div className={`snackbar-app__content snackbar--${type}`}>
                {/* <div className={`snackbar-app__content snackbar--success`}> */}
                    <div className='snackbar-app__content--header'>
                        {/* <h4>Good Morning!</h4> */}
                        <h4>{title}</h4>
                        <IconButton 
                            className={`button--success`}
                            onClick={handleCloseSnackbar}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <div className='snackbar-app__content--message'>
                        <p>{message}</p>
                        {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam iusto suscipit adipisci inventore, voluptatibus tenetur?
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam iusto suscipit adipisci inventore, voluptatibus tenetur?</p> */}
                    </div>
                </div>
            </Snackbar>}
        </Fragment>
    );
}