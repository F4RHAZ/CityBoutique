import { Badge } from "@material-ui/core";
import { useState } from "react";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";
import styled from "styled-components";
import { mobile, tablet, desktop } from "../responsive";
import { useSelector } from "react-redux";
import { Link, useNavigate } from  "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";
import {logoutCart} from "../redux/cartRedux";



const Hamburger = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: block;
    border: 2px dotted teal;
    border-radius: 10%;
    padding: 15px;
    cursor: pointer;
  }
  ${mobile({
    fontSize: "15px",
    '.MuiSvgIcon-root': {
      fontSize: "17px"
    }
  })}
`;



const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  @media (max-width: 767px) {
    margin-top: 1em;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 60px;
    left: 0;
    background-color: #fff;
    width: 100%;
    height:auto;
    padding: 20px;
    transition: all 0.3s ease-in-out;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
    z-index: 9999;
    opacity: 0.9;
  }
`;

const Container = styled.div`
  height: 60px;
  margin-bottom: 1.1em;
  ${
    mobile({ 
      height: "60px",
      marginBottom: "1em",
  })
  }
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
  ${tablet({ padding: "10px 0px" })}
  
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({
    flexDirection: "flex-start", 
    })}
 
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
  ${tablet({ display: "none" })}
  
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ display: "none" })}
  ${tablet({ display: "none" })}
  ${desktop({display: "none"})}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
  ${tablet({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({ flex: 2})}
  ${tablet({ flex: 2})}
  ${desktop({ flex: 3})}
`;

const Logo = styled.h1`
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


const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 1, justifyContent: "flex-end" })}
  ${tablet({ flex: 1, justifyContent: "flex-end" })}

  `;

const MenuItem = styled.div`
  font-size: 15px;
  text-decoration: none;
  cursor: pointer;
  border: 2px dotted teal;
  border-radius: 10%;
  padding: 15px;
  margin-left: 25px;
  ${mobile(
    { 
      fontSize: "18px", 
      margin: "auto",
      marginBottom: "1em",
      width:"8em",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center"
     }
  )}
  ${tablet(
    { 
      fontSize: "20px", 
      margin: "auto",
      marginTop: "1em",
      width:"10em",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center"
      

    }
  )}
  
  &:hover{
    background-color:#black;
    font-size: 18px;
    font-weight: 900;
  }
  `;

  const MenuItemBadge = styled.div`
  font-size: 15px;
  text-decoration: none;
  cursor: pointer;
  border: 2px dotted teal;
  border-radius: 10%;
  padding: 15px;
  margin-left: 25px;
  ${mobile(
    { fontSize: "12px", 
      marginLeft: "2px",
     }
  )}
  ${tablet(
    { 
      fontSize: "14px", 
      marginLeft: "8px",
    }
  )}
  
  &:hover{
    background-color:#black;
    font-size: 18px;
    font-weight: 900;
  }
  `;

  
const StyledBadge = styled(Badge)`
  &:hover {
    font-size:20px;
    .MuiSvgIcon-root {
      font-size: 25px;
    }
  }
  ${mobile({
    fontSize: "15px",
    '.MuiSvgIcon-root': {
      fontSize: "18px"
    }
  })}
`;


const Navbar = () => {
  
  const [open, setOpen] = useState(false);
  const quantity = useSelector(state=>state.cart.quantity);
  const user = useSelector(state=>state.user.currentUser);
  const redirect = useNavigate();
//  console.log(user);

  const dispatch = useDispatch();

    function handleLogout() {
       // console.log(localStorage.getItem("persist:root"));
        localStorage.removeItem("persist:root");
        dispatch(logout());
        dispatch(logoutCart());
        redirect("/");
      }


  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
        
          {user ? (
          <>
        <Hamburger onClick={() => setOpen(!open)}>
          <MenuIcon/>
        </Hamburger>
        <Nav open={open}> 
          <MenuItem as={Link} to="/"  >
            Home
          </MenuItem>
          <MenuItem as={Link} to="/profile" >
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            logout
          </MenuItem>
        </Nav>

          </>
        
        ): (
          <>
          
          <Hamburger onClick={() => setOpen(!open)}>
            <MenuIcon/>
          </Hamburger>
          <Nav open={open}>
            <MenuItem as={Link} to="/register">
              REGISTER
            </MenuItem>
            <MenuItem as={Link} to="/login">
                  LOGIN
            </MenuItem>
        </Nav>
        </>
        )}

        </Left>
        <Center>
        <Link to="/" style={{ textDecoration: 'none', color: 'black', cursor: 'default'}}>
          <Logo>
            THE CITY BOUTIQUE
          </Logo>
          </Link>
        </Center>
        <Right>
        <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        
       
            
              <MenuItemBadge as={Link} to="/cart">
                <StyledBadge overlap="rectangular" badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </StyledBadge>
              </MenuItemBadge>
        </Right>
      </Wrapper>
    </Container>
  );


 

};

export default Navbar;
