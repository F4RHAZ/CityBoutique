import React, { useState, useEffect, useRef } from "react";
import "./authenticate.css";
import { Link } from "react-router-dom";
import styled from "styled-components";




  
const ContinueShoppingButton = styled.button`
  
padding: 10px;
font-weight: 600;
cursor: pointer;
border: 2px dotted rgba(0, 0, 0, 0);
text-decoration: none;
margin: 10px 0px;
font-size: 18px;
font-weight: bold;
width: 10rem;
background-color: transparent;
background-image: none;
border-bottom-style: dotted;
border-color: rgba(0, 0, 0, 1);
border-width: 3px;
border-radius: 0px;
color: rgba(0, 0, 0, 1);

&:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

`;

const CheckoutButton = styled.button`
  width: 10rem;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: 1px dotted teal;
  text-decoration: none;
  margin: 10px 0px;
  padding:10px;
  border: 2px dotted teal;
  font-size:18px;
  font-weight:500;
`;


function Authenticate(props) {
    const {toggleVisible} =props
    
    function close(){
        toggleVisible(false)
    }

  return (
    <div className="authCont" >
        <div className="authcloseBtn" onClick={close}>X</div>
        <div className="authBody">

        <h4>LOGIN TO USE CHAT </h4>
      
            <Link to="/login">
            <ContinueShoppingButton>
                LOGIN
            </ContinueShoppingButton> 
            </Link>
            <Link to="/register">
            <ContinueShoppingButton>
                REGISTER
            </ContinueShoppingButton>
            </Link>
        </div>
    </div>
  )
}

export default Authenticate
