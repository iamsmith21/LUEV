import QualityImg from "../assets/homeImg/Quality.png";

function Detail() {
  return (
    <div className="detail-section py-5 flex-details">
      <div className="text-center bg-light p-5">
        <h1 className="display-5 fw-bold text-dark">
          Smarter Drives. Cleaner Tomorrow.
        </h1>
        <p className="lead text-secondary">
          Each vehicle undergoes a detailed inspection, ensuring advanced performance, reliability, and peace of mind on every drive. Our electric vehicles are thoroughly inspected for quality, giving you sustainable performance without compromise.
        </p>
        </div>
        <img src={QualityImg} alt="EV Quality Inspection" className="img-fluid quality-img" />

    </div>
  );
}

export default Detail;
