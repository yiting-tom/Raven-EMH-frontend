import { useSpring, animated } from '@react-spring/web';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { BiHide, BiShow } from 'react-icons/bi';
import { Button, ButtonGroup, CardBody, CardText, Col } from 'reactstrap';
import { styled } from 'styled-components';

import RobotProfileModal from './RobotProfileModal';
import { AuthContext } from '../../contexts/AuthContext';
import { color } from '../../style.js';

const ConversationContainer = styled(animated(Col))`
  border-radius: 1em;
  cursor: pointer;
  margin-bottom: 1em;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
`;

const ConversationBody = styled(CardBody)`
  /* border-radius: 1em; */
`;

const ToggleBar = styled.div`
  position: related;
  top: 30vh;
  width: 100%;
  z-index: 1031;
  align-items: center;
  text-align: center;
`;

const OptionButton = styled(Button)`
  padding: 2px 6px;
  /* display: inline-block; */
  position: relative;
  left: 0.5em;
`;

const AnnotationArea = styled.div`
  ${(props) =>
    props.$isToggle &&
    `
  height: 0;
  overflow: hidden;
`}
`;

// TODO: display robot profile modal
const Conversation = ({
  conversation,
  submitMap,
  setSubmitMap,
  curIdx,
  setCurIdx,
  selfIdx,
  delay,
}) => {
  const { id, request, response, annotation, robot_profile } = conversation;
  const [score, setScore] = useState(annotation ? annotation.score : 0);
  const [annotated, setAnnotated] = useState(annotation > 0);
  const [toggleAnnotationArea, setToggleAnnotationArea] = useState(
    annotation !== null,
  );
  const [toggleRobotProfileModal, setToggleRobotProfileModal] = useState(false);
  const scrollRef = useRef(null);
  const spring = useSpring({
    from: { opacity: 0, translateX: '-100vw' },
    to: { opacity: 1, translateX: '0vw' },
    config: {
      duration: 500 + delay,
      mass: 1,
      friction: 20,
      tension: 100,
      precision: 0.1,
      velocity: 0.3,
    },
  });
  const { currentUser } = useContext(AuthContext);

  for (let i = 1; i < 6; i++) {
    useHotkeys(`${i}`, () =>
      !annotated && curIdx === selfIdx ? setScore(i) : {},
    );
  }

  useHotkeys('enter', () => {
    if (curIdx === selfIdx && score !== 0) {
      setAnnotated(true);
    }
  });
  useHotkeys('backspace', () => {
    if (score !== 0 && curIdx === selfIdx && annotation) setAnnotated(false);
  });
  useHotkeys(['h', 'left'], () => {
    if (curIdx === selfIdx && !annotated) setScore((score - 1 + 6) % 6);
  });
  useHotkeys(['l', 'right'], () => {
    if (curIdx === selfIdx && !annotated) setScore((score + 1) % 6);
  });
  useHotkeys(['s'], () => {
    if (curIdx === selfIdx) setToggleAnnotationArea(!toggleAnnotationArea);
  });

  useEffect(() => {
    if (annotation) return;
    const doctorId = currentUser.uid;

    if (id in submitMap && !annotated) {
      setSubmitMap((prev) => {
        const newMap = { ...prev };
        delete newMap[id];
        return newMap;
      });
    }
    if (annotated) {
      setSubmitMap((prev) => {
        const newMap = { ...prev };
        newMap[id] = [
          {
            score: score,
            created_at: Date.now(),
            created_by: doctorId,
          },
        ];
        return newMap;
      });
    }
  }, [annotated]);

  const getConversationContainerStyle = () => {
    const style = spring;
    const borderType = annotated ? 'solid' : 'dashed';

    if (annotated) {
      if (annotation > 0) {
        style.border = `1px solid ${color.successA(0.8)}`;
        style.backgroundColor = color.successA(0.05);
      } else {
        style.border = `1px solid ${color.infoA(0.8)}`;
        style.backgroundColor = color.infoA(0.05);
      }
    }
    if (curIdx === selfIdx) {
      style.border = `1px ${borderType} ${color.primaryA(0.8)}`;
    }
    return style;
  };

  return (
    <ConversationContainer
      ref={scrollRef}
      onClick={() => setCurIdx(selfIdx)}
      md="12"
      style={getConversationContainerStyle()}
    >
      <ConversationBody>
        <CardText>{request}</CardText>

        <div style={{ width: '100%' }}>
          {annotation ? (
            <span style={{ fontSize: '0.7em' }}>
              score: {annotation.score} by "{annotation.created_by}" at{' '}
              {annotation.created_at}
            </span>
          ) : (
            <span style={{ fontSize: '0.7em' }}>No annotation</span>
          )}
          {
            <OptionButton
              onClick={() => setToggleAnnotationArea(!toggleAnnotationArea)}
            >
              {!toggleAnnotationArea ? <BiHide /> : <BiShow />}
            </OptionButton>
          }
          <OptionButton
            onClick={() => setToggleRobotProfileModal(!toggleRobotProfileModal)}
          >
            Robot Profile
          </OptionButton>
        </div>

        <RobotProfileModal
          isOpen={toggleRobotProfileModal}
          toggle={() => setToggleRobotProfileModal(!toggleRobotProfileModal)}
          robotProfile={robot_profile}
          workflow={conversation.workflow}
        />

        <AnnotationArea $isToggle={toggleAnnotationArea}>
          <hr />
          <CardText>{response}</CardText>

          {selfIdx === curIdx && (
            <ToggleBar>
              <ButtonGroup style={{ display: 'block', width: '100%' }}>
                {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
                  <Button
                    disabled={annotation !== null || annotated}
                    key={i}
                    onClick={() => setScore(i)}
                    style={{
                      padding: '1vh 5%',
                      border:
                        i === score &&
                        `1px ${annotated ? 'solid' : 'dashed'} ${
                          annotated
                            ? annotation
                              ? color.successA(0.8)
                              : color.infoA(0.8)
                            : color.primaryA(0.8)
                        }`,
                    }}
                  >
                    {i}
                  </Button>
                ))}
              </ButtonGroup>
            </ToggleBar>
          )}
        </AnnotationArea>
      </ConversationBody>
    </ConversationContainer>
  );
};

export default Conversation;
