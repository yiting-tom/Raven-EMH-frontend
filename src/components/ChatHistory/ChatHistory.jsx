import React from 'react';
import { BsTrashFill } from 'react-icons/bs';
import { Scrollbar } from 'react-scrollbars-custom';
import { TypeAnimation } from 'react-type-animation';
import { Card, CardBody, Button, CardHeader, Col } from 'reactstrap';
import { styled } from 'styled-components';

import AudioPlayerButton from './AudioPlayerButton';
import { deleteChat } from '../../api/chat';

const DefaultMessage = styled(Col)`
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 1.4em;
  padding: 20% 0;
`;

const ChatHistory = ({ chats, refetchChats }) => {
  const scrollbarRef = React.useRef(null);

  const sendDeleteRequest = async (chat_id) => {
    return await deleteChat(chat_id);
  };

  const handleDeleteChat = (chatId) => {
    if (confirm('Are you sure you want to delete this chat?')) {
      sendDeleteRequest(chatId);
      // refetch chats
      setTimeout(() => {
        refetchChats();
        scrollbarRef.current.scrollTo(0, scrollbarRef.current.scrollHeight);
      }, 1000);
    }
  };

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
            <>
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
                      onClick={() => {
                        handleDeleteChat(chat.id);
                      }}
                    >
                      <BsTrashFill size="1.2em" />
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="description">
                  {chat.audio_base64 && (
                    <AudioPlayerButton base64Audio={chat.audio_base64} />
                  )}
                  {index == chats.length - 1 ? (
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
            </>
          ))
        )}
      </Scrollbar>
    </>
  );
};

export default ChatHistory;
