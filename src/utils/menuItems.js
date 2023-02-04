import { 
    Subject as DocumentIcon,
    Badge as CertificateIcon,
    Source as CodeIcon,
    DocumentScanner as ExampleDocIcon,
    HelpCenter as HelpIcon,
    SupportAgent as SupportIcon,
    Business as AddressIcon
} from '@mui/icons-material';

const menuItems = [
    { menu: 'Таможенное оформление', label: 'submissions', icon: <DocumentIcon/> },
    { menu: 'Опредление органа сертификации', label: false, icon: <CertificateIcon/> },
    { menu: 'Онлайн поддержка', label: 'support', icon: <SupportIcon/> },
    { menu: 'Определение кода ТНВ', label: false, icon: <CodeIcon/> },
    { menu: 'Образцы документов', label: false, icon: <ExampleDocIcon/> },
    { menu: 'Адреса таможенных постов', label: false, icon: <AddressIcon/> },
    { menu: 'Помощь', label: false, icon: <HelpIcon/> },
];

export default menuItems;