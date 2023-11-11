import { IItem } from '../../../model/response.interface';
import noImg from '../../../assets/no-img.jpg';
import { useSearchParams } from 'react-router-dom';

interface ICardProps {
  item: IItem;
}

function Item({ item }: ICardProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const openCard = (itemId: number) => {
    if (!searchParams.get('details')) {
      searchParams.set('details', `${itemId}`);
      setSearchParams(searchParams);
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
        decoding="async"
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
