import { render, screen } from '@testing-library/react';
import SearchResults, { NO_ITEMS_MESSAGE } from './SearchResults';

describe('Renders Search results section', () => {
  const items = [
    {
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
