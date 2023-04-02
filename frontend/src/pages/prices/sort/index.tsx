import styles from './Sort.module.scss';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@redux/hooks/useRedux';
import { IPrice } from '@redux/types/prices';
import Admin from '@redux/actions/admin'
import { BsTrash } from 'react-icons/bs';
import useLoading from '@hooks/useLoading';
import Spinner from '@components/loading/Spinner';

const Sort = () => {

    const dispatch = useAppDispatch();

    const {prices} = useAppSelector( state => state.admin);

    const [edit, setEdit] = useState<IPrice | null>(null);

    const [data, setData] = useState(prices);

    const {onLoading, loading} = useLoading()

    useEffect(() => { setData(prices) }, [prices])

    const onEditPosition = (selected: IPrice) => {
        if(!edit) return setEdit(selected);
        if(!data) return;
        const findIndex = (_id: string) => data.findIndex(el => el._id === _id); 
        const new_data = [...data];
        const old_index = findIndex(edit._id);
        const new_index = findIndex(selected._id);

        new_data[new_index] = {...edit, createdAt: selected.createdAt}
        new_data[old_index] = {...selected, createdAt: edit.createdAt}

        dispatch(Admin.prices_update(new_data[new_index]));
        dispatch(Admin.prices_update(new_data[old_index]));

        setData(new_data);
        setEdit(null);
    };

    const onDelete = (data: IPrice) => async (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>)  => {
        e.stopPropagation();
        if(loading) return;
        await onLoading(() => dispatch(Admin.prices_delete(data)));
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

export default Sort