interface IItemsStatMessage {
  currentPage: string;
  itemsPerPage: number;
  countItems: number;
  searchTerm: string;
}

function ItemsStatMessage({
  currentPage,
  itemsPerPage,
  countItems,
  searchTerm,
}: IItemsStatMessage) {
  const term = !searchTerm.length ? 'an empty term' : `"${searchTerm}"`;
  return (
    <div className="items-stat-message">
      {`current page: ${currentPage} | items per page: ${itemsPerPage} | count items for ${term}: ${countItems}`}
    </div>
  );
}

export default ItemsStatMessage;
