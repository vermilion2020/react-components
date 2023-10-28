import notFoundImage from '../../assets/404-error.jpg';

function NotFound() {
  return (
    <>
      <h2>Not Found</h2>
      <div className="content--heading">
        Page you are requesting does not exist
      </div>
      <div className="content--desctiption">
        Check the URL or ask for help if you are sure that it is correct
      </div>
      <img className="content--img" src={notFoundImage} alt="Not found" />
    </>
  );
}

export default NotFound;
