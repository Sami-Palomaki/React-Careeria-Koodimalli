import React, {useState, useEffect} from 'react'
import './App.css'
import CustomerService from './services/Customer'
import Customer from './customer'
import CustomerAdd from './CustomerAdd'
import CustomerEdit from './CustomerEdit'

const CustomerList = ({setIsPositive, setShowMessage, setMessage}) => {

    // State

    const [customers, setCustomers] = useState([])
    const [showCustomers, setShowCustomers] = useState(false)
    const [search, setSearch] = useState("")
    const [lisäystila, setLisäystila] = useState(false)
    const [muokkaustila, setMuokkaustila] = useState(false)
    const [reload, reloadNow] = useState(false)
    const [muokattavaCustomer, setMuokattavaCustomer] = useState(false)

    useEffect(() => {
        CustomerService.getAll()
        .then(data => {
            setCustomers(data)
        })
    }, [lisäystila, reload, muokkaustila]
    )

    const editCustomer = (customer) => {
        setMuokattavaCustomer(customer)
        setMuokkaustila(true)
    }

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

                        {lisäystila && <CustomerAdd setLisäystila={setLisäystila} 
                        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                        />}

                        {muokkaustila && <CustomerEdit setMuokkaustila={setMuokkaustila} 
                        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                        muokattavaCustomer={muokattavaCustomer}
                        />}

                <input placeholder="Search by company name" value={search} onChange={handleSearchInputChange} />

                {!lisäystila && !muokkaustila && showCustomers && customers && customers.map(c => {
                    const lowerCaseName = c.companyName.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return(
                    <Customer key={c.customerId} customer={c} reloadNow={reloadNow} reload={reload}
                    setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                    editCustomer={editCustomer}
                    />
                        )
                    }
                    }
                )}
            </div>
    )
}


export default CustomerList