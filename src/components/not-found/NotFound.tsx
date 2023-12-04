import notFoundImage from '../../assets/404-error.jpg';

function NotFound() {
  return (
    <div className="not-found">
      <h2>Not Found</h2>
      <div className="content--heading">
        Page or item you are requesting does not exist
      </div>
      <div className="content--desctiption">
        Check the URL or ask for help if you are sure that it is correct
      </div>
      <img className="content--img" src={notFoundImage} alt="Not found" />
    </div>
  );
}

export default NotFound;
