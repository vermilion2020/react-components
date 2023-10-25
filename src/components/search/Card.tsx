import { IItem } from '../../model/response.interface';

interface ICardProps {
  item: IItem;
}

function Card({ item }: ICardProps) {
  return (
    <div className="card-item">
      <img
        className="card-item--image"
        src={item.avatar_url}
        alt="user avatar"
      />
      <div className="card-item--description">
        <div className="login" title={item.login}>
          Login: {item.login}
        </div>
        <a href={item.url} target="_blank" rel="noreferrer">
          Repos
        </a>
      </div>
    </div>
  );
}

export default Card;
