import Configuration from "./../Configuration/configuration";
import AxiosService from "./axiosServices";

const url = Configuration.url;
const axiosService = new AxiosService();
const Token = localStorage.getItem("Token");
const header = {
  headers: {
    Authorization: `Bearer ${Token}`,
  },
};
console.log("token", header);
// CURD operational Functions for admin
export function AddBook(data) {
  return axiosService.Post(
    process.env.REACT_APP_GET_ALL_BOOKS,
    data,
    true,
    header
  );
}
export function GetAllBooks() {
  return axiosService.Get(
    process.env.REACT_APP_GET_ALL_BOOKS,
    null,
    true,
    header
  );
}
export function UpdateBook(data, id) {
  return axiosService.Put(
    `${process.env.REACT_APP_GET_ALL_BOOKS}${id}`,
    data,
    true,
    header
  );
}
export function DeleteBook(bookId) {
  return axiosService.Delete(
    `${process.env.REACT_APP_GET_ALL_BOOKS}${bookId}`,
    true,
    header
  );
}
export function SearchList(searchWord) {
  console.log("search word in adminservice", searchWord);
  return axiosService.Get(
    `${process.env.REACT_APP_GET_ALL_BOOKS}${searchWord}`,
    null,
    true,
    header
  );
}
export function ImageBook(bookId, data) {
  return axiosService.Put(
    `${process.env.REACT_APP_ADD_IMAGE_TO_BOOK}${bookId}`,
    data,
    true,
    header
  );
}
