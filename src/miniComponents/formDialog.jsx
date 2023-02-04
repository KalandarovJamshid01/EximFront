import useInputState from '../hooks/useInputState';
import { Button, IconButton, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import {
    CloseOutlined as CloseIcon,
    Warning as WarningIcon
} from '@mui/icons-material';

export default function FormDialog({ open, closeDialog, submitFormDialog }) {
    console.log('• formDialog.jsx is working 📝 as a NEGATIVE-FEEDBACK');
    //eslint-disable-next-line
    const [value, handleChange, reset] = useInputState("");

    const submitCloseDialog = () => {
        submitFormDialog(value); 
        reset();
    }

    return (
        <Dialog
            open={open}
            onClose={closeDialog}
            aria-describedby={'alert-dialog-slide-description'}
            className={'form-dialog'}
        >
            <div className='form-dialog__nav'>
                <IconButton onClick={closeDialog}>
                    <CloseIcon/>
                </IconButton>
            </div>
            <div className='form-dialog__header'>
                <div className='form-dialog__header--icon'>
                    <IconButton>
                        <WarningIcon/>
                    </IconButton>
                </div>
                <div className='form-dialog__header--message'>
                    <h4 className='noti-message--title'>Вы уверены?</h4>
                    <p className='text-disabled subtitle margin-top'>
                        Вы уверены что хотите отменить? После отмены, вашу заявку нужно будет заполнить заново
                    </p>
                </div>
            </div>
            <DialogContent className='form-dialog__content'>
                <TextField
                    autoFocus
                    margin={'dense'}
                    id={'form-cancelation-textarea'}
                    label={'Введите причину отказа...'}
                    type={'text'}
                    fullWidth
                    multiline
                    rows={4}
                    variant={'filled'}
                    className={'form-dialog__content--input'}
                    error={true}
                    value={value}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions className='form-dialog__actions'>
                <Button 
                    className='form-dialog__actions--button app-button'
                    onClick={submitCloseDialog}
                >
                    Подтвердить отмену
                </Button>
                <Button 
                    className='form-dialog__actions--button-outlined app-button'
                    onClick={closeDialog}
                >
                    Отмена
                </Button>
            </DialogActions>
        </Dialog>
    );
}
