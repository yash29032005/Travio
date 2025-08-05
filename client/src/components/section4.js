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
    <div id="Section5" className="py-5">
      <div className="container text-center">
        <h2 className="fw-bold mb-5" style={{ fontFamily: "serif" }}>
          Why Choose Us
        </h2>

        <div className="row g-4">
          {features.map((feature, index) => (
            <div className="col-12 col-sm-6 col-lg-4" key={index}>
              <div
                className="feature-card text-center p-4 h-100 rounded-top-5 shadow-sm bg-white"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <i className={`${feature.icon} fs-1 mb-3 text-primary`}></i>
                <h5 className="fw-semibold">{feature.title}</h5>
                <p className="text-grey">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Section4;
