import React from 'react';
import { IItem } from '../../../model/response.interface';
import Image from 'next/image';
import noImg from '../../../public/no-img.jpg';
import { AppDispatch, useAppSelector } from '../../../redux';
import { useDispatch } from 'react-redux';
import { setDetails } from '../../../redux/features/searchSlice';
import classes from '../../../styles/item.module.css';

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
      className={classes.cardItem}
      data-testid="card-item"
      onClick={() => openCard(item.id)}
    >
      {item.image_url ? (
        <img
          className={classes.cardItemImage}
          src={item.image_url}
          alt={item.name}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <Image
          height={200}
          width={60}
          className={classes.cardItemImage}
          src={noImg}
          alt={item.name}
        />
      )}
      <div className={classes.cardItemDescription}>
        <div className={classes.infoLine} title={item.name}>
          {item.name}
        </div>
        <div className={classes.suoInfo} title={item.tagline}>
          {item.tagline}
        </div>
      </div>
    </div>
  );
}

export default Item;
