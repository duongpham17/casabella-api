import styles from './Home.module.scss';
import { useAppSelector } from '@redux/hooks/useRedux';
import { Link } from 'react-router-dom';

const Home = () => {

  const {isLoggedIn} = useAppSelector(state => state.authentication);

  return (
    <div className={styles.container}>
      {!isLoggedIn
        ?
          <div className={styles.logout}>
            <Link to="/login">Login to get access to dashboard</Link>
          </div>
        :
          <div className={styles.dashboard}>
            <ul>
              <li><Link to="/users">Users</Link></li>
              <li><Link to="/prices">Prices</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
            </ul>
          </div>
      }
    </div>
  )
}

export default Home