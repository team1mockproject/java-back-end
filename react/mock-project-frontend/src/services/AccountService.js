import axios from "axios"

const loginApi = (email, password) => {
    return axios.post("/api/authenticate/login", { email, password });
}

export { loginApi }