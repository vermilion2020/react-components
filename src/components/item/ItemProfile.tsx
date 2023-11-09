import { useEffect, useState } from 'react';
import { IItem } from '../../model/response.interface';
import ItemBody from './ItemBody';
import Preloader from '../search/Preloader';
import { fetchItem } from '../../api/search-helper';
import { useNavigate, useSearchParams } from 'react-router-dom';

function ItemProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [item, setItem] = useState<null | IItem>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const currentItemId = +(searchParams.get('details') ?? '');
    if (currentItemId <= 0) {
      navigate('/search/');
    } else {
      getItem(currentItemId);
    }
  }, [error, searchParams]);

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
