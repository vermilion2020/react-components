import { IItem } from '../../../model/response.interface';
import noImg from '../../../assets/no-img.jpg';
import { useContext } from 'react';
import { SearchContext } from '../../../context/SearchContext';
import { useNavigate } from 'react-router-dom';

interface ICardProps {
  item: IItem;
}

function Item({ item }: ICardProps) {
  const { currentPage, setCurrentItemId, currentItemId } =
    useContext(SearchContext);
  const navigate = useNavigate();
  const openCard = (itemId: number) => {
    if (!currentItemId) {
      setCurrentItemId(itemId);
      navigate(`/search/${currentPage}?details=1`);
      scrollTo({ top: 0 });
    } else {
      setCurrentItemId(0);
      navigate(`/search/${currentPage}`);
    }
  };

  return (
    <div
      className="card-item"
      data-testid="card-item"
      onClick={() => openCard(item.id)}
    >
      <img
        className="card-item--image"
        src={item.image_url || noImg}
        alt={item.name}
        loading="lazy"
      />
      <div className="card-item--description">
        <div className="info-line" title={item.name}>
          {item.name}
        </div>
        <div className="sup-info" title={item.tagline}>
          {item.tagline}
        </div>
      </div>
    </div>
  );
}

export default Item;
