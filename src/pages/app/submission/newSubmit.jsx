import { useState, useContext, Fragment } from 'react';
import { AppViewContext } from '../../../contexts/AppViewContext';
import { SnackbarContext } from '../../../contexts/SnackbarContext';
import { Link } from 'react-router-dom';
import { AppViewDispatch } from '../../../contexts/AppViewContext';
import ViewSubmit from './viewSubmit';
import NotiDialog from '../../../miniComponents/notificationDialog';
import SelectBase from '../../../miniComponents/selectBase';
import Upload from '../../../miniComponents/upload';
import Choice from '../../../miniComponents/choice';
import { Button, IconButton, CircularProgress } from '@mui/material';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import axios from 'axios';
import { peekaboo } from '../../../PEEKABOO';
import { blue } from '@mui/material/colors';

function NewSubmit() {
    //eslint-disable-next-line
    const state = useContext(AppViewContext);
    const dispatch = useContext(AppViewDispatch);
    const { handleCallToSnack } = useContext(SnackbarContext);
    const [applicationName, changeApplicationName] = useState('');
    const [submitComment, changeSubmitComment] = useState('');
    const [newDocument, setNewDocument] = useState({ });
    const [submitState, setSubmitState] = useState({});
    const [notiDialog, setNotiDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const optionStateChange = (optionState, newStateVal) => {
        dispatch({ type: "OPEN_FORMS" });
        submitState[optionState] = newStateVal;
        setSubmitState(submitState, newStateVal);
    }

    // const submitApplication = () => setNotiDialog(true);
    const handleCloseApplication = () => {
        setNotiDialog(false);
        dispatch({ type: "DRAWER_RESET" });
    }

    const handleRedirectApplication = (document) => {
        dispatch({ type: "DRAWER_OPEN_FULL", content: <ViewSubmit document={document}/> })
    }

    const handleSubmitNewApplication = () => {
        const converstion2ServerType = {
            name: applicationName,
            rejim: submitState.mode,
            transport_nak: submitState.billOfLading,
            invoice: submitState.invoice,
            package_list: submitState.packingList,
            contract: submitState.contract,
            certificate: submitState.certificateOfOrigin,
            extra_doc: submitState.additionalDocuments,
            product_list: submitState.productPhotos,
            tnvd: submitState.codes,
            certificate_found: submitState.contracts,
            prochie_doc: submitState.otherDocuments,
            port_office_id: submitState.postOffice,
            comments: {
                owner: 'client',
                text: submitComment
            },
        };

        if (!applicationName) {
            setLoading(false);
            return handleCallToSnack('danger', {
                title: 'Ошибка формы заявки',
                message: 'Пожалуйста, проверьте или заполните эти формы еще раз!'
            });
        }

        setLoading(true);
        axios.post(`${peekaboo}/document`, converstion2ServerType, {
            headers: { 'Authorization': `Bearer ${state.user.token}` }
        }).then(response => {
            if (response.status === 200) {
                setLoading(false);
                setNewDocument(response.data.data);
                setNotiDialog(true);
                dispatch({ type: 'CLOSE_FORMS' });
                dispatch({ type: 'ADD_APPLICATION', application: response.data.data });
            }
        }).catch(error => {
            setLoading(false);
            handleCallToSnack('danger', {
                title: 'Ошибка формы заявки',
                message: 'Пожалуйста, проверьте или заполните эти формы еще раз!'
            });
        });
    }

    // console.log('• NewSubmit is working 🆕');
    const postOfficesAddress = state.postOffices.map((post) => {
        return post.name;
    });
    return (
        <Fragment>
            {notiDialog && <NotiDialog 
                open={notiDialog}
                optionChange={{
                    close: handleCloseApplication,
                    redirect: () => handleRedirectApplication(newDocument)
                }}
            />}
            <div>
                <h3>Добавление заявки</h3>
                <div className='form margin-top-1'>
                    <h4 className='subtitle'>Название заявки</h4>
                    <input 
                        placeholder='Введите название вашей заявки...'
                        className='form__input margin-top'
                        onChange={(e) => changeApplicationName(e.target.value)}
                    />
                </div>
                <SelectBase
                    label={'Выбор режима'}
                    variants={[
                        'Экспорт',
                        'Реэкспорт',
                        'Временный вывоз',
                        'Выпуск для свободного обращения (импорт)',
                        'Реимпорт',
                        'Временный ввоз',
                        'Переработка на таможенной территории',
                        'Переработка вне таможенной территории',
                        'Временное хранение',
                        'Свободная таможенная зона',
                        'Магазин беспошлинной торговли',
                        'Свободный склад',
                        'Таможенный склад',
                        'Отказ в пользу государства',
                        'Уничтожение',
                        'Транзит',
                        'Неполная декларация',
                        'Предварительная декларация',
                        'Периодическая декларация',
                        'Временная декларация',
                        'Таможенный склад'
                    ]}
                    optionChange={{
                        change: optionStateChange,
                        stateVal: 'mode'
                    }}
                />
                <Upload
                    label={'Транспортная накладная (TIR,CMR,жд,накладная,авиа накладная,коносамент и т.д'}
                    progress={100}
                    fileName={'CertificationOfTruck.jpeg'}
                    optionChange={{
                        change: optionStateChange,
                        stateVal: 'billOfLading'
                    }}
                />
                <Upload 
                    label={'Инвойс'}
                    optionChange={{
                        change: optionStateChange,
                        stateVal: 'invoice'
                    }}
                />
                 <Upload 
                    label={'Упаковочный лист'}
                    optionChange={{
                        change: optionStateChange,
                        stateVal: 'packingList'
                    }}
                />
                <Upload 
                    label={'Конракт'}
                    optionChange={{
                        change: optionStateChange,
                        stateVal: 'contract'
                    }}
                />
                <Upload 
                    label={'Сертефикат происхождения'}
                    optionChange={{
                        change: optionStateChange,
                        stateVal: 'certificateOfOrigin'
                    }}
                />
                <Upload 
                    label={'Дополнительная документация'}
                    optionChange={{
                        change: optionStateChange,
                        stateVal: 'additionalDocuments'
                    }}
                />
                <Upload 
                    label={'Список товаров'}
                    optionChange={{
                        change: optionStateChange,
                        stateVal: 'productPhotos'
                    }}
                />
                <SelectBase
                    base={state.postOffices}
                    label={'Выберите таможенный пост'}
                    variants={postOfficesAddress}
                    optionChange={{
                        change: optionStateChange,
                        stateVal: 'postOffice'
                    }}
                />
                <Link
                    className='display-flex text-link height-40 hover-blue margin-top w-100'
                    target={'_blank'}
                    to={'/assets/documents/DTD.xlsx'}
                >
                    <IconButton className='text-blue'>
                        <DownloadIcon/>
                    </IconButton> 
                    <h4 className='text text-blue'>
                        Скачать шаблон для правильной загрузки списка товаров
                    </h4>
                </Link>
                <h4 className='subtitle padding-height-1'>Дополнительная услуги</h4>
                <Choice 
                    // defaultChecked
                    text={'Определение кодов ТНВЭД'}
                    optionChange={{
                        change: optionStateChange,
                        stateVal: 'codes'
                    }}
                />
                <Choice 
                    text={'Получение сертификатов'}
                    optionChange={{
                        change: optionStateChange,
                        stateVal: 'contracts'
                    }}
                />
                <Upload 
                    label={'Прочие документы'}
                    optionChange={{
                        change: optionStateChange,
                        stateVal:  'otherDocuments'
                    }}
                />
                <div className='form'>
                    <h4 className='subtitle padding-top'>Комментарий к заявке</h4>
                    <textarea 
                        placeholder='Введите комментарий...'
                        className='form__textarea--input'
                        onChange={(e) => changeSubmitComment(e.target.value)}
                    />
                </div>
                <Button 
                    disable={loading ? 'true' : 'false'}
                    className={`app-button app-button--warning padding-height ${loading && 'disabled'}`}
                    onClick={handleSubmitNewApplication}
                >
                    Подать заявку
                   {loading && <CircularProgress 
                        size={24}
                        sx={{
                            color: blue[900],
                            marginLeft: '1rem'
                        }}
                    />}
                </Button>
            </div>
        </Fragment>
    );
}
export default NewSubmit;

/* 

режима,
коносамент,
Инвойс,
Упаковочный лист,
Конракт,
Сертефикат происхождения,
Дополнительная документация,
Фотографии товаров,
Определение кодов,
Составление договора,
Прочие документы,
Введите комментарий


mode,
bill of lading,
invoice,
Packing list,
contract,
certificate of origin,
Additional Documentation,
Product photos,
Definition of codes,
Preparation of contract,
Other documents
Enter a comment

*/