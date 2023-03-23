import React , {useState} from 'react';
import { Add, Remove } from "@mui/icons-material";
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { mobile } from "../responsive";
import { useSelector } from 'react-redux';
//import StripeCheckout from "react-stripe-checkout";
import PayButton from "../components/PayButton";
//import {userRequest} from  "../requestMethods";
//import {useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';
import { removeProduct, clearCart, reduceQntity, addProduct } from '../redux/cartRedux';
import { useDispatch } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '../components/chatIcon/ChatIcon';

//const KEY=process.env.REACT_APP_STRIPE;


const Container = styled.div`

`;

const Wrapper = styled.div`
  padding: 20px
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-family: 'Kalam', cursive;
  font-weight: 300;
  text-align: center;
`;

const Top  = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

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

const TopTexts = styled.div`
   ${mobile({ display: "none" })}

`;

const TopText = styled.span`
  text-decoration : underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;

`;


const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetails = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  margin-left:5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color}
`;

const ProductSize = styled.span``;

const Productcol = styled.span`
    display:flex;
    align-items: center;
    background-color: beige;
    padding: 10px;
    border-radius: 10%;
  
    &::before {
      content: attr(title);
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      padding: 5px;
      background-color: #000;
      color: #fff;
      border-radius: 5px;
      font-size: 12px;
      opacity: 0;
      transition: opacity 0.3s;
    }
    &:hover::before {
        opacity: 1;
    }
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin : "5px 15px"})}

`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
    ${mobile({ marginBottom : "20px"})}

`;


const Hr = styled.hr `
  background-color: #eee;
  border: none;
  height: 1px;

`;


const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  font-family: 'Kalam', cursive;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
    
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #394040;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const ButtonCheckout = styled.button`

width: 100%;
padding: 10px;
margin-top: 10px;
background-color: #394040;
color: white;
font-weight: 600;
cursor: pointer;

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

  
const ContinueShoppingButton = styled.button`
  
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
  width: 10rem;
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

const Cart = () => {

  const cart = useSelector(state=>state.cart);
  //const [stripeToken, setStripeToken] = useState(null);
 // const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user.currentUser);
  const [isModalOpen, setIsModalOpen] = useState(false);


  //const [quantity, setqnt] = useState(1);

  // const onToken = (token)=>{
  //     setStripeToken(token);
  // };


  // useEffect(() => {
  // const makeRequest = async () => {
  //   try {
  //     const res = await userRequest.post("/checkout/payment", {
  //       tokenId: stripeToken.id,
  //       amount: cart.total * 100,
  //     });
  //     navigate("/success", {state : {data:res.data, products: cart}});
  //     } catch(err) {
  //       console.log(err);
  //     }
  //   };
  //   stripeToken && cart.total>=1 && makeRequest();
  // }, [stripeToken, cart.total, navigate, cart]);

    const handleClick = (product) => {
     dispatch(removeProduct(product));
    }

    const cleanCart = () =>{
      dispatch(clearCart())
    }

    const handleQnt = (type, product) => {
      if(type === "inc"){
        //product.quantity += 1;
        //product.total += product.price;
        dispatch(addProduct(product));
      }else if(type === "desc"){
        if(product.quantity > 0){
          //product.quantity -= 1;
          //product.total -= product.price;
          dispatch(reduceQntity(product));
        }
      }
    }


    const openModal = ()=>{
      setIsModalOpen(!isModalOpen);
    }

    const closeModal =() =>{
      setIsModalOpen(false);
    }
  

  return(
    <>
        {isModalOpen && (
      <ModalWrapper>
        <h4>LOGIN TO CONTINUE </h4>
        <CloseButton onClick={closeModal}>
          <CloseIcon fontSize='large'/>
        </CloseButton>
        <Link to="/login">
          <ContinueShoppingButton>
            LOGIN
          </ContinueShoppingButton> 
        </Link>
        <Link to="/register">
          <CheckoutButton>
            REGISTER
          </CheckoutButton>
        </Link>
      </ModalWrapper>
    )}


    <Container>
      <Navbar/>
      <Announcement />
        <Wrapper>
          <Title> YOUR CART </Title>
          <Top>
            <TopButton as={Link} to="/"
            style={{ width: "10rem" }}>
              KEEP SHOPPING
            </TopButton>
            <TopButton 
              style={{ color:'white', backgroundColor: "crimson", width: "10rem" }} 
              onClick={cleanCart}
              >
              CLEAR CART
            </TopButton>
            <TopTexts>
              <TopText> </TopText>
              <TopText> </TopText>
            </TopTexts>
            
          </Top>

          <Bottom>
          <Info>
          { cart.products.map(product =>(
            <Product key={product._id}>
              <>
                <ProductDetails>
                  <Image src = {product.img} />
                  <Details>
                   <ProductName>
                     <b>Product:</b> {product.title}
                   </ProductName>
                   <ProductId>
                     <b>Desc:</b> {product.desc}
                   </ProductId>
                   
                   <Productcol>
                    <b>color:</b> 
                    <ProductColor color={product.color}/>
                   </Productcol>
                      
                   
                   <ProductSize>
                     <b>Size:</b> {product.size}
                   </ProductSize>
               </Details>
              </ProductDetails>

                <PriceDetail>
                  
                  <ProductAmountContainer>
                    <Remove onClick ={() => handleQnt("desc", product)}/>
                    <ProductAmount>
                      {product.quantity}
                    </ProductAmount>
                    <Add onClick ={() => handleQnt("inc", product)}/>
                    
                    
                  </ProductAmountContainer>
                  

                  <ProductPrice>$ {product.price*product.quantity}</ProductPrice>

              <Button onClick={() => handleClick(product)}
                style={{ margin: '10px', width:"85%", backgroundColor: "crimson" }}>
                  Remove Item
              </Button>
                </PriceDetail>
             
          <Hr/>
          </>
              </Product>
            ))}

            </Info>

            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 0.00</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ 0.00</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                </SummaryItem>

            {/* 
                {user ? ( 
                
                <PayButton cart= {cart} />

                ): (
                 <ButtonCheckout onClick={openModal}>CHECKOUT NOW</ButtonCheckout>
                )}
             */}
            
            
            {user ? (
              cart.quantity > 0 ? (
                <PayButton cart={cart} />
              ) : (
                <ButtonCheckout onClick={() => window.alert("Cart is empty, please add items to the cart.")}>
                  CHECKOUT NOW
                </ButtonCheckout>
              )
            ) : (
              <ButtonCheckout onClick={openModal}>SIGN IN TO CHECKOUT</ButtonCheckout>
            )}

            </Summary>

          </Bottom>


        </Wrapper>


      <Footer />
      <ChatIcon />
    </Container>
  </>
  )
}

export default Cart;
