import { forwardRef } from 'react';
import Slide from '@mui/material/Slide';

const TransitionUp = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default TransitionUp;