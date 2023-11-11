import fallbackImg from '../../assets/fallback.jpg';

function Fallback() {
  return (
    <div className="fallback-container">
      <img
        className="fallback--img"
        src={fallbackImg}
        alt="Something went wrong"
      />
      <h2>Oops, an error occur...</h2>
      <p>Run away from an error!</p>
      <button
        className="button"
        onClick={() => {
          window.location.href = '/';
        }}
      >
        Open Home page
      </button>
    </div>
  );
}

export default Fallback;
