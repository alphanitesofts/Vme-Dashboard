import React from "react";

function CurrentOrders({items}){
    return (
        <tr>
          <td>{items.id}</td>
          <td>{items.name}</td>
          <td>{items.address}</td>
          <td>{items.phone}</td>
          <td>{items.gmail}</td>
          <td>{items.ldate}</td>
          <td><Link className='btn btn-outline-primary' to="/Infoform" state={{ customID: items.id }}>Info</Link></td>
          <td className='m-3'>
            <button className='btn btn-outline-success' onClick={() => sendToPending(items.id)}>
              {
                loading === true ? "Loading..." :
                  <i className="fa-solid fa-check"></i>
              }
            </button>&nbsp;&nbsp;
            <button className='btn btn-outline-danger' onClick={() => deletedOrders(items.id)}>
              {
                errorLoading === true ? "Loading...." :
                  <i className="fa-solid fa-xmark"></i>
              }
            </button>
          </td>
        </tr>
      )
}
export default CurrentOrders