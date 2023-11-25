import { screen, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import SearchBar, { PLACEHOLDER_TEXT } from './SearchBar';
import { renderWithProviders } from '../../test-utils';
import { setupStore } from '../../redux';
import React from 'react';

describe('Search bar tests', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', () => {
    // Arrange
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const testVelue = 'test';
    const store = setupStore();

    renderWithProviders(<SearchBar />, { store });

    // Act
    const searchBarInput = screen.getByPlaceholderText(PLACEHOLDER_TEXT);
    fireEvent.change(searchBarInput, { target: { value: 'test' } });
    fireEvent.click(screen.getByText('Search'));

    // Expect
    expect(setItemSpy).toHaveBeenCalledWith('searchTerm', testVelue);
    expect(localStorage.getItem('searchTerm')).toEqual(testVelue);
  });

  it('Check that the component retrieves the value from the local storage upon mounting', () => {
    // Arrange
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
    const testVelue = 'test';
    const store = setupStore();

    renderWithProviders(<SearchBar />, { store });

    // Act
    localStorage.setItem('searchTerm', testVelue);

    // Expect
    const searchBarInput = screen.getByPlaceholderText(PLACEHOLDER_TEXT);
    expect(getItemSpy).toHaveBeenCalledWith('searchTerm');
    expect(searchBarInput).toHaveValue(testVelue);
  });
});
