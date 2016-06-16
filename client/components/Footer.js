import React from 'react'
import FilterLink from '../containers/FilterLink'

const Footer = () => (
        <p>
        Show:
    {" "}
    <FilterLink filter="SHOW_ALL">
        All
    </FilterLink>
        </p>
)

export default Footer
