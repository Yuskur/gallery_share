import React, { useState } from "react";
import { Search } from 'react-bootstrap-icons';
import './search-bar.css'
function SearchBar() {
    const [searchBox, setSearch] = useState("");
    return(
        <div className="search-body">
            <input 
                className="search-box"
                type="text"
                placeholder="Search for art"
                onChange={(change) => setSearch(change)}
            />
            <Search className="search-icon"/>
        </div>
    );
}

export default SearchBar;