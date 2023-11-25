import { describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import Fallback from './Fallback';
import { renderWithProviders } from '../../test-utils';
import { mswServer } from '../../setupTests';
import { FETCH_LIST_RESPONSE } from '../../mock';
import React from 'react';

describe('App tests', () => {
  it('Renders Fallback component properly', () => {
    mswServer.use(FETCH_LIST_RESPONSE);

    renderWithProviders(<Fallback />);

    expect(
      screen.getByRole('heading', {
        level: 2,
      })
    ).toHaveTextContent('Oops, an error occur...');
    expect(screen.getByRole('button')).toHaveTextContent('Open Home page');
  });
});
