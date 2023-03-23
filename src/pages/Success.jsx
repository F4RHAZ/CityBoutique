import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {clearCart } from '../redux/cartRedux';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import ChatIcon from '../components/chatIcon/ChatIcon';

const Success = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

 

  return (
    <>
  <Navbar />
    <Container style={{ textAlign: "center" }}  >
      <h2>Checkout Successful</h2>
      <p>Your order might take some time to process.</p>
      <p>Check your order status at your profile after about 10mins.</p>
      
      <p>
        Incase of any inqueries use the <strong>chat</strong> to contact support or email us at{"  "}
        <strong>citybjuba@gmail.com</strong>
      </p>
      <br />
      <TopButton as={Link} to="/">
              CONTINUE SHOPPING
            </TopButton>
    </Container>
    <Footer/>
    <ChatIcon />
    </>
  );
};

export default Success;

const Container = styled.div`
  min-height: 80vh;
  max-width: 800px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    margin-bottom: 0.5rem;
    color: #029e02;
  }
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: 1px dotted teal;
  text-decoration: none;
  border: ${props => props.type === "filled" && "none"};
  background-color: ${props =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${props => props.type === "filled" && "white"};
  
`;