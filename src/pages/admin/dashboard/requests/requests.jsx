import { useContext } from 'react';
import { DashboardContext } from '../../../../contexts/DashboardContext';
import RequestApplication from '../../../../components/requestApplication';
import RequestDrawer from '../../../../components/requestDrawer';

export default function Requests() {
    const { applications } = useContext(DashboardContext);
    console.log('🇺🇸 Requests is working as PARENT!');

    return (
        <div className='requests'>                    
            <div className='requests__header'>
                <h3 className='requests__header--title'>Заявки на рассмотрении</h3>
            </div>
            {applications.map((application, index) => (
                <RequestApplication application={application} key={index}/>
            ))}
            <div className='requests__drawer'>
                <RequestDrawer/>
            </div>
        </div>
    );
}