import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import { AppleIcon, GoogleIcon, FacebookIcon } from 'src/assets/icons';

// ----------------------------------------------------------------------

type FormSocialsProps = BoxProps & {
  signInWithGoogle?: () => void;
  signInWithApple?: () => void;
  singInWithFacebook?: () => void;
};

export function FormSocials({
  sx,
  signInWithGoogle,
  signInWithApple,
  singInWithFacebook,
  ...other
}: FormSocialsProps) {
  return (
    <Box
      sx={[
        () => ({
          gap: 1.5,
          display: 'flex',
          justifyContent: 'center',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <IconButton color="inherit" onClick={signInWithGoogle}>
        <GoogleIcon width={22} />
      </IconButton>
      <IconButton color="inherit" onClick={signInWithApple}>
        <AppleIcon width={22} />
      </IconButton>
      <IconButton color="inherit" onClick={singInWithFacebook}>
        <FacebookIcon width={22} />
      </IconButton>
    </Box>
  );
}
