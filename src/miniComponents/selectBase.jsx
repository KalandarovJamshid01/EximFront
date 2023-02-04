import { useState, useId } from 'react';
import { SelectUnstyled, OptionUnstyled } from '@mui/base';
import { IconButton } from '@mui/material';
import {
    KeyboardArrowDownOutlined as ArrowDown
} from '@mui/icons-material';

export default function SelectBase({ 
    label, 
    placeholder='Выбрать...',
    variants,
    defaultVariant,
    optionChange = false,
    base = false
}) {
    const selectKey = useId();
    const [selectValue, setSelectValue] = useState(defaultVariant ? defaultVariant : false);
    const changeSelectValue = (e, newValue) => {
        let baseVal = newValue;
        if (base) {
            base.forEach((baseState) => {
                if (baseState.name === baseVal) baseVal = baseState._id;
            });
        }
        setSelectValue(newValue);
        optionChange && optionChange.change(optionChange.stateVal, baseVal);
    }
    return (
        <label className={'selectBase'} htmlFor={selectKey}>
            <h4 className='selectBase__label'>{label}</h4>
            <div className='selectBase__width'>
                <SelectUnstyled 
                    id={selectKey}
                    value={selectValue} 
                    className={`selectBase__options ${
                        selectValue && "selectBase__options--selected"
                      }`}
                    onChange={changeSelectValue}
                >
                    <OptionUnstyled value={false} className='selectBase__options--select item-disabled'>
                        {placeholder}
                    </OptionUnstyled>
                    {variants.map((variant, inx) => (
                        <OptionUnstyled 
                            value={variant}
                            className='selectBase__options--select'
                            key={inx}
                        >{variant}</OptionUnstyled>
                    ))}
                </SelectUnstyled>
                <IconButton className='selectBase__options--button'>
                    <label htmlFor={selectKey}>
                        <ArrowDown/>
                    </label>
                </IconButton>
            </div>
        </label>
    );
}