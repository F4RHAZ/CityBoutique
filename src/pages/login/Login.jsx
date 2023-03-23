import React, { useState } from 'react';
import styled from 'styled-components';
import { mobile, tablet, desktop } from "../../responsive";
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../components/FormInput";
import "./login.css";
import { Link } from  "react-router-dom";
import { Search } from "@mui/icons-material";
import Footer from '../../components/Footer';

/////////////////////////////
//    NAVBAR
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
  ${tablet({ display: "none" })}
`;

const NavSearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ display: "none" })}
  ${tablet({ display: "none" })}

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
  flex: ;
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
  &:hover{
    background-color:#AFEEEE;
    font-size: 18px;
    font-weight: 900;
  }
  `;
////////////////////////////////////////////


const Error = styled.span`
  color: red;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;




const Login = () => {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const [loginAttempted, setLoginAttempted] = useState(false);


  const[values, setValues] = useState({
    username: "",
    password: "",
  });


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
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
   
  ];



  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, { values });
    setLoginAttempted(true);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
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
        
            <NavMenuItem as={Link} to="/register">
              REGISTER
            </NavMenuItem>
        
        
        </NavRight>
      </NavWrapper>
    </NavContainer>


       <div id="LoginContainer">
      <form id="loginForm" onSubmit={handleSubmit}>
        <h1 id="loginTitle">LOGIN</h1>
        {inputs.map((input) => (
          <FormInput id="formInput"
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          
          />
        ))}
        <button className="loginsubmitbutton" disabled={isFetching}>Submit</button>
         {loginAttempted && error && <Error>Incorrect credentials Please Try Again.</Error>}
      <p id="NoAcc"style={{marginTop: '5px', marginBottom: '10px'}}>Dont Have an Account?? <Link to="/register">Click here</Link> </p>
      </form>
      </div>
      <Footer/>
    </>
  );
};

export default Login;
