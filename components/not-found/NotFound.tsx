import React from 'react';
import notFoundImg from '../../public/404-error.jpg';
import classes from '../../styles/error.module.css';

function NotFound() {
  return (
    <div className={classes.notFound}>
      <h2>Not Found</h2>
      <div className={classes.contentHeading}>
        Page or item you are requesting does not exist
      </div>
      <div className={classes.contentDescription}>
        Check the URL or ask for help if you are sure that it is correct
      </div>
      <img className={classes.contentImg} src={notFoundImg} alt="Not found" />
    </div>
  );
}

export default NotFound;
