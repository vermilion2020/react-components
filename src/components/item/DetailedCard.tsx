import NotFound from '../not-found/NotFound';
import Preloader from '../search/Preloader';
import { AppDispatch, useAppSelector } from '../../redux';
import { useGetItemQuery } from '../../redux/api/itemsApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDetails } from '../../redux/features/searchSlice';

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
    <>
      <div className="cross-icon" data-testid="cross-icon" onClick={closeCard}>
        <h3>&times;</h3>
      </div>
      {loading && <Preloader />}
      {!loading && !item && <NotFound />}
      {!loading && item && !!details && (
        <div className="item-profile" data-testid="item-profile">
          <img
            src={item.image_url}
            alt={item.name}
            className="item-profile--image"
            loading="lazy"
          />
          <div className="item-profile--description">
            <h2 className="heading">{item.name}</h2>
            <div className="text">
              <span className="sup-info">Tagline: </span>
              {item.tagline}
            </div>
            <div className="text">
              <span className="sup-info">Descrition: </span>
              {item.description}
            </div>
            <div className="text">
              <span className="sup-info">Volume: </span>
              {item.volume.value} {item.volume.unit}
            </div>
            <div className="text">
              <span className="sup-info">Brewers tips: </span>
              {item.brewers_tips}
            </div>
            {!!item.method?.twist && (
              <div className="text">
                <span className="sup-info">Twist: </span>
                {item.method?.twist}
              </div>
            )}
            <div className="text">
              <span className="sup-info">Food pairing: </span>
              <ul className="food-pairs">
                {item.food_pairing.map((food, index) => (
                  <li key={index}>{food}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailedCard;
