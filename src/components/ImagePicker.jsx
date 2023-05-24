import { useState, useEffect } from "react";
import styled from "styled-components";
import { mobile, tablet, desktop } from "../responsive";

const ImagePickerContainer = styled.div`
  display: flex;
  flex:2;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MainImage = styled.img`
  max-width: 400px;
  height: 350px;
  margin-bottom: 12px;
 
  `;

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Thumbnail = styled.img`
  width: 50px;
  margin-right: 8px;
  cursor: pointer;
`;

const ImagePicker = ({ images, keyProp }) => {
   //console.log(images)
   const [mainImage, setMainImage] = useState(images.length > 1 ? images[0] : images[0]);


  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  useEffect(() => {
    setMainImage(images.length > 1 ? images[0] : images[0]);
  }, [images]);

  return (
    <ImagePickerContainer key={keyProp}>
      <MainImage src={mainImage}/>
      <ThumbnailContainer>
        {images.map((image, index) => (
          <Thumbnail
            key={index}
            src={image}
            onClick={() => handleThumbnailClick(image)}
          />
        ))}
      </ThumbnailContainer>
    </ImagePickerContainer>
  );
};

export default ImagePicker;
