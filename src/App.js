import {BrowserRouter as Router, Routes, Route, Navigate} from  "react-router-dom";
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from "./pages/Product";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import { Helmet } from 'react-helmet';


const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  const userToken = useSelector((state) => state.user.currentUser.accesstoken);

  return  (
    <>
    <Helmet>
     <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
     <link href="https://fonts.googleapis.com/css2?family=Bree+Serif&family=Kalam:wght@700&family=Kaushan+Script&family=Montserrat:wght@300;400&family=Rubik+Moonrocks&display=swap" rel="stylesheet"/>
    
    
    </Helmet>
    <Router>
      
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = "/products/:category" element = {<ProductList />} />
        <Route path ='/product/:id' element ={<Product />} />
        <Route path ='/cart' element ={<Cart />} />
        <Route path ='/success' element ={<Success />} />
        <Route path ='/profile' element ={<Profile />} />

        <Route path ='/login' element = {user && userToken? <Navigate to="/"/> : <Login />} />
        <Route path ='/register' element = {user && userToken? <Navigate to="/"/> : <Register />}  />
        
      </Routes>


    </Router>
    </>

  );


};
export default App;


//<Route path="*" element={<NotFount/>}></Route>