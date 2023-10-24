function NotFound() {
  return (
    <div className="content not-found">
      <h2>Not Found</h2>
      <div className="content--heading">
        Page you are requesting does not exist
      </div>
      <div className="content--desctiption">
        Check the URL or ask for help if you are sure that it is correct
      </div>
      <img src="404-error.jpg" alt="Not found" />
    </div>
  );
}

export default NotFound;
