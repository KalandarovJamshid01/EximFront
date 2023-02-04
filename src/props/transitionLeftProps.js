import { forwardRef } from 'react';
import Slide from '@mui/material/Slide';

const TransitionLeft = forwardRef(function Transition(props, ref) {
    return <Slide direction='left' ref={ref} {...props} />;
});

export default TransitionLeft;