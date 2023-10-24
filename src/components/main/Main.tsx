import React, { Component } from "react";
import SearchBar from "../searchbar/SearchBar";

class Main extends Component {
  searchRef: React.RefObject<HTMLInputElement> =
    React.createRef<HTMLInputElement>();

  constructor() {
    super({
      items: [],
      searchTerm: "",
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="content">
        <SearchBar
          forwardRef={this.searchRef}
          searchTerm=""
          handleSearchTermChange={() => {}}
        />
        <div className="items-list">Search results</div>
      </div>
    );
  }
}

export default Main;
