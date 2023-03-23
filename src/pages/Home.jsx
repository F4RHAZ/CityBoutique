import Navbar from '../components/Navbar';
import React from 'react';
import Announcement from '../components/Announcement';
import Slider from '../components/Slider';
import Categories from "../components/Categories";
import Products from  "../components/Products";
//import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import ChatIcon from '../components/chatIcon/ChatIcon';

const Home = () => {
  return (
    <div>
      <Navbar />
      
      <Announcement />
      <Slider />
      <Categories/>

      <Products />
     

      <Footer />
      <ChatIcon />
    </div>
  )
}

export default Home
