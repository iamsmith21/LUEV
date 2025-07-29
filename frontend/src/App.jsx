import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Shop from "./pages/Shop";
import NavbarEle from "./components/NavbarEle";
import HowFinancingWorks from "./pages/HowFinancingWorks";
import CarCalculator from "./pages/CarCalculator";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Login from "./pages/login";
import VehicleDetail from "./pages/VehicleDetail";
import Admin from "./pages/Admin";
import SalesReport from "./pages/SalesReport";
import UsageReport from "./pages/UsageReport";
import CompareCars from "./pages/CompareCars";
import ChatBot from "./components/ChatBot"
function App() {
  return (
    <Router>
      <NavbarEle />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/check-out" element={<Checkout />} />
          <Route path="/cars" element={<Shop />} />
          <Route path="/how-financing-works" element={<HowFinancingWorks/>} />
          <Route path="/car-calculator" element={<CarCalculator />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cars/:id" element={<VehicleDetail />} />
          <Route path="/admin" element={<Admin />}></Route>
           <Route path="/usage" element={<UsageReport />}></Route> 
           <Route path="/sales" element={<SalesReport />}></Route>
 <Route path="/compare" element={<CompareCars />}></Route>

        </Routes>
      </div>
      <ChatBot />
      <Footer />
    </Router>
  );
}

export default App;
