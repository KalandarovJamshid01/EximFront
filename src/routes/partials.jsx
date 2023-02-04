import { useNavigate } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText, Badge } from '@mui/material';
import LocationMatch from '../utils/locationMatch';

export function ExternalNavLink({ to, parent, children, icon }) {
    const navigate = useNavigate();
    const match = LocationMatch(`/${parent}/${to}`);
    if (to === "support") {
        return (
            <Badge
                overlap={'rectangular'} 
                badgeContent={'BETA'} 
                color={'warning'}
                className={`text-blue w-100`}
            >
                <ListItem 
                    button
                    className={`drawer--menu border-left ${match && 'active-menu-item'} hover`}
                    onClick={() => navigate(to)}
                >
                    { icon && (
                        <ListItemIcon className={`drawer--icon`}>
                            {icon}
                        </ListItemIcon>
                    )}
                    <ListItemText className={`drawer--item`}>{children}</ListItemText>
                </ListItem>
            </Badge>
        );
    } else return (
        <ListItem 
            button
            className={`drawer--menu border-left ${match && 'active-menu-item'}`}
            onClick={() => navigate(to)}
        >
            { icon && (
                <ListItemIcon className={`drawer--icon`}>
                    {icon}
                </ListItemIcon>
            )}
            <ListItemText className={`drawer--item`}>{children}</ListItemText>
        </ListItem>
    );
}

export function RedirectLink({ to, children , Append, className}) {
    const navigate = useNavigate();
    const navigateTo = () => navigate(to);
    return (
        <Append className={className} onClick={navigateTo}>
            {children}
        </Append>
    );
}