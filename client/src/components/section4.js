function Section4() {
  return (
    <>
      <div
        id="Section4"
        style={{ height: "auto", width: "100vw" }}
        className="p-5"
      >
        <div
          className="d-flex justify-content-center align-items-center fw-bold"
          style={{
            fontFamily: "serif",
            fontSize: "clamp(1rem,5vh,2rem)",
            height: "20%",
            width: "100%",
          }}
        >
          Partners
        </div>
        <div
          style={{ height: "80%", width: "100%" }}
          className="container text-center d-flex justify-content-center align-items-center"
        >
          <div className="row row-cols-2 row-cols-md-3">
            <div className="col">
              <img
                style={{
                  maxHeight: "150px",
                  width: "100%",
                  objectFit: "contain",
                }}
                className="mt-5"
                src="logo1.jpeg"
                alt=""
              />
            </div>
            <div className="col">
              <img
                style={{
                  maxHeight: "150px",
                  width: "100%",
                  objectFit: "contain",
                }}
                className="mt-5"
                src="logo2.jpeg"
                alt=""
              />
            </div>
            <div className="col">
              <img
                style={{
                  maxHeight: "150px",
                  width: "100%",
                  objectFit: "contain",
                }}
                className="mt-5"
                src="logo3.png"
                alt=""
              />
            </div>
            <div className="col-md-6">
              <img
                style={{
                  maxHeight: "150px",
                  width: "100%",
                  objectFit: "contain",
                }}
                className="mt-5"
                src="logo4.png"
                alt=""
              />
            </div>
            <div className="col-12 col-md-6">
              <img
                style={{
                  maxHeight: "150px",
                  width: "100%",
                  objectFit: "contain",
                }}
                className="mt-5"
                src="logo5.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Section4;

// background: "url(/logo5.png)",
