import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton
} from '@mui/material';
import { CloseOutlined as CloseIcon } from "@mui/icons-material";

export default function ScrollDialog({ open, handleClose }) {
    console.log('• scrollableDialog.jsx is working 🔊 as a NOTIFICATION-PANEL');
    const Notifications = [
        { status: 'default' },
        { status: 'danger' },
        { status: 'warning' },
        { status: 'success' },
    ];
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby={'scroll-dialog-title'}
                aria-describedby={'scroll-dialog-description'}
                className='header-notification'
            >
                <div className='header-notification__header'>
                    <h4>Уведомления</h4>
                    <IconButton onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                <DialogContent dividers={true} className='header-notification__content'>
                    {Notifications.map((noti, index) => (
                        <div className='header-notification__modal' key={index}>
                            <div className={`header-notification__modal--list ${noti.status}`}>
                                <div className='modal-list__infos'>
                                    <h4 className='modal-list__infos--name'>
                                        Заявка №846246
                                    </h4>
                                    <h4 className='modal-list__infos--date text-disabled'>
                                        21.12.2023
                                    </h4>
                                </div>
                                <div className='header-notification__modal--content'>
                                    <p className='subtitle text-disabled'>
                                        Поздравляем, заявка №846246 прошла проверку успешно, вы можете загрузить готовый файл. Спасибо что выбрали нас!
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {Array(5).fill().map((model, index) => (
                        <div className='header-notification__modal' key={index}>
                            <div className='header-notification__modal--list default'>
                                <div className='modal-list__infos'>
                                    <h4 className='modal-list__infos--name'>
                                        Заявка №846246
                                    </h4>
                                    <h4 className='modal-list__infos--date text-disabled'>
                                        21.12.2023
                                    </h4>
                                </div>
                                <div className='header-notification__modal--content'>
                                    <p className='subtitle text-disabled'>
                                        Поздравляем, заявка №846246 прошла проверку успешно, вы можете загрузить готовый файл. Спасибо что выбрали нас!
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions className='header-notification__options'>
                    <Button 
                        onClick={handleClose}
                        className='app-button header-notification__options--button'
                    >
                        Oчистить уведомления
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}