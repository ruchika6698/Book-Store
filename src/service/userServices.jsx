import Configuration from "../Configuration/configuration";
import AxiosService from './axiosServices'

const axiosService = new AxiosService();
const apiUrl = Configuration.url;

class Service {
  Registration(data) {
    return axiosService.Post(
      process.env.REACT_APP_USER_REGISTRATION,
      data,
      false,
      false
    );
  }
  Login(data) {
    return axiosService.Post(
      process.env.REACT_APP_USER_LOGIN,
      data,
      false,
      false
    );
  }
}
export default Service;