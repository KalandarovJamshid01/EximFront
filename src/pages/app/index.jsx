import { Outlet } from 'react-router-dom';
import Drawer from '../../components/drawer';
import Header from '../../components/header';
import menuItems from '../../utils/menuItems';

function AppView() {
    const user = {
        name: 'Natali Ivanovna',
        email: 'ultracosmos@github.dev',
        profile: 'false'
    };
    return (
        <div className='app__view'>
            <Drawer
                parent={'app'}
                menuItems={menuItems} 
            />
            <Header user={user} navPanel/>
            <main className='app__view--main'>
                <Outlet/>
            </main>
        </div>
    );
}

export default AppView;