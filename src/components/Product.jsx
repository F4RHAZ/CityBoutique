import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import styled from "styled-components";
import { Link } from  "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.3);
  }
`;

const Product = ({ item }) => {
   // check if item.img is an array, and create a settings object for the slider
   const isMultipleImages = Array.isArray(item.img) && item.img.length > 1;
   const sliderSettings = {
     dots: false,
     infinite: true,
     speed: 500,
     slidesToShow: 1,
     slidesToScroll: 1,
     autoplay: true,
     autoplaySpeed: 3000,
   };

  

   function handleClick() {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }
  //console.log(item.img)
  
  return (
    <Container>
      <Circle />
      {isMultipleImages ? (
        <Slider style={{ width: 280 }} {...sliderSettings}>
          {item.img.map((imageUrl) => (
            //console.log(imageUrl),
            <Image key={imageUrl} src={imageUrl} />
          ))}
        </Slider>
      ) : (
        <Image src={item.img} />
      )}
      <Info>
     
        <Icon>
          <Link to= {`/product/${item._id}`} onClick={handleClick}>
          <SearchOutlined />
          </Link>
        </Icon>
      
      </Info>
    </Container>
  );
};

export default Product;
