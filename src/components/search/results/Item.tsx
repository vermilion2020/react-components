import { IItem } from '../../../model/response.interface';
import noImg from '../../../assets/no-img.jpg';
import { AppDispatch, useAppSelector } from '../../../redux';
import { useDispatch } from 'react-redux';
import { setDetails } from '../../../redux/features/searchSlice';

interface ICardProps {
  item: IItem;
}

function Item({ item }: ICardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { details } = useAppSelector((state) => state.searchState);
  const openCard = (itemId: number) => {
    const newDetails = details ? 0 : itemId;
    dispatch(setDetails(newDetails));
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
