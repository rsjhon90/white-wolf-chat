import { 
  Box, 
  Button, 
  Text, 
  TextField, 
  Image, 
} from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';

import appConfig from '../config.json';

function Title(props) {
  const { tag, children} = props;
  const Tag = tag || 'h1';

  return (
    <>
      <Tag>{children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
          font-size: 24px;
          font-weight: 600;
        }
      `}
      </style>
    </>
  );
};

function HomePage() {
  const [username, setUsername] = React.useState();
  const [urlImage, setUrlImage] = React.useState();
  const [buttonBlock, setButtonBlock] = React.useState(true);

  const router = useRouter();

  React.useEffect(() => {
    const witcherPersona = {
      1: 'Dandelion',
      2: 'Yennefer',
      3: 'Triss',
      4: 'Geralt'
    };
  
    const random = Math.floor(Math.random() * (4 - 1 + 1) + 1);
    const witcherUser = witcherPersona[random];

    setUsername(witcherUser);
    setUrlImage(`https://white-wolf-chat.s3.sa-east-1.amazonaws.com/${witcherUser}.png`)
  }, []);

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '25px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 50%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={
              function handler(event) {
                event.preventDefault();
                router.push({
                  pathname: '/chat',
                  query: { username }               
                })
              }
            }
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h1">Boas vindas!</Title>

            <Text variant="body1" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals['050'] }}>
              Adentre, você, com garras, das orelhas pontudas, da magia ou não.
            </Text>

            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {`${appConfig.name} (${username})`}
            </Text>

            <TextField
              value={username || ''}
              onChange={
                function handler(event) {
                  setButtonBlock(false);
                  const value = event.target.value;

                  setUsername(value);
                  setUrlImage(`https://github.com/${value}.png`);

                  if (value.length <= 2) {
                    setUrlImage('');
                    setButtonBlock(true);
                  }
                }
              }
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              disabled={buttonBlock}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '25px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={urlImage}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
              {/* <p>{location}</p> */}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}

export default HomePage;