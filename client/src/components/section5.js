function Section5() {
  return (
    <div id="Section4" className="container py-5">
      <h2 className="text-center fw-bold mb-4" style={{ fontFamily: "serif" }}>
        Our Partners
      </h2>

      <div className="row g-4 justify-content-center align-items-center">
        {[
          "logo1.jpeg",
          "logo2.jpeg",
          "logo3.png",
          "logo4.png",
          "logo5.png",
        ].map((logo, idx) => (
          <div className="col-6 col-md-4 col-lg-3 text-center" key={idx}>
            <img
              src={logo}
              alt={`Partner ${idx + 1}`}
              className="img-fluid"
              style={{
                maxHeight: "120px",
                objectFit: "contain",
                filter: "grayscale(20%)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Section5;
