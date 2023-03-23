import "./payButton.css"
//import axios from "axios";
import { useSelector } from "react-redux";
import styled from 'styled-components';
//import { BASE_URL } from "../requestMethods";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import FormInput from "./FormInput";
import { userRequest } from "../requestMethods";

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #394040;
  color: white;
  font-weight: 600;
`;


//Modalcomponents
const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

  

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
`;

//

const PayButton = ({cart}) =>{
    const history = useNavigate();
    const user = useSelector(state=>state.user.currentUser);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const[values, setValues] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      });
    
  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      errorMessage:
        "Name should be 3-16 characters and shouldn't include any special character!",
      label: "Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "address",
      type: "text",
      placeholder: "Address",
      errorMessage: "It should be a valid address!",
      label: "Address",
      required: true,
    },
    {
      id: 3,
      name: "city",
      type: "text",
      placeholder: "City",
      errorMessage: "required",
      label: "City",
      required: true,
    },
    {
      id: 4,
      name: "state",
      type: "text",
      placeholder: "State",
      errorMessage:
        "required",
      label: "State",
      required: true,
    },
    {
      id: 5,
      name: "zip",
      type: "text",
      placeholder: "Zip",
      errorMessage: "Required",
      label: "Zip",
      required: true,
    },
    {
        id: 6,
        name: "country",
        type: "text",
        placeholder: "Country",
        errorMessage: "Required",
        label: "Country",
        required: true,
      },
  ];

    const openModal = ()=>{
        setIsModalOpen(!isModalOpen);
      }

      const closeModal =() =>{
        setIsModalOpen(false);
      }
    
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };



    const handleCheckout = async(e) => {
        e.preventDefault();
        let cart1 = cart.products;
        let total = cart.total;
       // let userId = user._id;
      //  console.log(cart1, userId, total, values)
        const orderData = {
            products: cart1,
            userId: user._id,
            shipping: values,
            total: total,
          };
          
        try {
            const res = await userRequest.post("/orders/", orderData);
          //  console.log(res.data);
            // Close the modal after the order is saved
           closeModal()
           history('/success');
          } catch (error) {
            console.error(error);
          }

    };

    return(
        <>
         {isModalOpen && (
      <ModalWrapper>
        
        <CloseButton onClick={closeModal}>
          <CloseIcon fontSize='large'/>
        </CloseButton>
        <div className="addcontainer">
      <form className="addregForm" onSubmit={handleCheckout}>
        <h1 className="addregisterTitle">Enter Shipping Details </h1>
        {inputs.map((input) => (
            <FormInput id="formInput"
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
          ))}
        <button className="submitbutton">Submit</button>
      </form>
      </div>
      </ModalWrapper>
    )}
            <Button onClick={openModal}>Check Out</Button>
        </>
    )
}

export default PayButton;






















// // axios.post(`https://a-zboutiqueapi.onrender.com/api/checkout/create-checkout-session`, {
// //     userId,
// //     cart1, 
// axios.post(`http://127.0.0.1:5000/api/checkout/create-checkout-session`, {
//     userId,
//     cart1, 
// }).then((res) =>{
//     if(res.data.url){
//         window.location.href = res.data.url
//     }
// }).catch((err)=> console.log(err.message));