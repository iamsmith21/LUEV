import { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Shop from "./pages/Shop";
import HotDeals from "./pages/HotDeals";
import NavbarEle from "./Components/NavbarEle";
import HowFinancingWorks from "./pages/HowFinancingWorks";
import Contact from "./pages/Contact";
import Footer from "./Components/Footer";
import Login from "./pages/login";
import VehicleDetail from "./pages/VehicleDetail";
import LoanCalculator from "./pages/LoanCalculator";
import LoanInfo from "./pages/LoanInfo";
import Cart from "./pages/Cart";
import OrderConfirmation from "./Components/OrderConfirmation";


function App() {
  return (
    <Router>
      <NavbarEle />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cars" element={<Shop />} />
          <Route path="/hot-deals" element={<HotDeals />} />
          <Route path="/how-financing-works" element={<HowFinancingWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cars/:id" element={<VehicleDetail />} />
          <Route path="/calculator" element={<LoanCalculator />} />
          <Route path="/loan-info" element={<LoanInfo />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
