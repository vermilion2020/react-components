import { IItem } from '../../model/response.interface';

interface ICardProps {
  item: IItem;
  imagesTurnedOn: boolean;
}

function Card({ item, imagesTurnedOn }: ICardProps) {
  return (
    <div className="card-item">
      {imagesTurnedOn && (
        <img className="card-item--image" src={item.image} alt={item.name} />
      )}
      <div className="card-item--description">
        <div className="info-line" title={item.name}>
          {item.name}
        </div>
        <div className="info-line">
          <span className="sup-info">Season:</span> {item.location.name}
        </div>
      </div>
    </div>
  );
}

export default Card;
