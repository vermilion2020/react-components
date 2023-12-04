import { Component, MutableRefObject } from 'react';
import { ICountry } from '../../model/state.interface';

interface IAutocompleteProps {
  options: ICountry[];
  hiddenCountryInput: MutableRefObject<HTMLInputElement | null>;
  clearError: () => void
}

export class Autocomplete extends Component<IAutocompleteProps> {
  state = {
    activeOption: 0,
    filteredOptions: [] as ICountry[],
    showOptions: false,
    userInput: ''
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { options } = this.props;

    const userInput = e.currentTarget.value;

    const filteredOptions = options.filter(
      (c: ICountry) =>
        c.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { hiddenCountryInput, clearError } = this.props;

    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText
    });
    if (hiddenCountryInput.current) {
      hiddenCountryInput.current.value = e.currentTarget.dataset.code ?? '';
      clearError();
    }
  };
  onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { activeOption, filteredOptions } = this.state;
    const { hiddenCountryInput, clearError } = this.props;

    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption].name
      });
      if (hiddenCountryInput.current) {
        hiddenCountryInput.current.value = filteredOptions[activeOption].code ?? '';
        clearError();
      }

    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption === filteredOptions.length - 1) {
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,

      state: { activeOption, filteredOptions, showOptions, userInput }
    } = this;
    let optionList;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <ul className="options">
            {filteredOptions.map((c, index) => {
              let className;
              if (index === activeOption) {
                className = 'option-active';
              }
              return (
                <li className={className} key={c.code} onClick={onClick} data-code={c.code}>
                  {c.name}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <em>No Option!</em>
          </div>
        );
      }
    }

    return (
      <div className="search-autocomplete">
        <div className="search-input">
          <input
            type="text"
            className="search-box"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          <button value="" className="search-btn" ></button>
        </div>
        {optionList}
      </div>
    );
  }
}

export default Autocomplete;
