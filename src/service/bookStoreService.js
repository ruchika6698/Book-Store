import Configuration from "../Configuration/configuration";
import AxiosService from "./axiosServices";

const axiosService = new AxiosService();
const apiUrl = Configuration.url;

class BookStoreService {
  GetAllBooks(data) {
    return axiosService.Get(process.env.REACT_APP_GET_ALL_BOOKS, null, false);
  }

  GetAllBooksByKeyword(data) {
    return axiosService.Get(
      `${process.env.REACT_APP_GET_ALL_BOOKS}${data}`,
      null,
      false
    );
  }

  SortBooks(parameter, order) {
    return axiosService.Get(process.env.REACT_APP_SORT_BOOKS, {
      params: {
        columnName: `${parameter}`,
        order: `${order}`,
      },
    });
  }

  
}
export default BookStoreService;
