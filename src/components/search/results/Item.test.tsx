import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Item from './Item';

describe('Item tests', () => {
  const item = {
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
  };

  it('Renders Item with image', () => {
    render(<Item item={item} imagesTurnedOn={true} />);

    expect(screen.getByText(item.name)).toBeVisible();
    expect(screen.getByText(item.location.name)).toBeVisible();
    expect(screen.getByRole('img')).toBeVisible();
  });

  it('Renders Item without image', () => {
    // Arrange
    render(<Item item={item} imagesTurnedOn={false} />);

    // Expect
    expect(screen.getByText(item.name)).toBeVisible();
    expect(screen.getByText(item.location.name)).toBeVisible();
    expect(() => screen.getByRole('img')).toThrow();
  });
});
