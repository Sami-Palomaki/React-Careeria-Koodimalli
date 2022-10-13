import React, {useState, useEffect} from 'react'
import './App.css'
import CustomerService from './services/Customer'
import Customer from './customer'

const CustomerList = () => {

    // State

    const [customers, setCustomers] = useState([])
    const [showCustomers, setShowCustomers] = useState(false)
    const [search, setSearch] = useState("")

    useEffect(() => {
        CustomerService.getAll()
        .then(data => {
            setCustomers(data)
        })
    }, [])

    //Hakukentän onChange tapahtumankäsittelijä
    const handleSearchInputChange = (event) => {
        setShowCustomers(true)
        setSearch(event.target.value.toLowerCase())
    }

    return (
            <div id='customerList'>
                <h1 onClick={() => setShowCustomers(!showCustomers)}>Customers</h1>

                <input placeholder="Search by company name" value={search} onChange={handleSearchInputChange} />

                {showCustomers && customers && customers.map(c => {
                    const lowerCaseName = c.companyName.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return(
                    <Customer key={c.customerId} customer={c} />
                        )
                    }
                    }
                )}
            </div>
    )
}


export default CustomerList