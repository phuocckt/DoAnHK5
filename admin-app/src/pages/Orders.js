import React, { useEffect, useState } from 'react'
import axiosAdmin from '../Components/axiosAdmin';
import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Products = () => {
  const [invoices, setInvoice] = useState([]);

  useEffect(() => {
    axiosAdmin.get("/Invoices")
      .then(res => {
        setInvoice(res.data)
      });
  }, []);
  return (
    <div>
      <h3>Orders</h3>
      <Table>
        <thead className="table-dark">
          <tr>
            <th>STT</th>
            <th>Id</th>
            <th>Invoice Date</th>
            <th>Total</th>
            <th>Id User</th>
            <th>Address Ship</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
              invoices.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.id}
                  </td>
                  <td>{item.invoiceDate}
                  </td>
                  <td>{item.total}
                  </td>
                  <td>{item.userId}</td>
                  <td>
                    {item.addressShip}
                  </td>
                  <td>{item.phone}</td>
                  <td>
                    {item.status ? <p className='text-success'>Đã thanh toán</p> : <p className='text-warning'>Chưa thanh toán</p>}</td>
                </tr>
              ))
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Products; 