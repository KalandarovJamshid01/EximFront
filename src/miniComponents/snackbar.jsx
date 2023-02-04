import { Snackbar as Snack } from '@mui/material';

export default function Snackbar({ 
    open, 
    children, 
    onClose, 
    duration,
    anchorOrigin,
    Transition
}) {
    console.log('• Snackbar.jsx is working 🪐')
    return (
        <Snack
            className='snackbar-app'
            anchorOrigin={anchorOrigin}
            open={open}
            autoHideDuration={duration}
            message={children}
            ContentProps={{"aria-describedby": "notification-message"}}
            TransitionComponent={Transition}
            onClose={onClose}
        />
    );
}

// DEFAULT PROPS OF SNACKBAR MINI-COPMONENT
Snackbar.defaultProps = {
    anchorOrigin: {
        vertical: "top",
        horizontal: "center"
    },
    duration: 2000
}

