import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material"
import {sliderItems} from '../data';
import { mobile, tablet } from "../responsive";


const Container = styled.div `
  margin-top: 1rem;
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display : "None" })}

`;

const Arrow = styled.div `
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props => props.direction === "left" && "10px"};
  right: ${props => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;


const Wrapper = styled.div `
  height :100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${props => props.slideIndex * -100}vw);
  
`;

const Slide = styled.div `
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;

  background-color: #${props => props.bg};
  ${tablet({ flexDirection : "column" })}
`;


const ImgContainer = styled.div `
  height: 100%;
  flex: 1;
 ${tablet({ flexDirection : "column" })}
 
`;


const Image = styled.img`
  height: 80%;
`;


const InfoContainer = styled.div `
  flex : 1;
  padding: 10px;
   ${tablet({ flexDirection : "column" })}
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Desc = styled.p`
  margin: 50px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;

`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;

`;

const Slider = () => {

  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    //  if(direction === "left"){
    //     setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2 );
      
    //   }else{
    //     setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0 );
       
    //   }
      if(direction === "left"){
        if(slideIndex === 0) {
          setSlideIndex(2);
        } else {
          setSlideIndex(slideIndex - 1);
        }
    } else {
        if(slideIndex === 2) {
          setSlideIndex(0);
        } else {
          setSlideIndex(slideIndex + 1);
        }
    }
    

    };

  useEffect(() => {
    const intervalId = setInterval(() => {
      //handleClick("right");
    
    }, 6000); // calls handleClick with "right" direction every 1 second
    return () => clearInterval(intervalId);
  }, [slideIndex]);

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined/>
      </Arrow>

      <Wrapper slideIndex = {slideIndex}>
        {sliderItems.map(item => (
          <Slide bg={item.bg} key = {item.id}>
            <ImgContainer>
              <Image src= {item.img} />
            </ImgContainer>

            <InfoContainer>
              <Title>
                {item.title}
              </Title>
              <Desc>
                {item.desc}
              </Desc>
              {/* <Button>
                SHOW NOW
              </Button> */}
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>


      <Arrow direction="right" onClick ={() => handleClick("right")}>
        <ArrowRightOutlined/>
      </Arrow>
    </Container>
  )
}

export default Slider
