/* eslint-disable @typescript-eslint/no-unused-vars */

import { animated, useSpring } from '@react-spring/web';
import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { BiLoader } from 'react-icons/bi';
import { ClipLoader, DotLoader, FadeLoader, HashLoader } from 'react-spinners';
import { Button, Card, CardText, Form, Row } from 'reactstrap';
import { styled } from 'styled-components';

import { fetchFeedbacksByUserId, updateFeedback } from 'api/feedback';
import Conversation from 'components/Conversation/Conversation';
// import PopupModal from 'components/Conversation/PopupModal';
import UserSelector from 'components/UserSelector/UserSelector';
import { color } from 'style';

const FeedbacksContainer = styled(animated.div)`
  margin: 2em auto;
  margin-bottom: 25em;
  max-width: 1024px;
  left: 0;
  right: 0;
`;

const ConversationContainer = styled.div`
  margin: 0 auto;
  margin-top: 3em;
  padding: 0 1em;
  border-radius: 1em;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const FeedbackPage = () => {
  const [started, setStarted] = useState(false);
  const [curIdx, setCurIdx] = useState(0);
  const [submitMap, setSubmitMap] = useState({});
  const [conversations, setConversations] = useState([]);
  const [isFetchingChats, setIsFetchingChats] = useState(false);
  const [userId, setUserId] = useState('');
  const [submit, setSubmit] = useState(false);
  const feedbackSpring = useSpring({
    from: { opacity: 0, translateX: '-100vw' },
    to: { opacity: 1, translateX: '0vw' },
  });

  useEffect(() => {
    if (userId === '') return;
    const load = async () => {
      setIsFetchingChats(true);
      setStarted(true);
      const data = await fetchFeedbacksByUserId(userId);
      setConversations(data);
      setIsFetchingChats(false);
    };
    load();
  }, [userId]);

  const handleScrollToConversation = () => {
    window.scrollTo({
      top: (curIdx / conversations.length) * 0.6 * document.body.scrollHeight,
      behavior: 'smooth', // smooth scroll
    });
  };

  const moveDown = () => setCurIdx((curIdx + 1) % conversations.length);
  const moveUp = () =>
    setCurIdx((curIdx - 1 + conversations.length) % conversations.length);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitAllFeedbacks = async () => {
      Object.entries(submitMap).forEach(async ([key, value]) => {
        await updateFeedback(key, value);
      });
    };
    submitAllFeedbacks();
    alert('Feedbacks submitted!', submitMap.length);
  };

  useEffect(() => {
    handleScrollToConversation();
  }, [curIdx]);

  useHotkeys(['up', 'k'], (e) => {
    e.preventDefault();
    moveUp();
  });
  useHotkeys(['down', 'j'], (e) => {
    e.preventDefault();
    moveDown();
  });

  return (
    <FeedbacksContainer className="content" style={feedbackSpring}>
      <UserSelector
        userId={userId}
        setUserId={setUserId}
        setCurIdx={setCurIdx}
      />
      <ConversationContainer>
        {isFetchingChats ? (
          <FadeLoader size="4em" color={color.primaryA(0.5)} />
        ) : conversations.length > 0 ? (
          conversations.map((conv, idx) => (
            <Conversation
              key={conv.id}
              conversation={conv}
              submit={submit}
              setSubmit={setSubmit}
              submitMap={submitMap}
              setSubmitMap={setSubmitMap}
              curIdx={curIdx}
              setCurIdx={setCurIdx}
              selfIdx={idx}
              delay={idx * 200}
            />
          ))
        ) : (
          started && (
            <CardText
              style={{ width: '32vw', height: '10vh', textAlign: 'center' }}
            >
              There are no conversations for this user.
            </CardText>
          )
        )}
      </ConversationContainer>
      <Form onSubmit={handleSubmit}>
        <Button>{submit ? <BiLoader /> : 'Submit'}</Button>
      </Form>
      {/* <PopupModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        setConfirm={setConfirm}
        handle
      /> */}
    </FeedbacksContainer>
  );
};

export default FeedbackPage;
