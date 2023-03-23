import React ,  {useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
//import Newsletter from "../components/Newsletter";
import Products from '../components/Products';
import Footer from "../components/Footer";
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods"
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { Link } from  "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import ImagePicker from '../components/ImagePicker';
import ChatIcon from '../components/chatIcon/ChatIcon';


const Container = styled.div``;


const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection : "column" })}
`;


const ImgContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
   ${mobile({ height: "40vh" })}

`;

const InfoContainer = styled.div`
  flex: 1;
  padding : 0px 50px;
   ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 600;
  font-size:38px;
  ${mobile({ fontSize : "20px", fontWeight : "300" })}
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-weight: 300;
  font-size:28px;
  ${mobile({ fontSize : "20px" })}
`;

const Price = styled.span`
  font-weight: 900;
  font-size: 40px;
  ${mobile({ fontSize : "20px", fontWeight : "600" })}

`;

const FilterContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin: 30px 0px;
   ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
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

const FilterNo2 = styled.div`
  display: flex;
  align-items: center;
 
  padding: 10px;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 500;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
  font-size: 18px;
`;

const FilterSizeOption = styled.option`
    font-weight: 300;
    
`;


const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
   ${mobile({ width: "100%" })}

`;



const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 20px;
`;

const Amount = styled.span`
  width: 45px;
  height: 45px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
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
  width: 10em;
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

const CheckoutButton = styled.button`
  width: 10em;
  padding: 10px 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border: 1px dotted teal;
  text-decoration: none;
  margin: 10px 0px;
  padding:10px;
  border:none;
  font-size:18px;
  font-weight:500; 
  background-color: black; 
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

//image Picker







const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({images:[]});
  const [quantity, setqnt] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyProp, setKeyProp] = useState(Date.now());



  useEffect(() =>{
    const getProduct = async () => {
    try{
      const res = await publicRequest.get("/products/find/"+id)
      setProduct(res.data);
      setKeyProp(Date.now()); // update the key prop when product data changes
    } catch(err) {
        console.log(err);
    }
  };
    getProduct();
  }, [id]);


  const handleQnt = (type) =>{
    if(type === "desc"){
       quantity > 1 && setqnt(quantity - 1);
    }else{
      setqnt(quantity + 1);
    }
  };

  const closeModal =() =>{
    setIsModalOpen(false);
  }

  const handleClick = () =>{
    if(color && size) {
      // add item to cart
      //update cart
      dispatch(addProduct({...product, quantity, color, size}));
      setIsModalOpen(!isModalOpen);
    } else {
      alert("Please select a color and size before adding to cart.");
    }
  };
  
  return (
    <>
    {isModalOpen && (
      <ModalWrapper>
        <h4>Item added to cart</h4>
        <CloseButton onClick={closeModal}>
    <CloseIcon fontSize='large'/>
</CloseButton>
        <Link to="/">
          <ContinueShoppingButton>
            Continue Shopping
          </ContinueShoppingButton> 
        </Link>
        <Link to="/cart">
          <CheckoutButton>CheckOut Now</CheckoutButton>
        </Link>
      </ModalWrapper>
    )}

    <Container>
      <Navbar />
      
      <Announcement />

      <Wrapper >

      <ImgContainer>
            {product.img && (
              <ImagePicker images={product.img} keyProp={keyProp} />
            )}
          </ImgContainer>

        <InfoContainer>
          <Title>
            {product.title}
          </Title>

          <Desc>
            {product.desc}
          </Desc>

          <Price> $ {product.price} </Price>


          <FilterContainer>
            <Filter>
              <FilterTitle> Color: </FilterTitle>
              {product.color?.map((c) =>(
                <FilterColor color={c} key={c} onClick={() =>setColor(c)} title={c}/>
                ))}

            </Filter>

            <FilterNo2 >
              <FilterTitle> Size: </FilterTitle>
              <FilterSize onChange = {(e) => setSize(e.target.value)} >
                <FilterSizeOption value=""> SIZE</FilterSizeOption>
                {product.size?.map((s)=>(
                  <FilterSizeOption   key={s} value={s}>{s}</FilterSizeOption>
                  ))}

              </FilterSize>
            </FilterNo2>

          </FilterContainer>

          <AddContainer>
            <AmountContainer>
            <Remove style={{ fontSize: '34px' }}
             onClick ={() => handleQnt("desc")}/>
                <Amount> {quantity} </Amount>
              <Add style={{ fontSize: '34px' }} 
              onClick ={() => handleQnt("inc")}/>
            </AmountContainer>

          </AddContainer>
            <Button 
             style={{ marginTop : '15px', fontSize : '20px' }}
             onClick={()=>handleClick()} 
             >
               ADD TO CART 
               </Button>

        </InfoContainer>
      </Wrapper>

      <Products />
      <Footer />
<ChatIcon />
    </Container>
    </>
  )
}


export default Product
