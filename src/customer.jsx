import React, { useState } from 'react'
import './App.css'
import CustomerService from './services/Customer'

const Customer = ({customer}) => {

    const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="customer">
        <h3 onClick={() => setShowDetails(!showDetails)}>
            {customer.companyName} from {customer.country}, {customer.city}
        </h3>

        {showDetails &&
        <div className="customerDetails">
            <button>Edit</button>
            <button>Delete</button>
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