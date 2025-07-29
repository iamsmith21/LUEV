import SedanImg from "../assets/homeImg/Sedan.jpg";
import CoupeImg from "../assets/homeImg/Coupe.jpg";
import SuvImg from "../assets/homeImg/SUV.jpg";
import VanImg from "../assets/homeImg/Van.jpg";
import { Link } from "react-router-dom";
function BrowseByType() {
  return (
    <div className="Browse text-center">
      <h1 className="question">Browse Popular Vehicle Styles</h1>
      <div className="browseBox">
        <div>
          <Link to="/cars?shape=Sedan">
            {" "}
            <img src={SedanImg} alt="" className="img-home" />
            <p>Sedan</p>
          </Link>
        </div>

        <div>
          <Link to="/cars?shape=Coupe">
            {" "}
            <img src={CoupeImg} alt="" className="img-home" />
            <p>Coupe</p>
          </Link>
        </div>

        <div>
          <Link to="/cars?shape=SUV">
            {" "}
            <img src={SuvImg} alt="" className="img-home" />
            <p>SUV</p>
          </Link>
        </div>

        <div>
          <Link to="/cars?shape=Minivan">
            {" "}
            <img src={VanImg} alt="" className="img-home" />
            <p>Minivan</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default BrowseByType;
