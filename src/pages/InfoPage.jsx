import { useSpring, animated } from '@react-spring/web';
import React from 'react';
import { styled } from 'styled-components';

const Container = styled.div`
  margin: 50px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 50px auto;
`;

const Title = styled.h1`
  color: #aaa;
`;

const Description = styled.p`
  color: #bbb;
`;

function EmhIntroduction() {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
  });

  return (
    <animated.div style={fadeIn}>
      <Container>
        <Title>Emergency Medical Helper (EMH) Robot</Title>
        <Description>
          When a patient comes to the emergency department, repetitive
          story-telling becomes common. Time gets wasted. Our interactive
          dialogue with an LLM powered conversation agent aims to cut that
          short. Imagine a tablet mounted on a rolling platform for testing in
          hospitals.
        </Description>

        <Description>
          Taking a medical history follows a specific format. This involves:
        </Description>
        <ul>
          <li>Chief Complaint (CC)</li>
          <li>History of Present Illness (HPI)</li>
          <li>Past Medical History (PMH)</li>
          <li>Medications</li>
          <li>Allergies</li>
          <li>Family History (FH)</li>
          <li>Social History (SH)</li>
          <li>Review of Systems (ROS)</li>
          <li>Physical Examination (PE) - Not software-supported</li>
          <li>Diagnostic Tests</li>
          <li>Assessment and Plan (A/P) - Optional Implementation</li>
        </ul>
      </Container>
    </animated.div>
  );
}

export default EmhIntroduction;
