import { render, screen } from '@testing-library/react';
import SearchResults, { NO_ITEMS_MESSAGE } from './SearchResults';

describe('Renders Search results section', () => {
  const items = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: {
        name: 'Earth (C-137)',
        url: 'https://rickandmortyapi.com/api/location/1',
      },
      location: {
        name: 'Citadel of Ricks',
        url: 'https://rickandmortyapi.com/api/location/3',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: ['https://rickandmortyapi.com/api/episode/1'],
      url: 'https://rickandmortyapi.com/api/character/1',
      created: '2017-11-04T18:48:46.250Z',
    },
  ];

  it('Search results list is displayed', () => {
    render(<SearchResults items={items} isLoading={false} />);
    const itemCards = screen.getAllByTestId('card-item');
    expect(itemCards.length).toEqual(items.length);
  });

  it('No items message is shown when search results are empty', () => {
    render(<SearchResults items={[]} isLoading={false} />);
    const message = screen.getByText(NO_ITEMS_MESSAGE);
    expect(message).toBeVisible();
  });

  it('Preloader is shown when data is loading', () => {
    render(<SearchResults items={[]} isLoading={true} />);
    const preloader = screen.getByTestId('preloader');
    expect(preloader).toBeVisible();
  });
});
