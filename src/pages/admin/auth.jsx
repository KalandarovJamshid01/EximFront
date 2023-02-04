import React, { useState, useEffect, useContext, Fragment } from 'react';
import { RootContext, RootDispatch } from '../../contexts/RootContext';
import useInputState from '../../hooks/useInputState';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import {
    EmailOutlined as EmailIcon,
    Visibility as UnHideIcon,
    VisibilityOff as HiddenIcon
} from '@mui/icons-material';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Backdrop from '../../miniComponents/backDrop';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { peekaboo } from '../../PEEKABOO';
import axios from 'axios';


export default function AdminAuth() {
    const state = useContext(RootContext);
    const dispatch = useContext(RootDispatch);
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail, resetEmail] = useInputState('mironshohasadov2003@gmail.com');
    const [altEmail, setAltEmail] = useInputState('');
    const [password, setPassword, resetPassword] = useInputState('996887953');
    const [authenticating, setAuthenticating] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setValidEmail(false);
            setValidPassword(false);
            return enqueueSnackbar(
                'Пожалуйста, заполните эти формы для электронной почты и пароля',
                {
                    variant: 'warning',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'left'
                    }
                }
            );
        }
        setAuthenticating(true);
        axios.post(`${peekaboo}/admins/signin`, {
            email,
            password
        }).then(response => {
            if (response.status === 200 && response.data.status === "success") {
                resetEmail();
                resetPassword();
                const user = {
                    id: response.data.data._id,
                    role: 'admin',
                    isVerified: true,
                    details: response.data.data,
                    token: response.data.token
                }
                dispatch({ type: 'SET_USER', user });
                enqueueSnackbar(
                    'Вход выполнен успешно!',
                    {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'left'
                        }
                    }
                );
                setTimeout(() => {
                    return navigate('/dashboard/applications');
                }, 1000);
            }
        }).catch(error => {
            setValidEmail(false);
            setValidPassword(false);
            setAuthenticating(false);
            return enqueueSnackbar(
                "Проверьте свой адрес электронной почты или пароль еще раз!",
                {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'left'
                    }
                }
            );
        });
    }

    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    useEffect(() => {
        if (state.user.token) {
            setAuthenticating(true);
            axios.get(`${peekaboo}/admins/me`,  {
                headers: {
                    'Authorization': `Bearer ${state.user.token}`
                }
            }).then(response => {
                if (response.status === 200) {
                    setAuthenticating(false);
                    navigate('/dashboard/applications');
                } 
            }).catch(error => {
                setAuthenticating(false);;
            });
        }
        //eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <Backdrop open={authenticating} handleCloseBackDrop={() => setAuthenticating(false)}/>
            <div className='auth auth-admin '>
                <div className='auth__sidebar'>
                    <div className='form-container'>
                        <div className='form-container__logo'>
                            <div className='form-container__logo--sample'/>
                        </div>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <form   
                                    className='form-container__body margin-side-2'
                                    onSubmit={handleSubmit}
                                >
                                    <h3>Вход</h3>
                                    <div className={`form-container__input`}>
                                        <h4 className='text-disabled'>Ваш логин</h4>
                                        <div className={`form-container__input--field ${!validEmail && 'error'}`}>
                                            <TextField 
                                                type={'email'}
                                                placeholder={'Ввудите логин...'}
                                                variant={'outlined'}
                                                name={'login'}
                                                className={'text-field-input'}
                                                value={email}
                                                onChange={(e) => {
                                                    setValidEmail(true);
                                                    setEmail(e);
                                                }}
                                            />
                                            <EmailIcon/>
                                        </div>
                                    </div>
                                    <div className='form-container__input'>
                                        <h4 className='text-disabled'>Паролъ</h4>
                                        <div className={`form-container__input--field ${!validPassword && 'error'}`}>
                                            <TextField 
                                                error={validPassword}
                                                type={passwordVisible ? 'text' : 'password'}
                                                placeholder={'Ведите свой паролъ...'}
                                                variant={'outlined'}
                                                name={'password'}
                                                className={'text-field-input'}
                                                value={password}
                                                onChange={(e) => {
                                                    setValidPassword(true);
                                                    setPassword(e);
                                                }}
                                            />
                                            {passwordVisible ? (
                                                <UnHideIcon onClick={() => setPasswordVisible(false)}/>
                                            ) : (
                                                <HiddenIcon onClick={() => setPasswordVisible(true)}/>
                                            )}
                                        </div>
                                    </div>
                                    <div className='auth__type'>
                                        <Button className='form-container__button padding-height' type='submit'>
                                            Войты
                                        </Button>
                                        <h4 
                                            className='subtitle text-center text-blue margin-top-1'
                                            onClick={() => handleChangeIndex(1)}
                                        >Fotgot Password?</h4>
                                    </div>
                                </form>
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                <form   
                                    className='form-container__body margin-side-2'
                                    onSubmit={handleSubmit}
                                >
                                    <h3>Reset Password</h3>
                                    <div className={`form-container__input`}>
                                        <h4 className='text-disabled'>Your Email Address</h4>
                                        <div className={`form-container__input--field`}>
                                            <TextField 
                                                type={'email'}
                                                placeholder={'Ввудите логин...'}
                                                variant={'outlined'}
                                                name={'resetEmail'}
                                                className={'text-field-input'}
                                                value={altEmail}
                                                onChange={setAltEmail}
                                            />
                                            <EmailIcon/>
                                        </div>
                                    </div>
                                    <div className='auth__type'>
                                        <Button className='form-container__button padding-height' type='submit'>
                                            Reset Password
                                        </Button>
                                        <h4 
                                            className='subtitle text-center text-blue margin-top-1'
                                            onClick={() => handleChangeIndex(0)}
                                        >Go Back</h4>
                                    </div>
                                </form>
                            </TabPanel>
                        </SwipeableViews>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};