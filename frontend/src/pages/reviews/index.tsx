import styles from './Reviews.module.scss';
import Reviews from '@redux/actions/reviews';
import useFetch from '@redux/hooks/useFetch';
import { useAppSelector } from '@redux/hooks/useRedux';

import Item from './item';
import Create from './create';

const ReviewsContainer = () => {

    useFetch(Reviews.find());

    const { reviews } = useAppSelector(state => state.reviews);

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

export default ReviewsContainer