import React, { useState } from "react";
import "./searchbar.scss";
import { useForm } from "react-hook-form";

const types = ["buy", "rent"];

const SearchBar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const onSubmit = (data) => {
    console.log("FORM DATA", data);
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="location"
          placeholder="City Location"
          {...register("location")}
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          {...register("minPrice")}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          {...register("maxPrice")}
        />
        <button type="submit">
          <img src="/search.png" alt="" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
