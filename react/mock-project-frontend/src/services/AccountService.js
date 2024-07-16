import axios from "./CustomAxios"

const loginApi = (email, password) => {
    return axios.post("/api/authenticate/login", { email, passWord: password });
}

export { loginApi }