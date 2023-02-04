import { useContext, useState } from 'react';
import { DashboardContext, DashboardDispatch } from '../contexts/DashboardContext';
import { SnackbarContext } from '../contexts/SnackbarContext';
import SwipeablePanel from '../partials/swipeablePanel';
import PanelActionControllers from '../partials/panelActionControllers';
import ViewRequest from '../pages/admin/dashboard/requests/viewRequest';
import SendRequest from '../pages/admin/dashboard/requests/sendRequest';
import TransitionUp from '../props/transitionUpProps';
import { IconButton, Dialog, AppBar, Toolbar } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { Close as CloseIcon } from '@mui/icons-material';
import axios from 'axios';
import { peekaboo } from '../PEEKABOO';

export default function FullScreenDialog() {
    const theme = useTheme();
    const [buttonLoader, setButtonLoader] = useState(false);
    const { modal, user } = useContext(DashboardContext);
    const dispatch = useContext(DashboardDispatch);
    const { handleCallToSnack } = useContext(SnackbarContext);
    const handleCloseModal = () => dispatch({ type: "RESET_MODAL" });
    const changePanelIndex = (newIndex) => dispatch({ type: "CHANGE_MODAL_INDEX", index: newIndex });

    // SENDREQUEST.JSX
    const [sendRequestState, setRequstState] = useState({});
    const handleStateChange = (optionState, stateVal) => {
        sendRequestState[optionState] = stateVal;
        setRequstState(sendRequestState);
        sendRequestState['documentId'] = modal.view._id;
    }

    const handleSubmitSendRequest = () => {
        if (!sendRequestState.comment)
            return handleCallToSnack('danger', {
                title: "Вы должны написать комментарий.",
                message: "вы должны написать и отправить свое сообщение этому пользователю."
            })
        setRequstState({...sendRequestState, documentId: modal.view._id});
        setButtonLoader(true);
        axios.patch(`${peekaboo}/document/incomplete`, sendRequestState, {
            headers: { 
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 203) {
                setButtonLoader(false);
                setRequstState({});
                dispatch({ type: "ADD_APPLICATIONS", applications: response.data.data });
                dispatch({ type: "RESET_MODAL" });
            }
        }).catch(error => {
            return handleCallToSnack('warning', {
                title: "Ой! Что-то пошло не так!",
                message: `${error}`
            })
        });
    }

    return (
        <Dialog
            fullScreen
            open={modal.open}
            TransitionComponent={TransitionUp}
            className='request-drawer'
        >
            <AppBar className='request-drawer__navbar'>
                <Toolbar className='request-drawer__toolbar'>
                    {modal.view && <h4 className='request-drawer__navbar--title'>Заявка №{modal.view.UUID}</h4>}
                    <IconButton 
                        className='request-drawer__navbar--close'
                        onClick={handleCloseModal}
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {modal.index !== false && <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={modal.index}
                onChangeIndex={changePanelIndex}
            >
                <SwipeablePanel value={modal.index} index={0} dir={theme.direction}>
                    Item One
                </SwipeablePanel>
                <SwipeablePanel value={modal.index} index={1} dir={theme.direction}>
                    <ViewRequest document={modal.view}/>
                </SwipeablePanel>
                <SwipeablePanel value={modal.index} index={2} dir={theme.direction}>
                    <SendRequest 
                        document={modal.view}
                        handleStateChange={handleStateChange}
                    />
                </SwipeablePanel>
            </SwipeableViews>}
            <AppBar className='request-drawer__bottom-bar'>
                <Toolbar className='request-drawer__actions'>
                    <PanelActionControllers
                        view={modal.view}
                        actionIndexChange={changePanelIndex}
                        index={modal.index}
                        buttonLoader={buttonLoader}
                        handleCloseModal={handleCloseModal}
                        handleSubmitSendRequest={handleSubmitSendRequest}
                    />
                </Toolbar>
            </AppBar>
        </Dialog>
    );
}