import { useSearchParams } from 'react-router-dom';
import { IItem } from '../../model/response.interface';
import NotFound from '../not-found/NotFound';
import Preloader from '../search/Preloader';

interface IItemProfileProps {
  item: IItem | null;
  loading: boolean;
}

function DetailedCard({ item, loading }: IItemProfileProps) {
  const [searchParams, setSearchParams] = useSearchParams({});

  const closeCard = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };
  return (
    <>
      <div className="cross-icon" data-testid="cross-icon" onClick={closeCard}>
        <h3>&times;</h3>
      </div>
      {loading && <Preloader />}
      {!loading && !item && <NotFound />}
      {!loading && item && (
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
