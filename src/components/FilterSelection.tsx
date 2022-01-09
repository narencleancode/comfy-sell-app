import { Checkbox, Col, Row } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import Title from "antd/lib/typography/Title";
import React, { useContext } from "react";
import styled from "styled-components";
import FilterContext from "../contexts/FilterContext";

const AVAILABLE_FILTERS = [
    'Listed Products',
    'Curated List'
]

const AVAILABLE_CATEGORIES = [
    'Baby Care',
    'Beverages',
    'Biscuits & Snacks',
    'Bread & Bakery',
    'Breakfast & Packaged Food',
    'Breakfast Cereals',
    'Dairy Products',
    'Fruits & Vegetables',
    'Groceries',
    'Grocery & Staples',
    'Health Care',
    'Household Needs',
    'NonVeg',
    'Packaged Food',
    'Personal Needs',
    'Pet Care & Food',
    'Ready to Eat',
    'Staples'
]

const FilterSelection = () => {
    const { filters, setFilters, categories, setCategories } = useContext(FilterContext);

    const toggle = (name: string, data: string[], setter: (data: string[]) => void) => {
        return (event: CheckboxChangeEvent) => {
            if (event.target.checked) {
                setter([...data, name])
            } else {
                setter(data.filter(elementName => elementName !== name));
            }
        }
    }

    const toggleFilter = (filter: string) => {
        return toggle(filter, filters, setFilters);
    }
    const toggleCategory = (category: string) => {
        return toggle(category, categories, setCategories);
    }

    const FilterItem = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    `

    return (
        <React.Fragment>
            <Row gutter={16}>
                <Col flex={2}>
                    <Title level={3}>Lists</Title>
                    {
                        AVAILABLE_FILTERS.map(filter =>
                        (<FilterItem><Checkbox
                            onChange={toggleFilter(filter)}
                            checked={filters.indexOf(filter) > -1}
                        >{filter}</Checkbox></FilterItem>)
                        )
                    }
                </Col>
                <Col flex={3}>
                    <Title level={3}>Categories</Title>
                    {
                        AVAILABLE_CATEGORIES.map(category =>
                        (<FilterItem><Checkbox
                            onChange={toggleCategory(category)}
                            checked={categories.indexOf(category) > -1}
                        >{category}</Checkbox></FilterItem>)
                        )
                    }
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default FilterSelection;