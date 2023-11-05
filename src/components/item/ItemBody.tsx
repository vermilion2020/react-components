import { useNavigate } from 'react-router-dom';
import { IItem } from '../../model/response.interface';
import NotFound from '../not-found/NotFound';
import CrossIcon from '../search/CrossIcon';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';

interface IItemProfileProps {
  item: IItem | null;
}

function ItemBody({ item }: IItemProfileProps) {
  const { currentPage, setCurrentItemId } = useContext(SearchContext);
  const navigate = useNavigate();
  const closeCard = () => {
    setCurrentItemId(0);
    navigate(`/search/${currentPage}`);
  };

  return (
    <>
      <CrossIcon clickHandler={closeCard} />
      {!item && <NotFound />}
      {item && (
        <div className="item-profile">
          <img
            src={item.image_url}
            alt={item.name}
            className="item-profile--image"
            loading="lazy"
          />
          <div className="item-profile--description">
            <h2 className="heading">{item.name}</h2>
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
              {item.food_pairing[0]}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ItemBody;
