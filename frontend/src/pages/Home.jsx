import coverImg from "../assets/homeImg/Cover.jpg";
import BrowseByType from "../components/BrowseByType";
import Detail from "../components/Detail";
import Reviews from "../components/Reviews";
function Home() {
  return (
    <>
      <div className="cover-container">
        <img src={coverImg} alt="Cover" className="cover-image" />
      </div>
      <BrowseByType />
      <Detail />
      <Reviews />
    </>
  );
}
export default Home;
