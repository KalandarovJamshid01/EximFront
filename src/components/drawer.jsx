import { useNavigate } from 'react-router-dom';
// ROUTE PARTIALS
import { ExternalNavLink } from '../routes/partials';
import { List } from '@mui/material';

function Drawer({ menuItems, to, parent }) {
    const navigate = useNavigate();
    const MenuBar = menuItems.map((item, index) => {
        return (
            <ExternalNavLink 
                to={item.label} 
                key={index}
                parent={parent}
                icon={item.icon}
            >{item.menu}</ExternalNavLink>
        );
    });
    return (
        <div className='app__view--drawer'>
            <div className='drawer'>
                <div className='drawer--logo'  onClick={() => to && navigate(to)}>
                    <div className='drawer--logo-sample'/>
                </div>
                <List className='drawer--menubar'>{MenuBar}</List>
            </div>
        </div>
    );
}

export default Drawer;