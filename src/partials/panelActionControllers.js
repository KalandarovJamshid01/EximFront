import { Fragment } from 'react';
import { Button, CircularProgress } from '@mui/material';
import {
    NavigateNext as RightIcon,
    NavigateBefore as LeftIcon
} from '@mui/icons-material';
import { orange } from '@mui/material/colors';

export default function PanelActionControllers({ 
    actionIndexChange, 
    index, 
    handleCloseModal,
    handleSubmitSendRequest,
    buttonLoader,
    view
}) {
    const isDisabled = function() {
        if (view && view.steps[view.steps.length - 1].step >=3 ) {
            return true
        } else return false;
    }();
    if (index === 0) return (
        <Fragment>
            <Button 
                className='app-button request-drawer__actions--button button-blue'
                onClick={handleCloseModal}
            >Отправить</Button>
            <Button 
                className='app-button request-drawer__actions--button'
                onClick={() => actionIndexChange(1)}
            >
                {/* Вернуться к заявке  */}
                Вернуться
                <RightIcon className='margin-left'/>
            </Button>
            <Button/>
        </Fragment>
    ); 
    else if (index === 1) return (
        <Fragment>
            <Button 
                className='app-button request-drawer__actions--button'
                onClick={() => actionIndexChange(0)}
            >
                <LeftIcon className='margin-right'/>
                Подготовка счёта на оплату
            </Button>
            <Button 
                className='app-button request-drawer__actions--button button-blue'
                onClick={handleCloseModal}
            >Отклонить</Button>
            {isDisabled ? (
                <Button/>
            ): (
                <Button 
                    className='app-button request-drawer__actions--button'
                    onClick={() => actionIndexChange(2)}
                >
                    На доработку 
                    <RightIcon className='margin-left'/>
                </Button>
            )}
        </Fragment>
    );
    else if (index === 2) return (
        <Fragment>
            <Button/>
            <Button 
                className='app-button request-drawer__actions--button'
                onClick={() => actionIndexChange(1)}
            >
                <LeftIcon className='margin-right'/>
                Вернуться
            </Button>
            <Button 
                className='app-button request-drawer__actions--button button-blue'
                onClick={handleSubmitSendRequest}
            >
                Отправить
                {buttonLoader && <CircularProgress 
                    size={24}
                    sx={{ color: orange[500], marginLeft: '1rem' }}
                />}
            </Button>
        </Fragment>
    );
}