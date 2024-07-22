import axios from "./CustomAxios"

const getAllAsset = (page, searchTerm = '') => {
    return axios.get(`/api/asset/?&page=${page}&size=8&search=${searchTerm}`)
}

const uploadAssetFiles = (AssetImg) => {
    return axios.post("/api/asset/upload", AssetImg);
}

export { getAllAsset, uploadAssetFiles }