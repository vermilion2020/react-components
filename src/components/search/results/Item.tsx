import { IItem } from '../../../model/response.interface';

interface ICardProps {
  item: IItem;
  imagesTurnedOn: boolean;
}

function Item({ item, imagesTurnedOn }: ICardProps) {
  return (
    <div className="card-item" data-testid="card-item">
      {imagesTurnedOn && (
        <img
          className="card-item--image"
          src={item.image_url}
          alt={item.name}
        />
      )}
      <div className="card-item--description">
        <div className="info-line" title={item.name}>
          {item.name}
        </div>
        <div className="info-line" title={item.tagline}>
          {item.tagline}
        </div>
      </div>
    </div>
  );
}

export default Item;
