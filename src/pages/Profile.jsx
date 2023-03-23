import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "./profile.css";
import Navbar from '../components/Navbar';

import { Link } from "react-router-dom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
//import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
//import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PublishIcon from '@mui/icons-material/Publish';
import ChatIcon from '../components/chatIcon/ChatIcon';

import { DataGrid } from "@material-ui/data-grid";


import {userRequest} from "../requestMethods";

const Profile = () => {
  const [userOrders, setUserOrders]= useState([]);
  const [userId, setUserid] = useState([]);
  const user = useSelector(state=>state.user.currentUser);

 // console.log(user)

    //{user && setUserid(user._id)}

    useEffect(() => {
      const fetchUserOrders = async () => {
        try {
          const res = await userRequest.get("/users/fetchorder/"+user._id);
          setUserOrders(res.data)
         // console.log(res.data)
        } catch (error) {
          console.error(error);
        }
      };
      fetchUserOrders();
    }, []);

    
// const columns = [
//   { field: "_id", headerName: "Order  ID", width: 210 },
//   { field: "total", headerName: "Total", width: 100 },
//   { field: "delivery_status", headerName: "Delivery Status", width: 150 },
//   { field: "payment_status", headerName: "Payment Status", width: 150 },
//   {
//     field: "products",
//     headerName: "Products",
//     width: 1000,
//     flex: 1,
//     renderCell: (params) => {
//       return (
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             flexWrap: "wrap",
//             alignItems: "center",
//           }}
//         >
//           {params.row.products.map((product) => (
//             <div
//               key={product._id}
//               style={{
//                 border: "1px solid black",
//                 width: "390px",
//                 height: "130px",
//                 display: "flex",
//                 margin: "2px",
//               }}
//             >
//               <div style={{ flex: "1 0 auto" }}>
//                 <img
//                   src={product.img}
//                   style={{ maxWidth: "100px", height: "130px" }}
//                 />
//               </div>
//               <div
//                 style={{
//                   flex: "1 0 auto",
//                   display: "flex",
                  
                  
//                 }}
//               >
//                   <p>Size: {product.size}</p>
//                   <p>Color: {product.color}</p>
//                   <p>Price: {product.price}</p>
//                   <p>Quantity: {product.quantity}</p>
                
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     },
//   },
// ];


    return (
    <>
    <Navbar />

    <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">PROFILE</h1>
          
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQJDEnnVNYD3wOk0PIywPT-2m4UETU7lhOSFBO2HywWPvrH7-g45Eh4Rq9F9WxZTYONKU&usqp=CAU"
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">
                  {user && user.username}
                </span>
                {/* <span className="userShowUserTitle">Software Engineer</span> */}
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroidIcon className="userShowIcon" />
                <span className="userShowInfoTitle">
                {user && user.phone}
                </span>
              </div>
              <div className="userShowInfo">
                <MailOutlineIcon className="userShowIcon" />
                <span className="userShowInfoTitle">
                {user && user.email}
                </span>
              </div>
             
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder={user && user.username}
                    className="userUpdateInput"
                  />
                </div>
            
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder={user && user.email}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder={user && user.phone}
                    className="userUpdateInput"
                  />
                </div>
             
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQJDEnnVNYD3wOk0PIywPT-2m4UETU7lhOSFBO2HywWPvrH7-g45Eh4Rq9F9WxZTYONKU&usqp=CAU"
                    alt=""
                  />
                  <label htmlFor="file">
                    <PublishIcon className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                {/* <button className="userUpdateButton" >Update</button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* {userOrders && userOrders.length > 0 && (
      <div className="userorderlist" style={{margin: 10, width: "100%" }}>
        <DataGrid 
          rows={userOrders}
          columns={columns}
          getRowId={row => row._id}
          rowHeight="200"
          autoHeight
          style={{ overflow: "auto" }}
        />
      </div>
    )} */}

    {userOrders && userOrders.length > 0 && (
      <div className="table-container">

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Total</th>
            <th>Delivery Status</th>
            <th>Payment Status</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {userOrders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.total}</td>
              <td>{order.delivery_status}</td>
              <td>{order.payment_status}</td>
              <td>
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}>
                  {order.products.map((product) => (
                    <div
                    key={product._id}
                    style={{
                      border: "1px solid black",
                      width: "390px",
                      height: "130px",
                      display: "flex",
                      margin: "2px",
                    }}
                    >
                      <div style={{ flex: "1 0 auto" }}>
                        <img
                          src={product.img}
                          style={{ maxWidth: "100px", height: "130px" }}
                          />
                      </div>
                      <div style={{ flex: "1 0 auto", display: "flex", flexDirection: "column" }}>
                        <p>Size: {product.size} </p>
                        <p>Color: {product.color} </p>
                        <p>Price: {product.price} </p>
                        <p>Quantity: {product.quantity} </p>
                      </div>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>    
    </div>
    )}

      <ChatIcon />
        </>
    );
};

export default Profile;

// const Container = styled.div`
//   min-height: 80vh;
//   width: 100%;
//   margin: auto;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   font-size: 24px;
//   h2 {
//     margin-bottom: 1rem;
//     color: #029e02;
//   }
//   background: linear-gradient(
//     rgba(255, 255, 255, 0.5),
//     rgba(255, 255, 255, 0.5)
//   ),
//   url("https://t4.ftcdn.net/jpg/02/95/29/65/360_F_295296567_uFcURdW5jfjOjtheiPKQ2OHEnrv0Z9qK.jpg")
//     center;
//     background-size: cover;
//     height: 100vh;
// `;






//   //   {
// //     field: "products",
// //     headerName: "Products",
// //     width:1000,
// //     flex: 1,
// //     renderCell: (params) => {
// //       return (
// //         <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
// //   {params.row.products.map((product) => (
// //     <div
// //       key={product._id}
// //       style={{
// //         border: "1px solid black",
// //         width: "390px",
// //         height: "110px",
// //         display: "flex",
// //         margin: "2px",
// //       }}
// //     >
    
// //         <img
// //           src={product.img}
// //           style={{ maxWidth: "110px", height: "100px" }}
// //         />
      
// //       <div style={{ flex: 1, display: "flex", flexDirection: "column",alignItems: 'flex-start' }}>
// //         Size: {product.size}
// //         Color: {product.color}
// //       </div>
// //     </div>
// //   ))}
// // </div>
// //       );
// //     },
// //   },
//   // {
//   //     field: "action",
//   //     headerName: "Action",
//   //     width: 150,
//   //     renderCell: (params) => {
//   //       return (
//   //         <>
//   //           <Link to={"/transaction/" + params.row._id}>
//   //             <button className="transactionListEdit">View </button>
//   //           </Link>
            
//   //         </>
//   //       );
//   //     },
//   //   },

