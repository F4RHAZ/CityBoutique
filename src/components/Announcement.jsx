import styled from "styled-components";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  height: auto;
  padding: 5px 10px;
  background-color: teal;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  margin-top: 1.2em;
  font-size: 20px;
 
  
`;




const Announcement = () => {
    const [announcements, setAnnouncements] = useState([]);
  
    useEffect(() => {
      publicRequest.get('/announcements/showAnnouncements')
        .then((res) => setAnnouncements(res.data))
        .catch((err) => console.log(err));
    }, []);


  return(
    <Container>
      {announcements.map((announcement) => (
        <p key={announcement._id}>
          {announcement.description}
        </p>
      ))}
    </Container>
  );
};
    
export default Announcement;
