import React from 'react';
import NotFound from '../not-found/NotFound';
import Preloader from '../search/Preloader';
import { AppDispatch, useAppSelector } from '../../redux';
import { useGetItemQuery } from '../../redux/api/itemsApi';
import { useEffect } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setDetails } from '../../redux/features/searchSlice';
import classes from '../../styles/item-profile.module.css';
import noImg from '../../public/no-img.jpg';

function DetailedCard() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, item, error } = useAppSelector((state) => state.detailState);
  const { details } = useAppSelector((state) => state.searchState);
  if (details) {
    useGetItemQuery(details);
  }

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  const closeCard = () => {
    dispatch(setDetails(0));
  };

  return (
    <section className={classes.itemProfileSection}>
      <div
        className={classes.crossIcon}
        data-testid="cross-icon"
        onClick={closeCard}
      >
        <h3>&times;</h3>
      </div>
      {loading && <Preloader />}
      {!loading && !item && <NotFound />}
      {!loading && item && !!details && (
        <div className={classes.itemProfile} data-testid="item-profile">
          {item.image_url ? (
            <img
              className={classes.itemProfileImage}
              src={item.image_url}
              alt={item.name}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <Image
              height={200}
              width={60}
              className={classes.itemProfileImage}
              src={noImg}
              alt={item.name}
            />
          )}
          <div className={classes.itemProfileDescription}>
            <h2 className={classes.heading}>{item.name}</h2>
            <div className={classes.text}>
              <span className={classes.supInfo}>Tagline: </span>
              {item.tagline}
            </div>
            <div className={classes.text}>
              <span className={classes.supInfo}>Descrition: </span>
              {item.description}
            </div>
            <div className={classes.text}>
              <span className={classes.supInfo}>Volume: </span>
              {item.volume.value} {item.volume.unit}
            </div>
            <div className={classes.text}>
              <span className={classes.supInfo}>Brewers tips: </span>
              {item.brewers_tips}
            </div>
            {!!item.method?.twist && (
              <div className={classes.text}>
                <span className={classes.supInfo}>Twist: </span>
                {item.method?.twist}
              </div>
            )}
            <div className={classes.text}>
              <span className={classes.supInfo}>Food pairing: </span>
              <ul className={classes.foodPairs}>
                {item.food_pairing.map((food, index) => (
                  <li key={index}>{food}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default DetailedCard;
