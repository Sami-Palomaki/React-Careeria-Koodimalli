import axios from "axios"
import Customer from "../customer"

const baseUrl = "https://localhost:7287/nw/Customer"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newCustomer => {
    return axios.post(baseUrl, newCustomer)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (object) => {
    return axios.put(`${baseUrl}/${object.customerId}`, object)
}

export default { getAll, create, remove, update }