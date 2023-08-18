import React from 'react';
import styles from './Edit.module.scss';
import { remove } from '@thirdparty/nftstorage';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@redux/hooks/useRedux';
import { IService } from '@redux/types/services';
import Services from '@redux/actions/services'
import { BsTrash } from 'react-icons/bs';
import useLoading from '@hooks/useLoading';
import Spinner from '@components/loading/Spinner';

const Edit = () => {
    const dispatch = useAppDispatch();

    const {services} = useAppSelector( state => state.services );

    const [edit, setEdit] = useState<IService | null>(null);

    const [data, setData] = useState(services);

    const {onLoading, loading} = useLoading();

    const onEditPosition = (selected: IService) => {
        if(!edit) return setEdit(selected);
        if(!data) return;
        
        const findIndex = (_id: string) => data.findIndex(el => el._id === _id); 

        const new_data = [...data];
        const old_index = findIndex(edit._id);
        const new_index = findIndex(selected._id);

        new_data[new_index] = {...edit, createdAt: selected.createdAt}
        new_data[old_index] = {...selected, createdAt: edit.createdAt}

        dispatch(Services.update(new_data[new_index]));
        dispatch(Services.update(new_data[old_index]));

        setData(new_data);

        setEdit(null);
    };

    const onDelete = (s: IService) => async (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>)  => {
        e.stopPropagation();
        if(loading) return;
        if(!data) return;
        const new_data = data.filter(el => el._id !== s._id);
        setData(new_data);
        await onLoading(() => dispatch(Services.remove(s)));
        const cid = s.image.split("/")[2].split(".")[0];
        await remove(cid);
    };

    return ( !data ? null :
        <div className={styles.container}>
            {data.map((el) => 
                <div key={el._id} className={`${styles.element} ${edit?._id === el._id ? styles.selected : ""}`} onClick={() => onEditPosition(el)}>
                    <div>
                        <img src={el.image} alt="preview"/>
                        <p>{el.text_2}</p>
                    </div>
                    <div>
                        <button onClick={onDelete(el)}>{loading ? <Spinner size={15}/> : <BsTrash/>}</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Edit