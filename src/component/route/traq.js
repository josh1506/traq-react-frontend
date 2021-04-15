import axios from 'axios'

const userToken = localStorage.getItem('auth_token')

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        'Authorization' : `Token ${userToken}`
    }
})