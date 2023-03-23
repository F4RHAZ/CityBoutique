import "./register.css";
import React, { useState } from 'react';
import styled from 'styled-components';
import {mobile, tablet, desktop} from '../../responsive';
import { Link } from  "react-router-dom";
import { Search } from "@mui/icons-material";
import FormInput from "../../components/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/apiCalls";
import Footer from "../../components/Footer";




const NavContainer = styled.div`
  height: 60px;
  margin-bottom: 10px;
  ${mobile({ height: "50px" })}
`;

const NavWrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const NavLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ display: "none" })}
  ${tablet({ display: "none" })}

`;

const NavLanguage = styled.span`
  font-size: 14px;
  cursor: pointer;
  color: black;
  ${mobile({ display: "none" })}
`;

const NavSearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const NavInput = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const NavCenter = styled.div`
  flex: 2;
  text-align: center;
  ${mobile({ flex: 2})}
  ${tablet({ flex: 2})}
  ${desktop({ flex: 3})}
`;

const NavLogo = styled.h1`
  flex:4;
  font-weight: bold;
  font-family: 'Kalam', cursive;
  ${mobile({
    flex:3, 
    fontSize: "20px",
    fontWeight: "bold",
    })}
  ${tablet({
    flex:3, 
    fontSize: "25px",
    fontWeight: "bold",
  })}
  ${desktop({
    flex:3,
    fontSize: "30px",
    fontWeight: "bold",

  })}
`;


const NavRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "flex-end" })}
`;


const NavMenuItem = styled.div`
  font-size: 15px;
  text-decoration: none;
  cursor: pointer;
  border: 2px dotted teal;
  border-radius: 10%;
  padding: 15px;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
  ${tablet({ fontSize: "15px", marginLeft: "12px" })}
 
  &:hover{
    background-color:#AFEEEE;
    font-size: 18px;
    font-weight: 900;
  }
  `;

const Error = styled.span`
  color: red;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;


const Register = () => {
 
  const[values, setValues] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const [registerAttempted, setRegisterAttempted] = useState(false);




  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      required: true,
    },
    {
      id: 3,
      name: "phone",
      type: "text",
      placeholder: "phone Number",
      errorMessage: "It should be a Phone Number!",
      label: "Phone Number",
      pattern: /^[0-9\b]+$/,
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 4-characters long",
      label: "Password",
      pattern: /^[A-Za-z0-9!@#$%^&*()_+={}[\]\\|:;\"'<>,.?/]{4,16}$/,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  
  const handleSubmit = (e) => {
    e.preventDefault();
    register(dispatch, {values});
    setRegisterAttempted(true);

  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return(
    <>
    <NavContainer>
      <NavWrapper>
        <NavLeft>
          <NavLanguage>EN</NavLanguage>
          <NavSearchContainer>
            <NavInput placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </NavSearchContainer>
        </NavLeft>
        <NavCenter>
            <Link to="/" style={{ textDecoration: 'none', color: 'black',  cursor: 'default'}}>
              <NavLogo>
              THE CITY BOUTIQUE
          </NavLogo>
          </Link>
        </NavCenter>
        <NavRight>
        
            <NavMenuItem as={Link} to="/login">
              LOGIN
            </NavMenuItem>
        
        
        </NavRight>
      </NavWrapper>
    </NavContainer>
      



      <div className="container">
      <form className="regForm" onSubmit={handleSubmit}>
        <h1 className="registerTitle">REGISTER</h1>
        {inputs.map((input) => (
          <FormInput id="formInput"
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="submitbutton" disabled={isFetching}>Submit</button>
        {registerAttempted && error && <Error>Something went wrong...</Error>}
      </form>
      </div>

      <br/>
      <Footer/>

    </>
  )
}

export default Register
