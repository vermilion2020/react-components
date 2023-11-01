import { IItem } from '../../model/response.interface';

interface IItemProfileProps {
  item: IItem;
}

function ItemBody({ item }: IItemProfileProps) {
  return (
    <>
      <img
        src={item.image_url}
        alt={item.name}
        className="item-profile--image"
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
    </>
  );
}

export default ItemBody;
