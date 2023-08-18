import styles from './Navbar.module.scss';
import React from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks/useRedux';
import { Link } from 'react-router-dom';
import authentication from '@redux/actions/authentication';
import { AiOutlineLogout } from 'react-icons/ai';

const Navbar = () => {

const dispatch = useAppDispatch();

  const {isLoggedIn} = useAppSelector(state => state.authentication);

  const {user} = useAppSelector(state => state.user);

  const onLogout = () => dispatch(authentication.logout)
  
  return (
    <div className={styles.container}>
        <Link to="/"><p>CASA BELLA | {user?.role.toUpperCase()}</p></Link>

        { !isLoggedIn 
        ? 
            <Link to="/login">Login</Link> 
        : 
            <button onClick={onLogout}><AiOutlineLogout size={20}/></button>
        }
    </div>
  )
}

export default Navbar