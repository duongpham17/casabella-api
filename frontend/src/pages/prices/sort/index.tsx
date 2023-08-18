import styles from './Sort.module.scss';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@redux/hooks/useRedux';
import { IPrice } from '@redux/types/prices';
import Prices from '@redux/actions/prices'
import { BsTrash } from 'react-icons/bs';
import useLoading from '@hooks/useLoading';
import Spinner from '@components/loading/Spinner';

const SortContainer = () => {

    const dispatch = useAppDispatch();

    const {prices} = useAppSelector( state => state.prices);

    const [edit, setEdit] = useState<IPrice | null>(null);

    const [data, setData] = useState(prices);

    const {onLoading, loading} = useLoading();

    const onEditPosition = (selected: IPrice) => {
        if(!edit) return setEdit(selected);
        if(!data) return;
        const findIndex = (_id: string) => data.findIndex(el => el._id === _id); 
        const new_data = [...data];
        const old_index = findIndex(edit._id);
        const new_index = findIndex(selected._id);

        new_data[new_index] = {...edit, createdAt: selected.createdAt}
        new_data[old_index] = {...selected, createdAt: edit.createdAt}

        dispatch(Prices.update(new_data[new_index]));
        dispatch(Prices.update(new_data[old_index]));

        setData(new_data);
        setEdit(null);
    };

    const onDelete = (p: IPrice) => async (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>)  => {
        e.stopPropagation();
        if(loading) return;
        if(!data) return;
        const new_data = data.filter(el => el._id !== p._id);
        setData(new_data);
        await onLoading(() => dispatch(Prices.remove(p)));
    };

    return ( !data ? null :
        <div className={styles.container}>
            {data.map((el) => 
                <div key={el._id} className={`${styles.element} ${edit?._id === el._id ? styles.selected : ""}`} onClick={() => onEditPosition(el)}>
                    <div>
                        <p>{el.title} </p>
                        <p>Subsets: {el.subsets.length}</p>
                    </div>
                    <div>
                        <button onClick={onDelete(el)}>{loading ? <Spinner size={15}/> : <BsTrash/>}</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SortContainer