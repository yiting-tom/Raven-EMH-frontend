import React, { useState } from 'react';
import { Button, Col } from 'reactstrap';
import { styled } from 'styled-components';

import FilterFieldModal from './FilterFieldModal';

const FilterFieldContainer = styled(Col)`
  margin: 0em auto;
  width: 100%;
`;

const CustomButton = styled(Button)`
  padding: 8px;
  border-radius: 0.5em;
  width: 100%;
`;

export default function FilterField({ filters, setFilters }) {
  const [isToggle, setIsToggle] = useState(false);
  const [isAddToggle, setIsAddToggle] = useState(false);
  const handleIsToggle = () => setIsToggle(!isToggle);
  const handleIsAddToggle = () => setIsAddToggle(!isAddToggle);

  const handleDeleteFilter = (target) => {
    setFilters(filters.filter((filter) => filter.name !== target.name));
  };

  const handleUpdateFilter = (target) => {
    if (target.name === '' || target.prompt === '') {
      alert('Filter name or prompt cannot be empty!');
      return;
    }
    setFilters(
      filters.map((filter) => {
        if (filter.name === target.name) {
          return target;
        }
        return filter;
      }),
    );
  };

  const handleAddFilter = (target) => {
    if (target.name === '' || target.prompt === '') {
      alert('Filter name or prompt cannot be empty!');
      return;
    }
    if (filters.some((filter) => filter.name === target.name)) {
      alert('Filter name already exists!');
      return;
    }
    setFilters([...filters, target]);
  };

  return (
    <FilterFieldContainer>
      {filters.length > 0 &&
        filters.map((filter, idx) => (
          <CustomButton key={filter.name} onClick={handleIsToggle}>
            {filter.name}
            <FilterFieldModal
              isToggle={isToggle}
              status={'UPDATE'}
              defaultFilterName={filters[idx].name}
              defaultFilterPrompt={filters[idx].prompt}
              defaultIsRegex={filters[idx].isRegex}
              handleIsToggle={handleIsToggle}
              handleAddFilter={handleAddFilter}
              handleDeleteFilter={handleDeleteFilter}
              handleUpdateFilter={handleUpdateFilter}
            />
          </CustomButton>
        ))}
      <CustomButton color="primary" onClick={handleIsAddToggle}>
        Add Filter
        <FilterFieldModal
          isToggle={isAddToggle}
          status={'CREATE'}
          defaultFilterName={''}
          defaultFilterPrompt={''}
          defaultIsRegex={false}
          handleIsToggle={handleIsAddToggle}
          handleAddFilter={handleAddFilter}
          handleDeleteFilter={handleDeleteFilter}
          handleUpdateFilter={handleUpdateFilter}
        />
      </CustomButton>
    </FilterFieldContainer>
  );
}
