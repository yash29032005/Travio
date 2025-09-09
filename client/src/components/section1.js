import SplitText from "../utils/SplitText";

function Section1() {
  return (
    <>
      <div
        id="Section1"
        className="p-4"
        style={{
          height: "calc(100vh - 70px)",
          width: "100vw",
          overflowX: "hidden",
          overflowY: "hidden",
        }}
      >
        <div
          className="d-flex flex-column align-items-center justify-content-center flex-lg-row rounded-5"
          style={{
            height: "100%",
            width: "100%",
            background: "url(space.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* <p
            >
            Explore.
            </p> */}

          <SplitText
            text="Explore."
            className="text-center text-white fw-bold col-lg-8 mb-0 fs-1"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
          <img
            src="earth.webp"
            className="col-lg-5"
            style={{ maxWidth: "100%" }}
            alt="earth"
          />
        </div>
      </div>
    </>
  );
}

export default Section1;
