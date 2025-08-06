import { useTranslation } from "react-i18next";
import "./App.css";
import Navbar from "./Components/Navbar";
import { useEffect } from "react";
import Hero from "./Components/Hero";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Products from "./Components/Products.js";
import About from "./Components/About";
import Footer from "./Components/Footer";
import Checkout from "./Components/Checkout.js";
import ProductDetails from "./Components/ProductDetails.js";
import CusromerReviews from "./Components/CusromerReviews.js";
import WahtsappBtn from "./Components/WahtsappBtn.js";
import Shipping from "./Components/Shipping.js";
import Offers from "./Components/Offers.js";
import SignUp from "./Components/SignUp.js";
import Contact from "./Components/Contact.js";
import ExchangePolicy from "./Components/ExchangePolicy.js";
import Wishlist from "./Components/Wishlist.js";
import OrderSummary from "./Components/OrderPage.js";
import ForgotPasswordLayout from "./Components/forgot-password/ForgotPasswordLayout.js";
import SendResetCode from "./Components/forgot-password/SendResetCode.js";
import VerifyResetCode from "./Components/forgot-password/VerifyResetCode.js";
import ResetPassword from "./Components/forgot-password/ResetPassword.js";
import CategoryHomePage from "./Components/CategoryHomePage.js";
import OurMessage from "./Components/OurMessage.js";
import CustomerService from "./Components/CustomerService.js";
import OurVision from "./Components/OurVision.js";
import WhyNabta from "./Components/WhyNabta.js";
import OurPromise from "./Components/OurPromise.js";
import SalesApproach from "./Components/SalesApproach.js";
import ManufacturingProcess from "./Components/ManufacturingProcess.js";
import ExecutiveTeam from "./Components/ExecutiveTeam.js";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <CategoryHomePage />
              <Offers />
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order" element={<OrderSummary />} />
        <Route path="products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reviews" element={<CusromerReviews />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/exchangePolicy" element={<ExchangePolicy />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/OurMessage" element={<OurMessage />} />
        <Route path="/support" element={<CustomerService />} />
        <Route path="vision" element={<OurVision />} />
        <Route path="Why-nabta" element={<WhyNabta />} />
        <Route path="promise" element={<OurPromise />} />
        <Route path="sales" element={<SalesApproach />} />
        <Route path="manufacturing" element={<ManufacturingProcess />} />
        <Route path="executive" element={<ExecutiveTeam />} />
        {/*### Nested Routing *######/}
        {/* FORGE PASSWORD */}
        <Route path="/forgetPassword" element={<ForgotPasswordLayout />}>
          <Route path="send-code" element={<SendResetCode />} />
          <Route path="verify-code" element={<VerifyResetCode />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
      <Footer />
      <WahtsappBtn />
    </div>
  );
}

export default App;
