import { useContext, memo, useRef } from 'react';
import { AppViewContext, AppViewDispatch } from '../../../contexts/AppViewContext';
import NewSubmit from './newSubmit';
import { Button } from '@mui/material';
import { getResponses } from '../../../actions/appActions';
import Application from '../../../components/application';
import ApplicationDrawer from '../../../components/applicationDrawer';
import { AddOutlined as NewIcon } from '@mui/icons-material';

export async function loader() {
    const responses = await getResponses();
    return { responses };
}

function Submits() {
    const scrollableMain = useRef(null);
    console.log('⚠️ Submissions.jsx is working as a PARENT!');
    const state = useContext(AppViewContext);
    const dispatch = useContext(AppViewDispatch);

    const handleOpenNewDrawer = () => dispatch({ type: "DRAWER_OPEN_MINI", content: <NewSubmit/> });

    const { applications } = state;
    return (
        <div className='application'>
            <div className='application__header'>
                <h3 className='application__header--title'>Таможенное оформление</h3>
                <Button 
                    className='application__header--submit app-button'
                    onClick={handleOpenNewDrawer}
                >
                    <NewIcon/>Подать заявку
                </Button>
            </div>
            <main ref={scrollableMain}>
                {applications.map((application, index) => 
                    <Application key={index} application={application}/> 
                )}
            </main>
            <ApplicationDrawer/>
        </div>
    );
}

export default memo(Submits);