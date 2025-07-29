import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
function Search({ search, setSearch }) {
  return (
    <div className="w-full">
      {" "}
      <Form className="d-flex align-items-center me-3">
        <Form.Control
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search"
          className="expanding-search flex-grow"
        />
      </Form>
    </div>
  );
}

Search.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.string.isRequired,
};

export default Search;
