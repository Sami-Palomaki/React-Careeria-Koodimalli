import axios from "axios"

const baseUrl = "https://localhost:7287/nw/Customer"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { getAll }