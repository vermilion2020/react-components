import React from 'react';
import classes from '../../styles/search-results.module.css';
import preloaderImg from '../../public/preloader.gif';
import Image from 'next/image';

function Preloader() {
  return (
    <div className={classes.preloader} data-testid="preloader">
      <Image
        width={70}
        height={70}
        className={classes.preloaderImg}
        src={preloaderImg}
        loading="lazy"
        alt="Loading..."
      />
    </div>
  );
}

export default Preloader;
