import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { DashboardContext } from '../contexts/DashboardContext';
import { RootDispatch } from '../contexts/RootContext';
// MATERIALS
import { 
    IconButton, 
    Badge, 
    Avatar, 
    Divider, 
    Menu, 
    MenuItem, 
    ListItemIcon
} from '@mui/material';
import { 
    NotificationsActive as AlertIcon,
    KeyboardArrowDownOutlined as ArrowDown,
    MoreVert as OptionsIcon,
    Person2 as ProfileIcon,
    ManageAccounts as ProfileSettingsIcon,
    Logout as LogoutIcon
} from '@mui/icons-material';
// DEFAULT MATERIAL COMPONENTS PROPS
import headerOptionsProps from '../props/headerOptionsProps';
// SCROLLABLE NOTIFICATION DIALOG
import ScrollDialog from '../miniComponents/scrollableDialog';
import LocationMatch from '../utils/locationMatch';

function Header(props) {
    const { navPanel } = props;
    const { user } = useContext(DashboardContext);
    const rootDispatch = useContext(RootDispatch);
    const navigate = useNavigate();
    const [anchorOptionMenu, setAnchorOptionMenu] = useState(null);
    const [toggleOptions, setToggleOptions] = useState(false);
    const [toggleNotifications, setToggleNotifications] = useState(false);
    const handleClick = (event) => {
        setAnchorOptionMenu(event.currentTarget);
        setToggleOptions(true);
    };
    const handleRemoveUser = () => {
        rootDispatch({ type: 'REMOVE_USER' });
        navigate("/");
    }

    // TIMER BELL | TIMER BELL | TIMER BELL | TIMER BELL
    const [bell, setBell] = useState(true);
    useEffect(() => {
        const timer = false && setInterval(() => setBell(!bell), 1000);
        return function() {
            clearInterval(timer);
        }
    }, [bell]);

    const { details } = user;
    return (
        <header className='app__header'>
            <nav className='app__nav'>
                <div className='app__nav--options'>
                    <div className='app__nav--notifications'>
                        <IconButton
                            onClick={() => setToggleNotifications(true)}
                        >
                            <Badge 
                                overlap={'rectangular'} 
                                badgeContent={12} 
                                color={'warning'}
                                className={`notification--alert ${bell && 'alert-poper'}`}
                            >
                                <AlertIcon className='bell-poper'/>
                            </Badge>
                        </IconButton>
                    </div>
                    <div className='app__nav--profile'>
                        <Avatar 
                            alt={details.photo.filename} 
                            src={details.photo.url}
                            className='app__nav--profile-photo'
                        />
                        <h3 className='app__nav--profile-name'>
                            {details.firstName + ' ' + details.lastName}
                        </h3>
                        <IconButton
                            onClick={handleClick}
                            size={'small'}
                            sx={{ ml: 2 }}
                            aria-controls={toggleOptions ? 'account-menu' : undefined}
                            aria-haspopup={'true'}
                            aria-expanded={toggleOptions ? 'true' : undefined}
                            className={'profile__options'}
                        >
                            <OptionsIcon/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorOptionMenu}
                            id={'account-menu'}
                            open={toggleOptions}
                            onClose={() => setToggleOptions(false)}
                            onClick={() => setToggleOptions(false)}
                            PaperProps={headerOptionsProps}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            className={'profile__options--menu'}
                        >
                            <MenuItem>
                                <ListItemIcon>
                                    <ProfileIcon/>
                                </ListItemIcon>
                                My account
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ProfileSettingsIcon />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <Divider className={'profile__options--divider'}/>
                            <MenuItem onClick={handleRemoveUser}>
                                <ListItemIcon>
                                    <LogoutIcon/>
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </nav>
            {navPanel && <NavPanel/>}
            {toggleNotifications && <ScrollDialog
                open={toggleNotifications}
                handleClose={() => setToggleNotifications(false)}
            />}
        </header>
    );
}

export default Header;

function NavPanel() {
    const navigate = useNavigate();
    const navPanelItems = [
        { label: 'Заявки на рассмотрении', path: 'applications' },
        { label: 'Принятые заявки', path: 'accepted-applications'},
        { label: 'Все заявки', path: 'all-applications' }
    ];
    const panels = navPanelItems.map((item, index) => {
        const match = LocationMatch(`/dashboard/${item.path}`, true);
        const tryRedirect = () => {
            if (item.path) return navigate(`/dashboard/${item.path}`);
        }
        return (
            <div 
                key={index}
                onClick={tryRedirect} 
                className={`preview__panel--menu ${match && 'active-menu'}`}
            >
                {item.label}
            </div>
        );
    });
    return (
        <div className='preview__panel'>
            <div className='preview__panel--menubar'>{panels}</div>
            <div className='preview__panel--options'>
                Ещё <IconButton><ArrowDown/></IconButton>
            </div>
        </div>
    );
}