import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Item from './Item';
import { MemoryRouter } from 'react-router-dom';

describe('Item tests', () => {
  const item = {
    id: 63,
    name: 'Sunk Punk',
    tagline: 'Ocean Fermented Lager.',
    first_brewed: '09/2011',
    description:
      "It's rumoured just a drop can calm the fiercest of storms. A balance of sweet, salt and savoury, citrus, spruce and caramel. Fermented at the bottom of the North Sea, which just so happens to be the perfect temperature for lagers to ferment.",
    image_url: 'https://images.punkapi.com/v2/63.png',
    abv: 7.1,
    ibu: 68,
    target_fg: 1010,
    target_og: 1056,
    ebc: 14,
    srm: 7,
    ph: 4.4,
    attenuation_level: 82.1,
    volume: {
      value: 20,
      unit: 'litres',
    },
    boil_volume: {
      value: 25,
      unit: 'litres',
    },
    food_pairing: ['Salt baked cod with lemon and dill butter'],
    brewers_tips: '',
    contributed_by: 'Sam Mason <samjbmason>',
  };

  it('Renders Item with image', () => {
    render(
      <MemoryRouter>
        <Item item={item} />
      </MemoryRouter>
    );

    expect(screen.getByText(item.name)).toBeVisible();
    expect(screen.getByText(item.tagline)).toBeVisible();
    expect(screen.getByRole('img')).toBeVisible();
  });
});
