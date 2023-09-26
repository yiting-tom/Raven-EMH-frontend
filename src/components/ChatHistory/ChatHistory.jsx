import React from 'react';
import { BsTrashFill } from 'react-icons/bs';
import { Scrollbar } from 'react-scrollbars-custom';
import { TypeAnimation } from 'react-type-animation';
import { Card, CardBody, Button, CardHeader, Col } from 'reactstrap';
import { styled } from 'styled-components';

import PopupModel from './PopupModal';

const DefaultMessage = styled(Col)`
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 1.4em;
  padding: 20% 0;
`;

const ChatHistory = ({ chats }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const scrollbarRef = React.useRef(null);

  return (
    <>
      <Scrollbar ref={scrollbarRef}>
        {chats && chats.length === 0 ? (
          <DefaultMessage>
            You don&apos;t have any chats yet.
            <br />
            Send a message to start chatting 💬.
          </DefaultMessage>
        ) : (
          chats &&
          chats.length > 0 &&
          chats[chats.length - 1] &&
          chats.map((chat, index) => (
            <Card
              key={chat.id}
              style={{
                marginBottom: index >= chats.length - 1 ? 0 : '1em',
                fontSize: '1.2em',
              }}
            >
              <CardHeader>
                {chat.request}
                <div style={{ float: 'right' }}>
                  <Button
                    className="btn-danger"
                    style={{ padding: '4px 10px' }}
                    onClick={() => setIsOpen(true)}
                  >
                    <BsTrashFill size="1.2em" />
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="description">
                {index >= chats.length - 1 ? (
                  <TypeAnimation
                    sequence={[chat.response]}
                    wrapper="span"
                    speed={50}
                    style={{ fontSize: '0.9em', display: 'inline-block' }}
                  />
                ) : (
                  <span>{chat.response}</span>
                )}
              </CardBody>
            </Card>
          ))
        )}
      </Scrollbar>
      <PopupModel modalIsOpen={modalIsOpen} setModalIsOpen={setIsOpen} />
    </>
  );
};

export default ChatHistory;
