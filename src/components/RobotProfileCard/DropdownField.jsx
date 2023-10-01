import React, { useState } from 'react';
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';
import { styled } from 'styled-components';

const CustomDropdown = styled(Dropdown)`
  width: 100%;
  margin: 0;
  padding: 0;
`;

const CustomDropdownToggle = styled(DropdownToggle)`
  width: 100%;
  margin: auto;
  padding: 10px;
`;

const CustomDropdownMenu = styled(DropdownMenu)`
  padding: 0px;
  width: 100%;
  margin: 6px 0;
  border-radius: 1em;
`;

const CustomDropdownItem = styled(DropdownItem)`
  padding: 4px 12px;
`;
export default function DropdownField({
  itemList,
  selectedItem,
  setSelectedItem,
  direction,
}) {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  return (
    <CustomDropdown
      direction={direction || 'down'}
      isOpen={dropdownIsOpen}
      toggle={() => setDropdownIsOpen(!dropdownIsOpen)}
    >
      <CustomDropdownToggle>{selectedItem}</CustomDropdownToggle>
      <CustomDropdownMenu>
        {itemList.map((item) => (
          <CustomDropdownItem key={item} onClick={() => setSelectedItem(item)}>
            {item}
          </CustomDropdownItem>
        ))}
      </CustomDropdownMenu>
    </CustomDropdown>
  );
}
