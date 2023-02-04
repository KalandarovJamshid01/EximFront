import { Fragment } from 'react';
import PropTypes from 'prop-types';

export default function SwipeablePanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <Fragment>
            <div 
                role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} 
                aria-labelledby={`full-width-tab-${index}`} {...other}
            >
                {value === index && children}
            </div>
        </Fragment>
    );
}

SwipeablePanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};