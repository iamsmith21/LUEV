import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function CarList({ data }) {
  return (
    <>
      {data.map((item) => (
        <div className="mt-5" key={item.id}>
          <p>
            <strong>Name:</strong>
            {item.name}
          </p>
          <p>
            <strong>Model:</strong>
            {item.model}
          </p>
          <p>
            <strong>Year:</strong>
            {item.model_year}
          </p>
          <p>
            <strong>Price:</strong>
            {item.price}
          </p>
          <p>
            <strong>Mileage:</strong>
            {item.mileage}
          </p>
          <Link
            to={`/cars/${item.id}`}
            className="text-blue-600 hover:underline block mt-2"
          >
            More Details →
          </Link>
        </div> 
      ))}
    </>
  );
}

CarList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      model_year: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      price:PropTypes.number.isRequired,
      mileage:PropTypes.number.isRequired
    })
  ).isRequired,
};

export default CarList;
