import styles from './Actions.module.scss';
import { useAppDispatch, useAppSelector } from '@redux/hooks/useRedux';
import Prices from '@redux/actions/prices';

interface Props {
    editPrice: boolean,
    setEditPrice: React.Dispatch<React.SetStateAction<boolean>>
}

const Actions = ({editPrice, setEditPrice}: Props) => {

    const dispatch = useAppDispatch();

    const {prices} = useAppSelector(state => state.prices);

    const onCreate = () => {
        if(!prices) return;
        dispatch(Prices.create({title: `${prices.length+1} Main Title`}));
    };
    
    return (
        <div className={styles.container}>
            
           {!editPrice && <button onClick={onCreate}>new category</button>}

            <button onClick={() => setEditPrice(!editPrice)}>{editPrice ? "done" : "sort category"}</button>

        </div>
    )
}

export default Actions