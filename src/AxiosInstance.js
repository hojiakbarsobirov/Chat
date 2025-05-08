import axios, { Axios } from 'axios'

const AxiosInstance = axios.create({
    baseURL: 'https://673e05870118dbfe8609d01b.mockapi.io/',
    headers: {
        'Content-Type' : 'application/json'
    }
})

export default AxiosInstance