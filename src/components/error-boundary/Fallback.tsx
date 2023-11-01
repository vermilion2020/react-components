import fallbackImg from '../../assets/fallback.jpg';

function Fallback() {
  return (
    <div className="fallback-container">
      <img
        className="fallback--img"
        src={fallbackImg}
        alt="Something went wrong"
      />
      <p>Oops, an error occur...</p>
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
