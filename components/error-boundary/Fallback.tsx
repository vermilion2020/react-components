import React from 'react';
import fallbackImg from '../../public/fallback.jpg';
import Image from 'next/image';
import classes from '../../styles/search.module.css';

function Fallback() {
  return (
    <div className={classes.fallbackContainer}>
      <Image
        width={300}
        height={200}
        className={classes.fallbackImg}
        src={fallbackImg}
        alt="Something went wrong"
      />
      <h2>Oops, an error occur...</h2>
      <p>Run away from an error!</p>
      <button
        className={classes.button}
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
