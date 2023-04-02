import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@redux/store';

import Alert from 'constant/alert';
import Navbar from 'constant/navbar';
import Pages from 'pages';
import Global from 'global';

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Global/>
      <Alert/>
      <Navbar/>
      <Pages/>
    </BrowserRouter>
  </Provider>
);

export default App;
