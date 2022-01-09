import React from "react";

type FilterData = {
    filters: string[];
    categories: string[];
    setFilters: (filters: string[]) => void;
    setCategories: (filters: string[]) => void;
}

const FilterContext = React.createContext<FilterData>({
    filters: [],
    categories: [],
    setFilters: (filters) => {},
    setCategories: (categories) => {}
})

export default FilterContext