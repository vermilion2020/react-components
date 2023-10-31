import preloader from '../../assets/preloader.gif';

function Preloader() {
  return (
    <div className="preloader" data-testid="preloader">
      <img className="preloader--img" src={preloader} alt="Loading..." />
    </div>
  );
}

export default Preloader;
