import styles from './Reviews.module.scss';
import Admin from '@redux/actions/admin';
import useFetch from '@redux/hooks/useFetch';
import { useAppSelector } from '@redux/hooks/useRedux';

import Item from './item';
import Create from './create';

const Reviews = () => {

    useFetch(Admin.reviews());

    const { reviews } = useAppSelector(state => state.admin);

    return (
      <div className={styles.container}>
        <Create />
        <h3>Total reviews {reviews && reviews.length}</h3>
        {reviews && 
          <div className={styles.items}>
            {reviews.map((el, index) =>  <Item key={el._id} index={index} review={el} /> )}
          </div>
        }
      </div>
    )
}

export default Reviews