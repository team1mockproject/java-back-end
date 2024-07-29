import axios from "./CustomAxios"

const loginApi = (email, password) => {
    return axios.post("/api/authenticate/login", { email, passWord: password });
}

const getAllStaff = (page, searchTerm = '') => {
    return axios.get(`/api/account/?filter=roles.id==2&page=${page}&size=8&search=${searchTerm}`);
}

const createAccount = (AccountDto) => {
    return axios.post(`/api/account/register`, AccountDto)
}

const updateAccount = (accDto) => {
    return axios.put("/api/account/update", accDto)
}

const deleteAccount = (id) => {
    return axios.delete(`/api/account/delete/${id}`);
}


export { loginApi, getAllStaff, createAccount, deleteAccount, updateAccount }