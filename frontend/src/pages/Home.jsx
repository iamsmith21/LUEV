import coverImg from "../assets/homeImg/Cover.jpg";
import BrowseByType from "../Components/BrowseByType";
import Detail from "../Components/detail";
import Reviews from "../Components/Reviews";
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
