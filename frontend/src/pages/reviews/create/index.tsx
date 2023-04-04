import styles from './Create.module.scss';
import empty from '@validations/empty';
import useForm from '@hooks/useForm';
import Admin from '@redux/actions/admin';
import { useAppDispatch } from '@redux/hooks/useRedux';
import { FaStar } from 'react-icons/fa';
import Button from '@components/buttons/Button';

const Create = () => {

    const dispatch = useAppDispatch();

    const initialState = {
        title: "",
        review: "",
        stars: 0,
    };

    const {values, onChange, onSubmit, onSetValue, onClear, loading} = useForm(initialState, callback, empty);

    async function callback(){
        await dispatch(Admin.reviews_create(values));
        onClear()
    };

    return (
        <form className={styles.container} onSubmit={onSubmit}>
            <input name="title" value={values.title} placeholder="Title" onChange={onChange} />
            <textarea name="review" value={values.review} placeholder="User review"  onChange={onChange} />
            <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map(el => 
                    <button key={el} type="button">
                        <FaStar onClick={() => onSetValue({stars: Number(el)})} className={ el <= values.stars ? styles.selected : ""} /> 
                    </button>
                )}
            </div>
            <Button type="submit" label1="add review" color="main" loading={loading}/>
        </form>
    )
}

export default Create