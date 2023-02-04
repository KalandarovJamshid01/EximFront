import { useNavigate } from 'react-router-dom';
import Header from '../../layouts/navbar';
import Footer from '../../layouts/footer';
import { IconButton, Button } from '@mui/material';
import {
    LocationCity as LocationIcon,
    Duo as CallIcon,
    ContactMail as ContactMailIcon,
    Share as ShareIcon,
    KeyboardArrowRight as RightIcon
} from '@mui/icons-material';

export default function Home() {
    //eslint-disable-next-line
    const navigate = useNavigate();
    return (
        <div className='home'>
            <Header/>
            <main className='home__section'>
                <div className='home__section--intro'>
                    <div className='section__intro'>
                        <h3>Exim<span>ERP</span></h3>
                        <p>
                            Вывести уровень цифровизации процессов внешнеэкономической деятельности 
                            Республики Узбекистан на общемировой стандарт
                        </p>
                        <div className='section__intro--details'>
                            <Button>
                                Есть вопросы?
                            </Button>
                            <Button className='outline'>
                                Связаться с нами
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='home__section--about'>
                    <div className='about-section__fields'>
                        <h3>О нас</h3>
                        <h4>
                            Цифровая платформа EximERP - оптимизация ресурсного планирования внешнеэкономической деятельности Республики Узбекистан, которая:
                        </h4>
                        <ul>
                            <li>- способствует национальной экономике, увеличивая доходность в бюджет страны;</li>
                            <li>- обеспечивает защиту интересов страны, борясь с мошенничеством и незаконным оборотом запрещенных и ограниченных товаров;</li>
                            <li>- предоставляет статистическую информацию внешнеторговых операций, необходимую в экономическом планировании;</li>
                            <li>- способствует развитию международной торговли.</li>
                        </ul>
                        <Button className='app-button-blue margin-top-1'>
                            Подробнее
                        </Button>
                    </div>
                    <div className='grid-images'>
                        <div className='grid-images--left'>
                            <div className='grid-images__image--mini one'/>
                            <div className='grid-images__image--mini two'/>
                        </div>
                        <div className='grid-images--center'>
                            <div className='grid-images__image--center'/>
                        </div>
                        <div className='grid-images--right'>
                            <div className='grid-images__image--mini four'/>
                            <div className='grid-images__image--mini five'/>
                        </div>
                    </div>
                </div>
                <div className='home__section--partners'>
                    <h3>Наши партнёры</h3>
                    <div className='partners'>
                        <a href={'https://asycuda.org/en/'} target={'_blank'} rel="noreferrer">
                            <div className='partners--logo one'/>
                        </a>
                        <div className='partners--logo two'/>
                        <div className='partners--logo three'/>
                    </div>
                </div>
                <div className='home__section--contacts'>
                    <div className='section-contacts'>
                        <div className='section-contacts__infos'>
                            <div className='section-contacts__logo'/>
                            <h3>Контакты</h3>
                            <ul>
                                <li>
                                    <IconButton>
                                        <LocationIcon/>
                                    </IconButton>
                                    <h4>Узбекистан, Ташкент, Яшнабадский район, улица Султанали Машхадий, 79</h4>
                                </li>
                                <li>
                                    <IconButton>
                                        <CallIcon/>
                                    </IconButton>
                                    <h4>+998 (55) 506 45 54</h4>
                                </li>
                                <li>
                                    <IconButton>
                                        <ContactMailIcon/>
                                    </IconButton>
                                    <a href = "mailto:info@eximerp.com">info@eximerp.com</a>
                                </li>
                            </ul>
                        </div>
                        <iframe 
                            title='EximERPYandexMap'
                            src="https://yandex.com/maps/10335/tashkent/house/YkAYdQZnTUEPQFprfX9wc3xrYg==/?ll=69.317544%2C41.312120&utm_source=share&z=17" 
                            allowFullScreen={true}
                            className='section-contacts__map'
                        />
                    </div>
                </div>
                <div className='home__section--sharing-news'>
                    <div className='sharing-new'>
                        <div className='sharing-new__header'>
                            <h3>Недавние новости</h3>
                            <h5>
                                Все новости
                                <RightIcon/>
                            </h5>
                        </div>
                        <div className='sharing-new__content'>
                            <div className='sharing-new__content--box'>
                                <div className='content-box__image one'/>
                                <div className='content-box__form'>
                                    <h4>Разнообразный и богатый опыт дальнейшее развитие различных форм деятельности позволяет оценить значение форм развития.</h4>
                                    <p>Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации направлений прогрессивного развития.</p>
                                    <div className='sharing-new__content--details'> 
                                        <p className='subtitle text-disabled'>23.01.2023 в 23:51</p>
                                        <div className='sharing-details'>
                                            <IconButton className='light'>
                                                <ShareIcon/>
                                            </IconButton>
                                            <IconButton>
                                                <RightIcon/>
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='sharing-new__content'>
                            <div className='sharing-new__content--box'>
                                <div className='content-box__image two'/>
                                <div className='content-box__form'>
                                    <h4>Повседневная практика показывает, что сложившаяся структура организации требуют определения и уточнения существенных финансовых и административных условий.</h4>
                                    <p>
                                    Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей деятельности в значительной степени обуславливает создание форм развития.
                                    </p>
                                    <div className='sharing-new__content--details'> 
                                        <p className='subtitle text-disabled'>13.01.2023 в 23:51</p>
                                        <div className='sharing-details'>
                                            <IconButton className='light'>
                                                <ShareIcon/>
                                            </IconButton>
                                            <IconButton>
                                                <RightIcon/>
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='sharing-new__content'>
                            <div className='sharing-new__content--box'>
                                <div className='content-box__image three'/>
                                <div className='content-box__form'>
                                    <h4>
                                        С другой стороны постоянный количественный рост и сфера нашей активности требуют от нас анализа соответствующий условий активизации.
                                    </h4>
                                    <p>
                                        Равным образом дальнейшее развитие различных форм деятельности требуют от нас анализа соответствующий условий активизации.
                                    </p>
                                    <div className='sharing-new__content--details'> 
                                        <p className='subtitle text-disabled'>04.01.2023 в 23:51</p>
                                        <div className='sharing-details'>
                                            <IconButton className='light'>
                                                <ShareIcon/>
                                            </IconButton>
                                            <IconButton>
                                                <RightIcon/>
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </main>
        </div>
    );
}