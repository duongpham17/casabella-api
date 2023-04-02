import styles from './Actions.module.scss';
import { useAppDispatch, useAppSelector } from '@redux/hooks/useRedux';
import Admin from '@redux/actions/admin';

interface Props {
    sortPriceList: boolean,
    setSortPriceList: React.Dispatch<React.SetStateAction<boolean>>
}

const Actions = ({sortPriceList, setSortPriceList}: Props) => {

    const dispatch = useAppDispatch();

    const {prices} = useAppSelector(state => state.admin);

    const onCreate = () => {
        if(!prices) return;
        dispatch(Admin.prices_create({title: `${prices.length+1} Main Title`}));
    };
    
    return (
        <div className={styles.container}>
            
            <button onClick={onCreate}>new category</button>
            {!!prices?.length && <button onClick={() => setSortPriceList(!sortPriceList)} className={sortPriceList ? styles.selected : ""}>{sortPriceList ? "editing" : "edit"}</button>}

        </div>
    )
}

export default Actions