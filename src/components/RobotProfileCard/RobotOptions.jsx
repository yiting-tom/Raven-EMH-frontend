import React from 'react';
import { BiSolidUserVoice, BiHistory } from 'react-icons/bi';
import { BsPersonVideo } from 'react-icons/bs';
import { FaBookMedical } from 'react-icons/fa';
import { Button, Row } from 'reactstrap';
import { styled } from 'styled-components';

const Option = styled(Button)`
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 1em;
`;

const RobotOptionsContainer = styled.div`
  margin: 0em auto;
  padding: 0.5em;
  width: 80%;
  border-radius: 0.5em;
  border: 0px solid rgba(43, 63, 93, 0.6);
`;

const options = [
  {
    name: 'VOICE',
    icon: <BiSolidUserVoice size="1em" />,
    description: 'Use voice to communicate',
  },
  {
    name: 'VIDEO',
    icon: <BsPersonVideo size="1em" />,
    description: 'Use video to communicate',
  },
  {
    name: 'HISTORY',
    icon: <BiHistory size="1em" />,
    description: 'Retrieve vector history',
  },
  {
    name: 'MEDICAL KNOWLEDGE',
    icon: <FaBookMedical size="1em" />,
    description: 'Retrieve medical knowledge',
  },
];

export default function RobotOptions({ selectedOptions, setSelectedOptions }) {
  const handleOptionClick = (event) => {
    const option = event.target.textContent.toUpperCase().trim();
    if (selectedOptions.includes(option)) {
      setSelectedOptions(
        selectedOptions.filter((selectedOption) => selectedOption !== option),
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <RobotOptionsContainer>
      <Row style={{ margin: '4px 0px', justifyContent: 'center' }}>
        {options.map((option) => {
          return (
            <Option
              title={option.description}
              key={option.name}
              onClick={handleOptionClick}
              className={
                selectedOptions.includes(option.name)
                  ? 'btn-primary'
                  : 'btn-secondary'
              }
            >
              {option.icon} {option.name}
            </Option>
          );
        })}
      </Row>
    </RobotOptionsContainer>
  );
}
