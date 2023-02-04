import { Button, IconButton, Dialog, DialogActions } from '@mui/material';
import { 
    CloseOutlined as CloseIcon,
    NotificationsActive as BellRingingIcon
} from "@mui/icons-material";
import TransitionLeft from '../props/transitionLeftProps'

export default function NotiDialog({ open, optionChange }) {
    console.log('• notificationDialog.jsx is working 🔔')
    return (
        <Dialog
            open={open}
            TransitionComponent={TransitionLeft}
            keepMounted
            // onClose={handleClose}
            aria-describedby={'alert-dialog-slide-description'}
            className={'noti-dialog'}
        >
            
            <div className='noti-dialog__nav'>
                <IconButton>
                    <CloseIcon/>
                </IconButton>
            </div>
            <div className='noti-dialog__header'>
                <div className='noti-dialog__header--icon'>
                    <IconButton>
                        <BellRingingIcon/>
                    </IconButton>
                </div>
                <div className='noti-dialog__header--message'>
                    <h4 className='noti-message--title'>Ваша заявка создана</h4>
                    <p className='text-disabled subtitle margin-top'>
                        Поздравляем, ваша заявка создана, вы можете отслеживать статусы на главной странице
                    </p>
                </div>
            </div>
            <DialogActions className='noti-dialog__actions'>
                <Button 
                    className='noti-dialog__actions--button app-button'
                    onClick={optionChange.close}
                >
                    На главную
                </Button>
                <Button 
                    className='noti-dialog__actions--button-outlined app-button'
                    onClick={optionChange.redirect}
                >
                    К заявке
                </Button>
            </DialogActions>
        </Dialog>
    );
}