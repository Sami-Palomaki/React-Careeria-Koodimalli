import React, { useState } from 'react'
import './App.css'
import CustomerService from './services/Customer'

// props on nimeltään Customer
const Customer = ({customer, editCustomer, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

    // Komponentin tilan määritys
    const [showDetails, setShowDetails] = useState(false)

    const deleteCustomer = (customer) => {
        if (window.confirm(`Remove customer ${customer.companyName}`) === true) {
            CustomerService.remove(customer.customerId)
            .then(res => {
                if (res.status === 200) {
                    setMessage(`Successfully removed a customer ${customer.companyName}`)
                    setIsPositive(true)
                    setShowMessage(true)
                    window.scrollBy(0, -10000) //Scrollataan ylös, jotta nähdään alert

                    // Ilmoituksen piilotus
                    setTimeout(() => {
                        setShowMessage(false)
                    }, 3000)
                    reloadNow(!reload)
                }
            })
            .catch(error => {
                setMessage(error)
                setIsPositive(false)
                setShowMessage(true)
                window.scrollBy(0, -10000) //Scrollataan ylös, jotta nähdään alert
        
                // Ilmoituksen piilotus
                setTimeout(() => {
                    setShowMessage(false)
                }, 3000)
            })
            
        }
        else {
            setMessage("Delete canceled.")
                    setIsPositive(true)
                    setShowMessage(true)
                    window.scrollBy(0, -10000) //Scrollataan ylös, jotta nähdään alert

                    // Ilmoituksen piilotus
                    setTimeout(() => {
                        setShowMessage(false)
                    }, 3000)
                }
        }


  return (
    <div className="customer">
        <h3 onClick={() => setShowDetails(!showDetails)}>
            {customer.companyName} from {customer.country}, {customer.city}
        </h3>

        {showDetails &&
        <div className="customerDetails">
            <button onClick={() => editCustomer(customer)}>Edit</button>
            <button onClick={() => deleteCustomer(customer)}>Delete</button>
            <table>
                <thead>
                    <tr>
                        <th>Contact name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Phone</th>
                        <th>Fax</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{customer.contactName}</td>
                        <td>{customer.address}</td>
                        <td>{customer.city}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.fax}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        }
    </div>
  )
}

export default Customer