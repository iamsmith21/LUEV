import SedanImg from "../assets/homeImg/Sedan.jpg";
import CoupeImg from "../assets/homeImg/Coupe.jpg";
import SuvImg from "../assets/homeImg/SUV.jpg";
import VanImg from "../assets/homeImg/Van.jpg";
function BrowseByType() {
  return (
    <div className="Browse text-center">
      <h1 className="question">Browse Popular Vehicle Styles</h1>
      <div className="browseBox">
        <div>
          <img src={SedanImg} alt="" className="img-home" />
          <p>Sedan</p>
        </div>

        <div>
          <img src={CoupeImg} alt="" className="img-home" />
          <p>Coupe</p>
        </div>

        <div>
          <img src={SuvImg} alt="" className="img-home" />
          <p>SUV</p>
        </div>

        <div>
          <img src={VanImg} alt="" className="img-home" />
          <p>Minivan</p>
        </div>
      </div>
    </div>
  );
}
export default BrowseByType;
