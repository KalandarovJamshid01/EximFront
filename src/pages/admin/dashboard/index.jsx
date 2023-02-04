import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import Drawer from '../../../components/drawer';
import AdminHeader from '../../../components/adminHeader';
import dashboardMenuItems from '../../../utils/dashboardMenuItems';

function Dashboard() {
    return (
        <div className='app__view'>
            <Drawer to={false} parent={'dashboard'} menuItems={dashboardMenuItems} />
            <AdminHeader navPanel/>
            <main className='app__view--main'>
                <Outlet/>
            </main>
        </div>
    );
}

export default memo(Dashboard);