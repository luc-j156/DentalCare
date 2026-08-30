import React from "react";

const ResentAppointmentTableData = ({prod}) => {
  
  let bookingList = prod.map((item, i) => {
    return <tr>
    <th scope="row">{item.Name}</th>
    <td>{item.CustomerNumber}</td>
    <td>{item.FirstName}</td>
    <td>{item.description}</td>
    <td>{item.time}</td>
    <td>{item.payment_status}</td>
    <td>{item.razorpay_payment_id}</td>
    <td>{item.created}</td>
  </tr>
  },this)
  return (
    <>
      {bookingList}
    </>
  );
};

export default ResentAppointmentTableData;
