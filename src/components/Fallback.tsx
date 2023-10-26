function Fallback() {
  return (
    <div className="fallback-container">
      <img
        className="fallback--img"
        src="./fallback.jpg"
        alt="Something went wrong"
      />
      <p>Run away from an error!</p>
      <button
        className="button"
        onClick={() => {
          window.location.reload();
        }}
      >
        Reload
      </button>
    </div>
  );
}

export default Fallback;
