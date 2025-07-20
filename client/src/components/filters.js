function Filters({ sort, setSort }) {
  const handlechange = (e) => {
    setSort(e.target.value);
  };

  return (
    <>
      <p
        style={{
          fontSize: "clamp(1rem, 2vw, 10rem)",
          fontWeight: "bold",
        }}
      >
        Sort By
      </p>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          value="pricehl"
          checked={sort === "pricehl"}
          onChange={handlechange}
          id="checkDefault1"
        ></input>

        <label
          style={{ fontSize: "clamp(1rem, 1vw, 8rem)" }}
          className="form-check-label"
          htmlFor="checkDefault1"
        >
          Price(High to Low)
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          value="pricelh"
          checked={sort === "pricelh"}
          onChange={handlechange}
          id="checkDefault2"
        />
        <label
          style={{ fontSize: "clamp(1rem, 1vw, 8rem)" }}
          className="form-check-label"
          htmlFor="checkDefault2"
        >
          Price(Low to High)
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          value="rating"
          checked={sort === "rating"}
          onChange={handlechange}
          id="checkDefault3"
        />
        <label
          style={{ fontSize: "clamp(1rem, 1vw, 8rem)" }}
          className="form-check-label"
          htmlFor="checkDefault3"
        >
          Rating
        </label>
      </div>
    </>
  );
}
export default Filters;
