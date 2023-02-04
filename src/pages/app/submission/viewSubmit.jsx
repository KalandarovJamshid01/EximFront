import { useState, useContext, Fragment } from 'react';
import { AppViewContext, AppViewDispatch } from '../../../contexts/AppViewContext';
import { SnackbarContext } from '../../../contexts/SnackbarContext';
import { Button, IconButton } from '@mui/material';
import { 
    KeyboardArrowLeftOutlined as ArrowLeftIcon,
    // KeyboardArrowRightOutlined as ArrowRightIcon,
    Warning as WarningIcon,
    HourglassTop as WaitingIcon,
    DownloadForOffline as DownloadIcon
} from '@mui/icons-material';
import FormDialog from '../../../miniComponents/formDialog';
import makeFirstLetterUpperCase from '../../../utils/makeFirstLetterUpperCase';
import documentStatus from '../../../utils/documentStatus';

function ViewSubmit({ document }) {
    // const { application, status } = response;
    const submitStatus = documentStatus(document.steps[document.steps.length - 1].step);
    const dispatch = useContext(AppViewDispatch);
    const state = useContext(AppViewContext);
    const { handleCallToSnack } = useContext(SnackbarContext);


    const [formDialog, setFormDialog] = useState(false);

    const submitCancelationForm = (feedback) => {
        setFormDialog(false);
        handleCallToSnack(false, "Your application has been canceled");
        dispatch({ type: "DRAWER_RESET" });
    }

    const dateParser = (date) => {
        let exactDate = new Date(date);
        let actualDate = `от ${exactDate.getDate() + 1}-${exactDate.getMonth() + 1}-${exactDate.getFullYear()} г в. ${exactDate.getHours()}:${exactDate.getMinutes()}`;
        return actualDate;
    }

    const lastStep = document.steps[document.steps.length - 1].step;
    console.log(document)

    console.log('• ViewSubmit is working!');
    return (
        <Fragment>
            <div className='viewsubmit'>
                <div className='viewsubmit__header'>
                    <div className='viewsubmit__header--status'>
                        <h4>Заявка №
                            <span className='info-id'>{document.UUID}</span>
                        </h4>
                        <p className='text-disabled subtitle margin-top'>
                            {dateParser(document.createdAt)}
                        </p>
                    </div>
                    <div className='viewsubmit__header--options'>
                        <Button>Создать копию</Button>
                        <Button onClick={() => dispatch({ type: "DRAWER_RESET" })}>
                            <ArrowLeftIcon/> К списку
                        </Button>
                    </div>
                </div>
                <div className='viewsubmit__content'>
                    <div className='viewsubmit__content--list viewlist'>
                        <div className={`viewlist__status--header status__header--${submitStatus.class} text-white`}>
                            <h4 className='circle--white'>Статус</h4>
                            <h4>{submitStatus.text}</h4>
                        </div>
                        <div className='viewlist__status--header'>
                            <div className='display-column-center'>
                                <h4>Ответственный:{' '}
                                    <span className='focus-blue'>
                                        {document.declarant_id.firstName} {document.declarant_id.lastName}
                                    </span>
                                </h4>
                                <h4 className='margin-top'>
                                    Контактная информация: {' '}
                                    <span className='text-disabled'>
                                        {document.declarant_id.phone}
                                    </span>
                                </h4>
                            </div>
                        </div>
                        <div className='viewlist__status'>
                            {/* <h4 className='viewlist__status--title'>
                                Заявка №
                                <span className='info-id'>{document.UUID}</span>
                            </h4>
                            <p className='text-disabled margin-top-small subtitle'>
                                {dateParser(document.createdAt)}
                            </p> */}
                            {/* <div className='viewlist__status--submits display-flex-between'>
                                <h4 className='viewlist__status--submits-name subtitle'>Выбор процедуры</h4>
                                <p className='text-disabled subtitle'>{document.rejim}</p>
                            </div> */}
                            <div className='viewlist__status--submits display-flex-between'>
                                <h4 className='viewlist__status--submits-name subtitle'>Выбор режима</h4>
                                <p className='subtitle text-disabled'>
                                    {document.rejim}
                                </p>
                            </div>
                            <div className='viewlist__status--submits display-flex-between'>
                                <h4 className='viewlist__status--submits-name subtitle'>
                                    Транспортная накладная (TIR,CMR,жд,накладная,авиа накладная,коносамент и т.д)
                                </h4>
                                <p className='subtitle focus-blue--link active'>
                                    <a 
                                        rel={'noreferrer'}
                                        href={document.transport_nak.url} 
                                        target={'_blank'}
                                    >{document.transport_nak.filename}</a>
                                </p>
                            </div>
                            <div className='viewlist__status--submits display-flex-between'>
                                <h4 className='viewlist__status--submits-name subtitle'>Инвойс</h4>
                                <p className='subtitle focus-blue--link'>
                                    <a 
                                        rel={'noreferrer'}
                                        href={document.transport_nak.url} 
                                        target={'_blank'}
                                    >
                                        {document.invoice.filename}
                                    </a>
                                </p>
                            </div>
                            <div className='viewlist__status--submits display-flex-between'>
                                <h4 className='viewlist__status--submits-name subtitle'>Упаковочный лист</h4>
                                <p className='subtitle focus-blue--link'>
                                    <a 
                                        rel={'noreferrer'}
                                        href={document.transport_nak.url} 
                                        target={'_blank'}
                                    >
                                        {document.package_list.filename}
                                    </a>
                                </p>
                            </div>
                            <div className='viewlist__status--submits display-flex-between'>
                                <h4 className='viewlist__status--submits-name subtitle'>Контракт</h4>
                                <p className='subtitle focus-blue--link'>
                                    <a 
                                        rel={'noreferrer'}
                                        href={document.transport_nak.url} 
                                        target={'_blank'}
                                    >
                                        {document.contract.filename}
                                    </a>
                                </p>
                            </div>
                            <div className='viewlist__status--submits display-flex-between'>
                                <h4 className='viewlist__status--submits-name subtitle'>Сертефикат происхождения</h4>
                                <p className='subtitle focus-blue--link'>
                                    <a 
                                        rel={'noreferrer'}
                                        href={document.transport_nak.url} 
                                        target={'_blank'}
                                    >
                                        {document.certificate.filename}
                                    </a>
                                </p>
                            </div>
                            {document.prochie_doc.filename && (
                                <div className='viewlist__status--submits display-flex-between'>
                                    <h4 className='viewlist__status--submits-name subtitle'>Список необходимых разрешительных док-в</h4>
                                    <p className='subtitle focus-blue--link'>
                                        <a 
                                            rel={'noreferrer'}
                                            href={document.transport_nak.url} 
                                            target={'_blank'}
                                        >
                                            {document.prochie_doc.filename}
                                        </a>
                                    </p>
                                </div>
                            )}
                            <div className='viewlist__status--submits display-flex-between'>
                                <h4 className='viewlist__status--submits-name subtitle'>Пост</h4>
                                <p className='subtitle text-disabled'>Томоженный пост ВЭД "{document.port_office_id.name}"</p>
                            </div>
                        </div>
                        {/* <div className='viewlist__status'>
                            <h4 className='viewlist__status--title'>Информация по декларированию</h4>
                            <p className='text-disabled margin-top-small subtitle'>от 15 октября 2022 г в. 16:56</p>
                            <div className='viewlist__status--submits display-flex-between'>
                                <h4 className='viewlist__status--submits-name subtitle'>Режим</h4>
                                <p className='subtitle text-disabled'>Выпуск для свободного ообращения (импорт) [40]</p>
                            </div>
                            <div className='viewlist__status--submits display-flex-between'>
                                <h4 className='viewlist__status--submits-name subtitle'>Список необходимых разрешительных док-в</h4>
                                <p className='subtitle focus-blue'>Сертефикат соотвестия</p>
                            </div>
                            <div className='viewlist__status--submits display-flex-between'>
                                <h4 className='viewlist__status--submits-name subtitle text-disabled'>Метод</h4>
                                <p className='subtitle'>Резериный</p>
                            </div>
                            <div className='viewlist__status--submits display-flex-between'>
                                <h4 className='viewlist__status--submits-name subtitle'>Пост</h4>
                                <p className='subtitle text-disabled'>Томоженный пост ВЭД "{document.port_office}"</p>
                            </div>
                        </div> */}
                    </div>
                    <div className='viewsubmit__content--history'>
                        <h3>История</h3>
                        {document.steps.map((action, index) => {
                            return (
                                <div className='viewhistory' key={index}>
                                    <div className='viewhistory__details display-flex-between'>
                                        <h4 className='subtitle'>Стадия изменена</h4>
                                        <h4 className='text-disabled subtitle'>
                                            {dateParser(action.created_at)}
                                        </h4>
                                        <h4 className='subtitle'>
                                            
                                        </h4>
                                    </div>
                                    <div className='viewhistory__directions display-flex-between'>
                                        <h4 className='viewhistory__directions--to'>
                                            {documentStatus(action.step).text}
                                        </h4>
                                        {/* <ArrowRightIcon/> */}
                                        <h4 className='subtitle color-orange'>
                                            {/* WON */}
                                            {/* {documentStatus(((action.step + 1) ? action.step + 1 : action.step)).text} */}
                                            {makeFirstLetterUpperCase(action.name, true)}
                                        </h4>
                                    </div>
                                </div>
                            );
                        })}
                        <div className='viewhistory__checkers display-flex-between'>
                            <h4 className='subtitle'>Создона заявка</h4>
                            <h4 className='text-disabled subtitle'>
                                {dateParser(document.createdAt)}
                            </h4>
                            <h4 className='subtitle'>
                                {makeFirstLetterUpperCase(state.user.details.CN, true)}
                            </h4>
                        </div>
                    </div>
                </div>
                {(lastStep >= 4 && lastStep < 8) && (
                    <Fragment>
                        <div className='viewtaxes'>
                            <h3>Спецификация к декларирования</h3>
                            <div className='viewtaxes__header'>
                                <ul>
                                    <li>Наименование</li>
                                    <li>Цена</li>
                                    <li>Кол-во</li>
                                    <li>Ед. Измерения</li>
                                    <li>Налог</li>
                                    <li>НДС</li>
                                    <li>Итого</li>
                                </ul>
                            </div>
                            <div className='viewtaxes__list'>
                                <ul>
                                    <li>1.Общая стоимость декларирования</li>
                                    <li>900 000.00</li>
                                    <li>900 000.00</li>
                                    <li>шт.</li>
                                    <li>15%</li>
                                    <li>135 000</li>
                                    <li>1 035 000.00</li>
                                </ul>
                            </div>
                            <div className='viewtaxes__list'>
                                <ul>
                                    <li>2. Таможенные платежи: таможенные сборы</li>
                                    <li>245 000.00</li>
                                    <li>245 000.00</li>
                                    <li>шт.</li>
                                    <li>15%</li>
                                    <li>0</li>
                                    <li>245 000.00</li>
                                </ul>
                            </div>
                            <div className='viewtaxes__list'>
                                <ul>
                                    <li>3. Таможенные платежы: Пошлина</li>
                                    <li>24 500 000.00</li>
                                    <li>24 500 000.000</li>
                                    <li>шт.</li>
                                    <li>15%</li>
                                    <li>0</li>
                                    <li>24 500 000.00</li>
                                </ul>
                            </div>
                            <div className='viewtaxes__list'>
                                <ul>
                                    <li>3. Таможенные платежы: НДС</li>
                                    <li>3 500 000.00</li>
                                    <li>3 500 000.00</li>
                                    <li>шт.</li>
                                    <li>15%</li>
                                    <li>0</li>
                                    <li>3 500 000.00</li>
                                </ul>
                            </div>
                        </div>
                        <div className='viewcost'>
                            <div className='viewcost__line'>
                                <h4>Сумма без НДС:</h4>
                                <p>29 145 000 UZS</p>
                            </div>
                            <div className='viewcost__line'>
                                <h4>НДС:</h4>
                                <p>135 000 UZS</p>
                            </div>
                            <div className='viewcost__line'>
                                <h4>Общая сумма:</h4>
                                <p>29 280 000 UZS</p>
                            </div>
                        </div>
                        <div className='viewsubmit__warning display-flex'>
                            <IconButton className='danger'>
                                <WarningIcon/>
                            </IconButton>
                            <p className='subtitle margin-left-1 color-danger'>
                                Цена, указанная выше, является предварительной. Она может измениться в зависимости от расходов на сертификацию или иные услуги.
                            </p>
                        </div>
                    </Fragment>
                )}
                {lastStep === 7 && (
                    <div className='viewsubmit__warning display-flex'>
                        <IconButton className='warning'>
                            <WaitingIcon/>
                        </IconButton>
                        <p className='subtitle margin-left-1 color-yellow'>
                            Счёт принят клиентом, ожидается оплата
                        </p>
                        <Button className='app-button-orange margin-left-auto'>
                            <DownloadIcon className='margin-side'/>
                            СКАЧАТЬ СЧЁТ НА ОПЛАТУ
                        </Button>
                    </div>
                )}
                <div className='viewsubmit__form'>
                    {lastStep === 7 && (
                        <Button className='viewsubmit__form--accept success'>
                            Я оплатил
                        </Button>
                    )}
                    {(lastStep >= 4 && lastStep < 7) && (
                        <Button className='viewsubmit__form--accept warning'>
                            Согласиться c условиями
                        </Button>
                    )}
                    {lastStep < 8 && (
                         <Button 
                            className='viewsubmit__form--decline'
                            onClick={() => setFormDialog(true)}
                        >
                            Отказаться
                        </Button>
                    )}
                </div>
            </div>
            {formDialog && <FormDialog 
                open={formDialog}
                closeDialog={() => setFormDialog(false)}
                submitFormDialog={submitCancelationForm}
            />}
        </Fragment>
    );
}
export default ViewSubmit;