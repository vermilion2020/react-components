import { IEpisode } from '../../model/response.interface';

interface ICardProps {
  item: IEpisode;
}

function Card({ item }: ICardProps) {
  return (
    <div className="card-item">
      <div className="card-item--title" title={item.title}>
        Title: {item.title}
      </div>
      <div className="card-item--season" title={item.season.title}>
        Season: {item.season.title}
      </div>
    </div>
  );
}

export default Card;
