import {
    RunningWithErrors as InProcessIcon,
    Grading as AcceptedIcon,
    FileCopy as AllIcon
} from '@mui/icons-material';

const menuItems = [
    { menu: 'Заявки на рассмотрении', label: 'applications', icon: <InProcessIcon/> },
    { menu: 'Принятые заявки', label: 'accepted-applications', icon: <AcceptedIcon/> },
    { menu: 'Все заявки', label: 'all-applications', icon: <AllIcon/> },
];

export default menuItems;