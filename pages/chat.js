import { Box, TextField, Button } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';

import appConfig from '../config.json';
import { MessageList } from '../src/components/MessageList';
import { Header } from '../src/components/ChatHeader';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';
import { MessageRepository, MessageModel } from '../src/utils/supabaseClient';

export default function ChatPage() {
  const router = useRouter();
  const { username } = router.query;
  const messageRepository = new MessageRepository();

  const [typing, setTyping] = React.useState('');
  const [messageList, setMessageList] = React.useState([]);
  const [change, setChange] = React.useState({});

  React.useEffect(async () => {
    const messages = await messageRepository.findAll();

    setMessageList(messages);
  }, [, change]);

  React.useEffect(() => {
    messageRepository.listener(setChange);
  }, [messageList]);

  async function newMessageHandle(newMessage) {
    if (newMessage.length > 0) {
      const message = new MessageModel({
        from: username,
        body: newMessage
      });

      await messageRepository.save(message);

      setMessageList([
        message,
        ...messageList,
      ]);
      setTyping('');
    }
  };

  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: appConfig.theme.colors.neutrals['000'],
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 50%)',
          borderRadius: '25px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '25px',
            padding: '16px',
          }}
        >
          <MessageList 
            messages={messageList}
            deleteMessage={messageRepository.delete}
          />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              value={typing}
              onChange={
                function handler(event) {
                  const { value } = event.target;

                  setTyping(value);
                }
              }
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  newMessageHandle(typing);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '10px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              iconName="FaAngleDoubleRight"
              fullWidth
              variant="primary"
              onClick={
                () => {
                  newMessageHandle(message);
                }
              }
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
            <ButtonSendSticker onStickerClick={newMessageHandle}/>
          </Box>
        </Box>
      </Box>
    </Box>
  )
};