import styles from './Navbar.module.scss';
import React from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks/useRedux';
import { Link } from 'react-router-dom';
import authentication from '@redux/actions/authentication';

const Navbar = () => {

const dispatch = useAppDispatch();

  const {isLoggedIn} = useAppSelector(state => state.authentication);

  const {user} = useAppSelector(state => state.user);

  const onLogout = () => dispatch(authentication.logout)
  
  return (
    <div className={styles.container}>
        <Link to="/"><p>Casa Bella</p></Link>

        <Link to="/"><p>{user?.role}</p></Link>

        { !isLoggedIn 
        ? 
            <Link to="/login">Login</Link> 
        : 
            <button onClick={onLogout}>logout</button>
        }
    </div>
  )
}

export default Navbar