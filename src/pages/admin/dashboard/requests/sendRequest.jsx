import { useState } from 'react';
import { TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import useToggleState from '../../../../hooks/useToggleState';

export default function SendRequest({ document, handleStateChange }) {
    const [sendRequestComment, setRequestComment] = useState('');

    const handleChangeCommentState = (e) => {
        setRequestComment(e.target.value);
        handleStateChange('comment', sendRequestComment);
    }

    // console.log('• viewRequests.jsx is working 📑');
    return (
        <div className='request-drawer__content'>
            <div className='request-drawer__content--form-container'>
                <div className='form-container'>
                    <h4 className='form-container__label text-disabled'>Название заявки</h4>
                    <h2 className='form-container__value'>{document.name}</h2>
                </div>
                <div className='form-container'>
                    <h4 className='form-container__label text-disabled'>Режим</h4>
                    <h2 className='form-container__value'>{document.rejim}</h2>
                </div>
                <CheckBase
                    label={'Транспортная накладная ( TIR, CMR, жд, накладная, авиа накладная, коносамент и т.д )'}
                    name={document.transport_nak.filename}
                    optionChange={{
                        change: handleStateChange,
                        stateVal: 'transport_nak'
                    }}
                /> 
            </div>
            <div className='request-drawer__content--form-container'>
                <CheckBase
                    label={'Инвойс'}
                    name={document.invoice.filename}
                    optionChange={{
                        change: handleStateChange,
                        stateVal: 'invoice'
                    }}
                /> 
                <CheckBase
                    label={'Упаковочный лист'}
                    name={document.package_list.filename}
                    optionChange={{
                        change: handleStateChange,
                        stateVal: 'invoice'
                    }}
                /> 
                <CheckBase
                    label={'Контракт'}
                    name={document.contract.filename}
                    optionChange={{
                        change: handleStateChange,
                        stateVal: 'contract'
                    }}
                /> 
            </div>
            <div className='request-drawer__content--form-container'>
                <CheckBase
                    label={'Сертификат происхождения'}
                    name={document.certificate.filename}
                    optionChange={{
                        change: handleStateChange,
                        stateVal: 'certificate'
                    }}
                />
                <CheckBase
                    label={'Дополнительная документация'}
                    name={document.extra_doc.filename}
                    optionChange={{
                        change: handleStateChange,
                        stateVal: 'extra_doc'
                    }}
                /> 
                <CheckBase
                    label={'Список товаров'}
                    name={document.product_list.filename}
                    optionChange={{
                        change: handleStateChange,
                        stateVal: 'product_list'
                    }}
                /> 
            </div>
            <div className='request-drawer__content--form-container'>
                <div className='form-container'>
                    <h4 className='form-container__label text-disabled'>Сертификация груза</h4>
                    <h2 className='form-container__value'>Определение кодов ТНВЭД</h2>
                </div>
                <CheckBase
                    label={'Прочие документы'}
                    name={document.prochie_doc.filename}
                    optionChange={{
                        change: handleStateChange,
                        stateVal: 'prochie_doc'
                    }}
                />
            </div>
            <div className='request-drawer__content--form-container'>
                <div className='form-container w-100'>
                    <h4 className='form-container__label text-disabled'>
                        Выбранный пост таможни
                    </h4>
                    <h2 className='form-container__value'>
                        Узбекистан, Ташкент, Яшнабадск...   
                    </h2>
                </div>
            </div>
            <div className='request-drawer__content--form-container'>
                <div className='form-container w-100 no-border padding-bottom-5'>
                    <h4 className='form-container__label text-disabled'>
                        Комментарий к заявке от клиента
                    </h4>
                    <TextField
                        margin={'dense'}
                        id={'form-cancelation-textarea'}
                        label={'Введите причину отказа...'}
                        type={'text'}
                        fullWidth
                        multiline
                        rows={4}
                        variant={'filled'}
                        value={sendRequestComment}
                        onChange={handleChangeCommentState}
                        className={'form__textarea--error'}
                    />
                </div>
            </div>
        </div>
    );
}

function CheckBase({ 
    label, 
    name,
    optionChange
}) {
    const [state, toggle] = useToggleState(false);

    const handleChangeToggle = (e) => {
        toggle();
        optionChange.change(optionChange.stateVal, !state);
    }
    return (
        <div className='form-container'>
            <h4 className='form-container__label text-disabled'>{label}</h4>
            <div className='form-container__details'>
                <h2 className='form-container__value'>{name}</h2>
                <Checkbox
                    color={'error'}
                    value={state}
                    onChange={handleChangeToggle}
                />
            </div>
        </div>
    )
}
