import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, { SEARCH_URI } from '../../config';
import { IItem } from '../../model/response.interface';
import { AxiosError } from 'axios';
import ItemBody from './ItemBody';
import Preloader from '../search/Preloader';
import { SearchContext } from '../../context/SearchContext';

function ItemProfile() {
  const { id: itemId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [item, setItem] = useState<null | IItem>(null);
  const { setCurrentItemId } = useContext(SearchContext);

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
    const id = itemId ? +itemId : 1;
    setCurrentItemId(id);
    getItem(id);
  }, [error, itemId, setCurrentItemId]);

  const fetchItem = async (itemId: number) => {
    await axios
      .get(`${SEARCH_URI}${itemId}`)
      .then((result) => {
        const data = result.data as IItem[];
        setItem(data[0]);
        setError('');
      })
      .catch(function (e) {
        const err = e as AxiosError;
        setItem(null);
        setError(err.message);
      });
  };

  async function getItem(itemId: number) {
    setLoading(true);
    await fetchItem(itemId);
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
