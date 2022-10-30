import React, {useState, useEffect} from 'react'
import './App.css'
import CustomerService from './services/Customer'
import Customer from './customer'
import CustomerAdd from './CustomerAdd'

const CustomerList = () => {

    // State

    const [customers, setCustomers] = useState([])
    const [showCustomers, setShowCustomers] = useState(false)
    const [search, setSearch] = useState("")
    const [lisäystila, setLisäystila] = useState(false)

    useEffect(() => {
        CustomerService.getAll()
        .then(data => {
            setCustomers(data)
        })
    }, [lisäystila]
    )

    //Hakukentän onChange tapahtumankäsittelijä
    const handleSearchInputChange = (event) => {
        setShowCustomers(true)
        setSearch(event.target.value.toLowerCase())
    }

    return (
            <div id='customerList'>
                
                <h1><nobr style={{ cursor: 'pointer' }}
                        onClick={() => setShowCustomers(!showCustomers)}>Customers</nobr>
                        
                        {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

                        {lisäystila && <CustomerAdd setLisäystila={setLisäystila} />}

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