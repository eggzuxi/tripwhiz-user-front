import axios from "axios";

const host = 'http://localhost:8080/api/cart'
// const host = 'http://10.10.10.215:8080/api/cart'

export const getList = async () => {

    const res = await axios.get(`${host}/list`)

    return res.data

}