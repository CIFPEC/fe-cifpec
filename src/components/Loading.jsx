
const Loading = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-dark" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
      <h1 className="mb-4 fw-bold text-primary">Loading system data...</h1>
      <div className="spinner-border text-primary mb-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      {/* <h5>Loading CIFPEC system data ...</h5> */}
      <p className="text-muted">Please wait a moment while we prepare everything ✨</p>
    </div>
  );
};


export default Loading;
