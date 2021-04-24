import axios from 'axios'

const userToken = localStorage.getItem('auth_token')

export default axios.create({
    baseURL: 'https://traq-django-backend.herokuapp.com/',
    headers: {
        'Authorization' : `Token ${userToken}`
    }
})