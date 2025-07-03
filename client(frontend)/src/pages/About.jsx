import cover from "../assets/aboutImg/AboutPageCover.jpg";
import footerImg from "../assets/aboutImg/AboutPageFooter.jpg";
function About() {
  return (
    <>
      <div className="main">
        <div className="sub-Main">
          <h1>About LUEV</h1>
          <p>
            Welcome to LUEV, your trusted online destination for premium
            electric vehicles. We are dedicated to transforming the way people
            drive by offering cutting-edge electric cars that combine
            innovation, sustainability, and performance.
          </p>
        </div>
        <img src={cover} alt="" />
      </div>
      <div className="part-1 bg-light">
        <h1 className="display-5 fw-bold text-dark">Our Mission</h1>
        <p className="lead text-secondary">
          At LUEV, our mission is to lead the automotive revolution by making
          electric vehicles accessible, affordable, and enjoyable for everyone.
          We believe in a future where clean energy drives us forward — reducing
          emissions, lowering fuel costs, and creating a healthier planet for
          generations to come.
        </p>
      </div>
      <div className="part-2 shadow-sm">
        <img src={footerImg} alt="" />
<div className="font-body max-w-3xl mx-auto my-10">
  <h4 className="font-heading text-2xl md:text-3xl font-semibold text-blue-700 mb-4">
    Why Choose LUEV?
  </h4>
  <p className="text-gray-700 text-base leading-relaxed">
    We combine deep industry knowledge with a passion for sustainability and technology. Whether you are a first-time electric vehicle buyer or a seasoned enthusiast, LUEV offers a seamless, secure, and enjoyable shopping experience. We pride ourselves on transparency, excellent service, and a commitment to driving positive change.
  </p>
</div>

      </div>
    </>
  );
}
export default About;
