import React, { useState } from "react";
import "./searchbar.css";
import { SearchBarProps } from "@/utils/types/type";

const SearchBar = ({ setSearch, setImgLoaded, getImages }: SearchBarProps) => {
  const [item, setItem] = useState("");
  const handleSubmit = async (val: string) => {
    setSearch(item);
    // inputRef.current.focus();
    setImgLoaded(false);
    getImages(item);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(item);
    }
  };

  return (
    <div className="wrap-input-18">
      <div className="search">
        <div>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search . . ."
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
