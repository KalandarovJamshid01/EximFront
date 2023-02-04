// 998946518141
import { useState, useEffect, useContext, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootContext, RootDispatch } from '../contexts/RootContext';
import { Button, CircularProgress } from '@mui/material';
import { 
    Face3 as UserIcon,
    PersonOff as DisabledUserIcon,
    VerifiedUser as FoundIcon,
    Password as AuthIcon
} from '@mui/icons-material';
import Choice from '../miniComponents/choice';
import { orange } from '@mui/material/colors';
import Backdrop from '../miniComponents/backDrop';
import { useSnackbar } from 'notistack';
import ESign from '../props/e-sign';
import { peekaboo } from '../PEEKABOO';
import axios from 'axios';

function AuthPage(props) {
  //eslint-disable-next-line
  const state = useContext(RootContext);
  const dispatch = useContext(RootDispatch);
  const [authenticating, setAuthenticating] = useState(false);
  const [errorButton, setErrorButton] = useState(false);

  useEffect(() => {
    if (state.user.token) {
      setAuthenticating(true);
      axios.get(`${peekaboo}/user/me`, {
        headers: {
          Authorization: `Bearer ${state.user.token}`
        }
      }).then(response => {
        if (response.status === 200 && String(response.data.status).toLowerCase() === "success") {
          const user = {
            id: response.data.data._id,
            role: 'user',
            isVerified: false,
            token: state.user.token,
            details: response.data.data
          }
          dispatch({ type: 'SET_USER', user });
          successAlert();
          setTimeout(() => {
            setAuthenticating(false);
            navigate('/app/submissions');
          }, 1500);
        }
      }).catch(error => {
        setAuthenticating(false)
      })
    }
    //eslint-disable-next-line
  }, []);

  const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [authUser, setAuthUser] = useState({
        certificates: [],
        privacyAgree: false,
        signKey: undefined
    });
    // USER INDEX
    const [userIndex, setUserIndex] = useState(false);
    // LOADING
    const [searchingKey, setSearchingKey] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);
    // SUCCESS
    const [signKey, setSignKey] = useState(false);
    // AUTH
    const [isAuth, setIsAuth] = useState(false);

    const handleOptionChange = (stateVal, newStateVal) => {
        authUser[stateVal] = newStateVal;
        setAuthUser(authUser);
    }

    const [certificates, setCertificates] = useState([]);
    const [selectedCert, setSelectedCert] = useState({})
    const [keyId, setKeyId] = useState(null);
    const [pkcsInfo, setPkcsInfo] = useState("");
    const [resultPkcs, setResultPkcs] = useState({});

    //E-IMZO
    const ESignClient = new ESign();
  
    const reqGuid = async () => {
      const backendGuid = await axios.get(`http://localhost:8000/api/v1/user`);
      return backendGuid;
    };
  
  
    const getData = async () => {
      const getKeyData = async () => {
          // E-IMZO
          console.log('getting a key datas')
        const keyData = await ESignClient.loadKey(certificates[selectedCert]);
        setKeyId(keyData);
      };
      console.log('selectedCert is true');
      getKeyData();
    };
  
    useEffect(() => {
      const getDataFromBackend = async () => {
        const guid1 = await reqGuid();
        // E-IMZO
        const pkcs = await ESignClient.createPkcs7(keyId.id, guid1.data.guid);
        setPkcsInfo(pkcs);
      };
      if (keyId) {
        getDataFromBackend();
      }
      // eslint-disable-next-line
    }, [keyId]);
  
    useEffect(() => {
      const verifyPkcs = async () => {
        const info = await axios.post("http://localhost:8000/api/v1/user", {
          pkcs: pkcsInfo,
          infoCert: keyId,
        },{
          withCredentials: true
        });
        setResultPkcs(info);
        setIsAuth(true);
      };
      if (pkcsInfo) {
        verifyPkcs();
      }
      // eslint-disable-next-line
    }, [pkcsInfo]);


    const handleStartSearchingKey = () => {
      setErrorButton(false);
      setSearchingKey(true);

      const listAllKeys = async () => {
        // E-IMZO
        // await ESignClient.install();
        ESignClient.install()
          .then( async (response) => {
            console.log('response', response);
            const data = await ESignClient.listAllUserKeys();
            setCertificates(data);
            handleOptionChange('certificates', data);
            setSearchingKey(false);
            setSignKey(true);
          }).catch(error => {
            if (error.type === 'error') {
              console.log('error', error);
              setSearchingKey(false);
              setErrorButton(true);
              return enqueueSnackbar(
                'Системе не удалось найти ключ ЭЦП на вашем компьютере.', 
                { 
                  variant: 'error',
                  anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'left'
                  }
                });
            }
          });
      };

      setTimeout(() => {
        listAllKeys();
      }, 3000);
    }

    const handleChangeUserIndex = (certificate, index) => {
      setUserIndex(certificate.UID);
      setSelectedCert(index);
    }

    const handleAuthUserWithKey = () => {
      if (!authUser.privacyAgree) {
        return enqueueSnackbar(
          'Поставьте галочку «Я согласен с публичной офертой»', 
          { 
            variant: 'warning',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'left'
            }
          });
      }
      setAuthLoading(true);
      getData();
    }

    useEffect(() => {
      if (isAuth) {
        const eSignResponse = resultPkcs;
        successAlert();
        if (eSignResponse.data.message === "success" && eSignResponse.status) {
          setTimeout(() => {
            navigate('/app/submissions');
          }, 1000);
        }
      }
      //eslint-disable-next-line
    }, [isAuth]);

    const dateParser = (date) => {
      let exactDate = new Date(date);
      // year months day
      let actualDate = `${exactDate.getFullYear()}-${exactDate.getMonth() + 1}-${exactDate.getDate() + 1}`;
      return actualDate;
    }

    const successAlert = () => {
      return enqueueSnackbar('Вход выполнен успешно!', { 
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'left'
        }
      });
    }

    return (
      <Fragment>
        <Backdrop open={authenticating} handleCloseBackDrop={() => setAuthenticating(false)}/>
        <div className='auth'>
            <div className='auth__sidebar'>
                <div className='form-container h-100 margin-top-2'>
                    <div className='form-container__logo'>
                        <div className='form-container__logo--sample'/>
                    </div>
                    <div className='form-container__body margin-top-2'>
                        <h3>Вход с помощъю ЭЦП</h3>
                        {authUser.certificates.map((certificate, index) => (
                          <div
                            className={`form-container__authenticator  ${certificate.UID === userIndex && 'active'}`} 
                            key={index}
                            onClick={() => handleChangeUserIndex(certificate, index)}
                          >
                              {signKey 
                                  ? <UserIcon className='form-container__authenticator--icon'/> 
                                  : <DisabledUserIcon className='form-container__authenticator--icon'/>
                              }
                              <div className={`form-container__authenticator--labels`}>
                                  
                                  <h4>{certificate.CN}</h4>
                                
                                  <p className='text-disabled subtitle'>
                                    Срок действия сертификата: {dateParser(certificate.validTo)}
                                  </p>
                              </div>
                          </div>
                        ))}
                    </div>
                    <div className='auth__type margin-top-1'>
                        <Button 
                            className={`app-button-blue padding-height ${userIndex && 'disabled'} ${errorButton && 'error'} ${searchingKey && 'disabled'}`}
                            onClick={handleStartSearchingKey}
                            disabled={!!userIndex}
                        >
                            {(!searchingKey && !signKey) && 'Найдите ключ ЭЦП'}
                            {(searchingKey && !signKey) && 'Ищем ключ ЭЦП...'}                            
                            {searchingKey && (
                                <CircularProgress 
                                    size={24}
                                    sx={{
                                        color: orange[500],
                                        marginLeft: '1rem'
                                    }}
                                />
                            )}
                            {(!searchingKey && signKey) && <FoundIcon className='margin-left'/>}
                        </Button>
                        {userIndex && (
                          <Button 
                            className='app-button-blue padding-height'
                            onClick={handleAuthUserWithKey}
                          >
                            Авторизация с выбранным ключом ЭЦП <AuthIcon className='margin-left'/>
                            {authLoading && (
                                <CircularProgress 
                                    size={24}
                                    sx={{
                                        color: orange[500],
                                        marginLeft: '1rem'
                                    }}
                                />
                            )}
                          </Button>
                        )}
                        {signKey && (
                            <div className='margin-top-2'>
                                <Choice  
                                    text={'Я согласен с публичной офертой'}
                                    optionChange={{
                                        change: handleOptionChange,
                                        stateVal: 'privacyAgree'
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    );
}

export default AuthPage;


// const login = (e) => {
//   e.preventDefault();

//   const config = { headers: {"Content-Type":"application/json"}};
//   const data = { username: username, password: password };
//   axios.post('http://localhost:4000/users/login', data, config).then((res) => {
//       document.cookie = "token=" + res./*token location*/
//       console.log(res, document.cookie);
//     });
// }