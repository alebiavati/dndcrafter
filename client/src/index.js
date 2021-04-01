import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { AuthProvider } from './components/AuthProvider';
import { Layout } from './components/Layout';
import './config'; // Imports environment variables and configures FCL
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <Layout>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Layout>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
