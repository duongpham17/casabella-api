import styles from './Item.module.scss';
import empty from '@validations/empty';
import useForm from '@hooks/useForm';
import Admin from '@redux/actions/admin';
import { useAppDispatch } from '@redux/hooks/useRedux';
import { FaStar } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { IReview } from '@redux/types/reviews';
import Button from '@components/buttons/Button';
import useLoading from '@hooks/useLoading';
import Spinner from '@components/loading/Spinner';

interface Props {
    review: IReview,
    index: number
}

const Item = ({review, index}:Props) => {

    const dispatch = useAppDispatch();

    const {loading: loadingDelete, onLoading: onLoadingDelete} = useLoading();

    const {values, onChange, onSubmit, onSetValue, loading, edited} = useForm(review, callback, empty);

    async function callback(){
        await dispatch(Admin.reviews_update(values));
    };

    const onDelete = () => {
        onLoadingDelete(() => dispatch(Admin.reviews_delete(review)))
    };

    return (
        <form className={styles.container} onSubmit={onSubmit}>
            <div className={styles.delete}>
                <p>{index+1}.</p>
                {loadingDelete ? <Spinner size={12}/>  : <button onClick={onDelete}> delete <MdKeyboardArrowRight/> </button>}
            </div>
            <input name="title" value={values.title} placeholder="Title" onChange={onChange} />
            <textarea name="review" value={values.review} placeholder="User review"  onChange={onChange} />
            <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map(el => 
                    <button key={el} type="button">
                        <FaStar onClick={() => onSetValue({stars: Number(el)})} className={ el <= values.stars ? styles.selected : ""} /> 
                    </button>
                )}
            </div>
            {edited && <Button type="submit" label1="add review" color="main" loading={loading}/>}
        </form>
    )
}

export default Item