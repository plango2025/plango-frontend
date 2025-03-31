import React, { useState } from "react";
import styles from "./CommonSearchbar.module.scss";

// Model
class SearchBarModel {
  query: string;

  constructor(query: string = "") {
    this.query = query;
  }
}

// View
interface SearchBarViewProps {
  query: string;
  onSearch: (query: string) => void;
  onSearchClick: () => void;
}

const SearchBarView: React.FC<SearchBarViewProps> = ({ query, onSearch, onSearchClick }) => {
  return (
    <div className = {styles.searchBar}>
      <input
        type="text"
        value = {query}
        onChange = {(e) => onSearch(e.target.value)}
        className = {styles.input}
        placeholder = "Search..."/>
      <button onClick = {onSearchClick} className = {styles.button}>
        Search
      </button>
    </div>
  );
};

// Presenter
const SearchBarPresenter: React.FC = () => {
  const [model, setModel] = useState<SearchBarModel>(new SearchBarModel());

  const handleSearch = (query: string) => {
    setModel(new SearchBarModel(query));
  };

  const handleSearchClick = () => {
    console.log("Searching for:", model.query);
  };

  return <SearchBarView query={model.query} onSearch={handleSearch} onSearchClick={handleSearchClick} />;
};

export default SearchBarPresenter;