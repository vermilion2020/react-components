import { useContext, useEffect, useState } from 'react';
import { IItem } from '../../model/response.interface';
import ItemBody from './ItemBody';
import Preloader from '../search/Preloader';
import { SearchContext } from '../../context/SearchContext';
import { fetchItem } from '../../api/search-helper';
import { useNavigate } from 'react-router-dom';

function ItemProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [item, setItem] = useState<null | IItem>(null);
  const { currentItemId } = useContext(SearchContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
    if (currentItemId === 0) {
      navigate('/search/1');
    }
    getItem(currentItemId);
  }, [error, currentItemId]);

  async function getItem(itemId: number) {
    setLoading(true);
    const { data, err } = await fetchItem(itemId);
    setItem(data);
    setError(err);
    setLoading(false);
  }

  return (
    <>
      {loading && <Preloader />}
      {!loading && <ItemBody item={item} />}
    </>
  );
}

export default ItemProfile;
