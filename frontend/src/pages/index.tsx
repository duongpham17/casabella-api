import styles from './Pages.module.scss'
import {Routes, Route} from 'react-router-dom';

import Private from 'pages/Private';

import Home from 'pages/home';
import Confirm from 'pages/confirm';
import Login from 'pages/login';
import Users from './users';
import Prices from './prices';
import Unknown from 'pages/unknown';

const Pages = () => {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/confirm/:token" element={<Confirm/>} />
        <Route path="/login" element={<Login/>} />

        <Route path="/users" element={<Private component={Users} roles={["admin"]}/> } />
        <Route path="/prices" element={<Private component={Prices} roles={["admin"]}/> } />

        <Route path="*" element={<Unknown/>} />
      </Routes>
    </div>
  )
}

export default Pages