import { ChakraProvider } from '@chakra-ui/react';
import { ReactElement } from 'react';
// @ts-expect-error
import theme from '../../theme';
import { Loading } from './Loading';
import { Navbar } from './Navbar';
import { AppRoutes } from './Routes';

export default function App(): ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Loading />
      <AppRoutes />
    </ChakraProvider>
  );
}
