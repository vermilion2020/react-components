import React from 'react';
import { useAppSelector } from '../../../redux';
import classes from '../../../styles/error.module.css';

interface IItemsStatMessageProps {
  countItems: number;
  searchTerm: string;
}

function ItemsStatMessage({ countItems, searchTerm }: IItemsStatMessageProps) {
  const { perPage, page } = useAppSelector((state) => state.searchState);
  const term = !searchTerm.length ? 'an empty term' : `"${searchTerm}"`;
  return (
    <div className={classes.itemsStatMessage}>
      {`current page: ${page} | items per page: ${perPage} | count items for ${term}: ${countItems}`}
    </div>
  );
}

export default ItemsStatMessage;
