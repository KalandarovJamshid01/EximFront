import axios from 'axios'
import { server } from '../SERVER';
import getCookies from '../utils/getCookies';

const axiosRequest = {
    get: async function(pathname) {
        const response = await axios(`${server}/${pathname}`, {
            headers: { 
                'Authorization': `Bearer ${getCookies('jwt')}`
            }
        });
        return response;
    }
}

export default axiosRequest;