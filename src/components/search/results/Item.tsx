import { Link } from 'react-router-dom';
import { IItem } from '../../../model/response.interface';
import noImg from '../../../assets/no-img.jpg';
import { useContext } from 'react';
import { SearchContext } from '../../../context/SearchContext';

interface ICardProps {
  item: IItem;
}

function Item({ item }: ICardProps) {
  const { currentPage } = useContext(SearchContext);

  return (
    <Link
      className="card-item"
      data-testid="card-item"
      to={`/search/${currentPage}/id/${item.id}`}
    >
      <img
        className="card-item--image"
        src={item.image_url || noImg}
        alt={item.name}
      />
      <div className="card-item--description">
        <div className="info-line" title={item.name}>
          {item.name}
        </div>
        <div className="sup-info" title={item.tagline}>
          {item.tagline}
        </div>
      </div>
    </Link>
  );
}

export default Item;
