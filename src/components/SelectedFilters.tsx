import { Tag } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";
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

    const SelectedFiltersContainer = styled.div`
        margin-bottom: 8px 
    `

    return (
        <SelectedFiltersContainer>
            {filters?.map(filter => <Tag closable onClose={removeFilter(filter)}>{filter}</Tag>)}
            {categories?.map(category => <Tag closable onClose={removeCategory(category)}>{category}</Tag>)}
        </SelectedFiltersContainer>
    )
}

export default SelectedFilters;
