import styles from './Actions.module.scss';
import { useAppDispatch, useAppSelector } from '@redux/hooks/useRedux';
import Admin from '@redux/actions/admin';

interface Props {
    editPrice: boolean,
    setEditPrice: React.Dispatch<React.SetStateAction<boolean>>
}

const Actions = ({editPrice, setEditPrice}: Props) => {

    const dispatch = useAppDispatch();

    const {prices} = useAppSelector(state => state.admin);

    const onCreate = () => {
        if(!prices) return;
        dispatch(Admin.prices_create({title: `${prices.length+1} Main Title`}));
    };
    
    return (
        <div className={styles.container}>
            
           {!editPrice && <button onClick={onCreate}>new category</button>}
            <button onClick={() => setEditPrice(!editPrice)} className={editPrice ? styles.selected : ""}>{editPrice ? "editing" : "edit"}</button>

        </div>
    )
}

export default Actions