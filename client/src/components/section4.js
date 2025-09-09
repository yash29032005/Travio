function Section4() {
  const features = [
    {
      icon: "bi bi-currency-dollar",
      title: "Best Price Guarantee",
      description:
        "We ensure competitive pricing for all packages without compromising on quality.",
    },
    {
      icon: "bi bi-shield-check",
      title: "Secure & Trusted",
      description:
        "Your safety and data are our top priority, with 24/7 support and verified services.",
    },
    {
      icon: "bi bi-clock-history",
      title: "24/7 Customer Support",
      description:
        "We're here anytime you need help with your travel plans or questions.",
    },
  ];

  return (
    <div id="section4" className="py-5 bg-light">
      <div className="container text-center">
        {/* Heading */}
        <h2
          className="fw-bold mb-3 display-6"
          style={{ fontFamily: "Georgia, serif" }}
        >
          🌍 Why Choose Us
        </h2>
        <p className="text-muted mb-5 fs-5">
          We make your travel planning simple, safe, and affordable
        </p>
        <div
          className="mx-auto mb-5"
          style={{
            width: "90px",
            height: "4px",
            background: "var(--primary-color)",
            borderRadius: "2px",
          }}
        ></div>

        {/* Features Grid */}
        <div className="row g-4">
          {features.map((feature, index) => (
            <div className="col-12 col-sm-6 col-lg-4" key={index}>
              <div
                className="feature-card text-center p-4 h-100 rounded-4 shadow-sm bg-white"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 25px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
                }}
              >
                <div
                  className="d-inline-flex justify-content-center align-items-center mb-3 rounded-circle"
                  style={{
                    width: "80px",
                    height: "80px",
                    background: "rgba(13,110,253,0.1)",
                  }}
                >
                  <i className={`${feature.icon} fs-1 text-primary`}></i>
                </div>
                <h5 className="fw-bold mb-2">{feature.title}</h5>
                <p style={{ color: "grey" }}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Section4;
