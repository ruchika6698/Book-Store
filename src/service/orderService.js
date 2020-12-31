import Configuration from "../Configuration/configuration";
import AxiosService from "./axiosServices";

const axiosService = new AxiosService();
const apiUrl = Configuration.url;

class OrderService {
  PlaceOrder(cartId, address, city, pincode, token) {
    return axiosService.Post(process.env.REACT_APP_PLACE_ORDER, {}, true, {
      params: {
        CartId: cartId,
        Address: `${address}`,
        City: `${city}`,
        PinCode: pincode,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

 
}
export default OrderService;
