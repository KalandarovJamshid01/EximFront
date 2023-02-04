import { IconButton } from '@mui/material';
import { SettingsPhone as CallPhoneIcon } from '@mui/icons-material';

export default function Footer() {
    return (
        <footer className='footer-nav'>
            <div className='footer-nav__header'>
                <div className='footerbar__logo'/>
                <h3 className='footerbar__title'>
                    Автоматизированная интерактивная СИСТЕМА 
                    ‟<span className='footerbar__title--name'>
                        ОПТИМИЗАЦИЯ РЕСУРСНОГО ПЛАНИРОВАНИЯ ВЭД
                    </span>”
                </h3>
            </div>
            <div className='footer-nav__navbar'>
                <div className='footer-nav__appbar--left'>
                    <div className='footer-nav__contacts'>
                        <IconButton className='footer-nav__contacts--button'>
                            <CallPhoneIcon/>
                        </IconButton>
                        <div className='footer-nav__contacts--details'>
                            <h5>У вас есть вопрос?</h5>
                            <h4>+998 (55) 506 45 54</h4>
                        </div>
                    </div>
                </div>
                <ul className='footer-nav__navbar--navlink'>
                    <li className='navlink--item'>Новости</li>
                    <li className='navlink--item'>Контакты</li>
                    <li className='navlink--item'>Ресурсы</li>
                    <li className='navlink--item'>Партнёры</li>
                    <li className='navlink--item'>О нас</li>
                    <li className='navlink--item'>FAQ</li>
                </ul>
            </div>
         </footer>
    );
}