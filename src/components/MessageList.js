import { Box, Text, Image, Button } from '@skynexui/components';

import appConfig from '../../config.json';

export function MessageList(props) {
  const { messages, deleteMessage } = props;

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: '16px',
      }}
    >
      {(messages.map((message) => {
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: '10px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
              position: 'relative',
              flexDirection: 'column',
              display: 'flex',
            }}
          >
            <Button
              onClick={
                () => deleteMessage(message.id)
              }
              styleSheet={{
                marginLeft: '400px',
              }}
              colorVariant="accent"
              iconName="FaWindowClose"
              variant="tertiary"
            />
            <Box
              styleSheet={{
                marginBottom: '8px',
              }}
            >
              <Image
                styleSheet={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/${message.from}.png`}
              />
              <Text tag="strong">
                {message.from}
              </Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {(new Date().toLocaleDateString())}
              </Text>

            </Box>
            {message.body.startsWith(':sticker:')
            ? (
              <Image
               src={message.body.replace(':sticker:', '')}
               styleSheet={{
                 maxWidth: '150px'
               }}
              />
            )
            : (
              message.body
            )
            }
          </Text>
        )
      }))}
    </Box>
  )
};