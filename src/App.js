import { useTranslation } from "react-i18next";
import "./App.css";
import Navbar from "./Components/Navbar";
import { useEffect } from "react";
import Hero from "./Components/Hero";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Products from "./Components/Products.js";
import ProductSlider from "./Components/Slider";
import About from "./Components/About";
import Footer from "./Components/Footer";
import Checkout from "./Components/Checkout.js";
import ProductDetails from "./Components/ProductDetails.js";
import InvoicePage from "./Components/InvoicePage.js";
import CusromerReviews from "./Components/CusromerReviews.js";
import WahtsappBtn from "./Components/WahtsappBtn.js";
import Shipping from "./Components/Shipping.js";
import Offers from "./Components/Offers.js";
import SignUp from "./Components/SignUp.js";
import Dashboard from "./Components/dashboard/DashboardLayout.js";
import Contact from "./Components/Contact.js";
import DashboardProducts from "./Components/dashboard/DashboardProducts.js";
import DashboardOrders from "./Components/dashboard/DashboardOrders.js";
import DashboardReviews from "./Components/dashboard/DashboardReviews.js";
import ExchangePolicy from "./Components/ExchangePolicy.js";

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
              <ProductSlider />
              <Offers />
            </>
          }
        />

        <Route path="login" element={<Login />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reviews" element={<CusromerReviews />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/exchangePolicy" element={<ExchangePolicy />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="productsDashboard" element={<DashboardProducts />} />
          <Route path="ordersDashboard" element={<DashboardOrders />} />
          <Route path="reviewsDashboard" element={<DashboardReviews />} />
        </Route>
      </Routes>

      <Footer />
      {/* Fixed btn */}
      <WahtsappBtn />
    </div>
  );
}

export default App;
