import { Tag } from "antd";
import React, { useContext } from "react";
import FilterContext from "../contexts/FilterContext";


const SelectedFilters = () => {
    const { filters, categories, setFilters, setCategories } = useContext(FilterContext);
    const removeFilter = (removedFilter: string) => {
        return () => {
            setFilters(filters.filter(filter => filter !== removedFilter))
        }
    }

    const removeCategory = (removedCategory: string) => {
        return () => {
            setCategories(categories.filter(category => category !== removedCategory))
        }
    }

    return (
        <>
            {filters?.map(filter => <Tag closable onClose={removeFilter(filter)}>{filter}</Tag>)}
            {categories?.map(category => <Tag closable onClose={removeCategory(category)}>{category}</Tag>)}
        </>
    )
}

export default SelectedFilters;