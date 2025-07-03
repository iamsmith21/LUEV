import { useEffect, useState } from "react";
import Search from "../Components/search";
import CarList from "../Components/CarList";

function Shop() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [sortMileage, setSortMileage] = useState("");

  const handlePriceSort = (e) => {
  setSortPrice(e.target.value);
  setSortMileage(""); 
};

const handleMileageSort = (e) => {
  setSortMileage(e.target.value);
  setSortPrice(""); 
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();

        if (sortPrice) {
          params.append("price", sortPrice.split("_")[1]);
        }

        if (sortMileage) {
          params.append("mileage", sortMileage.split("_")[1]);
        }

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/cars${
            params.toString() ? `?${params.toString()}` : ""
          }`
        );
        if (!res.ok) {
          alert("failed to fetch data");
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [sortPrice,sortMileage]);

  const filteredResults = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="m-4">
        <div className="mb-4">
          <span className="mr-2">Price:</span>
          <label className="mr-4">
            <input
              type="radio"
              name="sortPrice"
              value="price_asc"
              checked={sortPrice === "price_asc"}
              onChange={handlePriceSort}
            />{" "}
            Low to High
          </label>
          <label className="mr-4">
            <input
              type="radio"
              name="sortPrice"
              value="price_desc"
              checked={sortPrice === "price_desc"}
              onChange={handlePriceSort}
            />{" "}
            High to Low
          </label>
          <label>
            <input
              type="radio"
              name="sortPrice"
              value=""
              checked={sortPrice === ""}
              onChange={handlePriceSort}
            />{" "}
            Auto
          </label>
        </div>
        <div className="mb-4">
          <span className="mr-2">Mileage:</span>
          <label className="mr-4">
            <input
              type="radio"
              name="sortMileage"
              value="mileage_asc"
              checked={sortMileage === "mileage_asc"}
              onChange={handleMileageSort}
            />{" "}
            Low to High
          </label>
          <label className="mr-4">
            <input
              type="radio"
              name="sortMileage"
              value="mileage_desc"
              checked={sortMileage === "mileage_desc"}
              onChange={handleMileageSort}
            />{" "}
            High to Low
          </label>
          <label>
            <input
              type="radio"
              name="sortMileage"
              value=""
              checked={sortMileage === ""}
              onChange={handleMileageSort}
            />{" "}
            Auto
          </label>
        </div>
      </div>
      <Search search={search} setSearch={setSearch} />
      {filteredResults.length == 0 ? (
        <div className="h-16 flex justify-center items-center">
          <p className="text-center text-gray opacity-75">no results found</p>
        </div>
      ) : (
        <CarList data={filteredResults} />
      )}
    </>
  );
}
export default Shop;
