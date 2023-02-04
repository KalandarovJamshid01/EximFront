//import { useState } from 'react';
import {
    Button,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent
} from '@mui/material';
import { CloseOutlined as CloseIcon } from "@mui/icons-material";
  
export default function variantDialog({ open, optionChange }) {
    console.log('• variantDialog.jsx is working 💬');
    return (
        <Dialog
            open={open}
            onClose={() => optionChange("close")}
            aria-labelledby={'alert-dialog-title-1'}
            aria-describedby={'alert-dialog-description-1'}
            className='variant-dialog'
        >
        <div
            id={'alert-dialog-title-1'}
            className='variant-dialog__header'
        >
            <h4>Вы уверены?</h4>
            <IconButton onClick={() => optionChange("close")}>
                <CloseIcon/>
            </IconButton>
        </div>
        <DialogContent className='variant-dialog__content'>
            <p id={'alert-dialog-description-1'} className='variant-dialog__content--text text-disabled'>
                Вы уверены что хотите отменить? После отмены, вашу заявку нужно будет заполнить заново.
            </p>
        </DialogContent>
            <DialogActions className='variant-dialog__actions'>
                <Button 
                    className='app-button variant-dialog__actions--cancel'
                    onClick={() => optionChange("exit")}
                >
                    Подтвердить отмену
                </Button>
                <Button 
                    className='app-button variant-dialog__actions--close'
                    onClick={() => optionChange("close")}
                >Отмена</Button>
            </DialogActions>
        </Dialog>
    );
}