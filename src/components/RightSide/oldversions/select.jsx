import { Fragment } from 'react';
import useToggle from '../../hooks/useToggleState';
import useInputState from '../../hooks/useInputState';
import { v4 as uuid } from 'uuid';
import { IconButton, Select, MenuItem } from '@mui/material';
import {
    KeyboardArrowRightOutlined as ArrowRight,
    KeyboardArrowDownOutlined as ArrowDown,
    KeyboardArrowUpOutlined as ArrowTop
} from '@mui/icons-material';

export default function Selection(selectionProps) {
    const { 
        keyName, 
        arrowKey='right', 
        type='select',
        label,
        placeholder='Выбрать...',
        selections,
        labelPlaceholder='Выберите файл...',
        defaultVariant
    } = selectionProps;
    const [state, toggle] = useToggle(false);
    const [value, handleChange] = useInputState(defaultVariant ? defaultVariant : false);

    const selector = (function(htmlKey = uuid()) {
        if (type === 'select') return (
            <Fragment>
                <Select 
                    value={value}
                    open={state}
                    onClose={toggle}
                    onOpen={toggle}
                    onChange={handleChange}
                    className={`submit-selection ${value && 'submit-selection-selected'}`}
                >
                    <MenuItem className='submit-selection-item item-disabled' value={false} disabled>
                        {placeholder}
                    </MenuItem>
                    {selections.map(select => (
                        <MenuItem className='submit-selection-item' value={select} key={uuid()}>
                            {select}
                        </MenuItem>
                    ))}                    
                </Select>
                <IconButton
                    onClick={toggle}
                    className='submit-button'
                >{ arrowKey === 'down' ? <ArrowDown/> : arrowKey === 'right' ? <ArrowRight/> : <ArrowDown/> }
                </IconButton>
            </Fragment>
        ); else if (type === 'upload') return (
            <Fragment>
                <label className='submit-upload' htmlFor={htmlKey}>
                    <span className='submit-upload--label'>{labelPlaceholder}</span>
                    <input id={htmlKey} type={'file'} className='submit-upload--input'/>
                </label>
                <IconButton onClick={toggle} className='submit-button'>
                    <label htmlFor={htmlKey}>
                        { 
                            arrowKey === 'down' ? <ArrowDown/> 
                            : arrowKey === 'right' ? <ArrowRight/> 
                            : arrowKey === 'top' ? <ArrowTop/> 
                            : <ArrowDown/> 
                        }
                    </label>
                </IconButton>
            </Fragment>
        );
    })();
    return (
        <div className='content__submit' htmlFor={keyName}>
            <h4>{label}</h4>
            <div className='content__submit--selection'>{selector}</div>
        </div>
    );
}