import styles from './Content.module.scss';
import { useContext } from 'react';
import { Context } from './useContext';
import { generateid } from '@utils/functions';
import { IPriceSubsets } from '@redux/types/prices';
import { useAppDispatch } from '@redux/hooks/useRedux';
import Admin from '@redux/actions/admin';

import Table from './Table';

import Button from '@components/buttons/Button';
import Text from '@components/text/Style1';

const Actions = () => {
    const { editOptions, initialState, onEditOptions, setInitialState } = useContext(Context);

    const onAddSubsets = () => {
        setInitialState(state => ({ ...state, 
            subsets: [ ...state.subsets, 
                { id: generateid(), title: `Subset ${generateid()}`, type: "price", bulk_discount: 0, items: [] } 
            ] 
        }));
    };

    return (
        <div className={styles.actionsContainer}>
            {initialState.subsets.length >= 2 ? <Button label1={editOptions.set ? "done" : "sort subset"} color="black" onClick={onEditOptions} /> : <div></div>}
            <Button label1="new subset" color="black" onClick={onAddSubsets}/>
        </div>
    )
};

const Edit = () => {

    const dispatch = useAppDispatch();

    const { editOptions, initialState, setEditOptions, findSubsetIndex, loadingWrapper } = useContext(Context);

    const onEditSubsetPosition = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, subset: IPriceSubsets) => {
        e.stopPropagation();
        if(editOptions.data === null) return setEditOptions({...editOptions, data: subset});
        const data_new_position = {...initialState};
        const old_subset_index = findSubsetIndex(editOptions.data.id);
        const new_subset_index = findSubsetIndex(subset.id);
        data_new_position.subsets[new_subset_index] = editOptions.data;
        data_new_position.subsets[old_subset_index] = subset;
        loadingWrapper(dispatch(Admin.prices_update(data_new_position)));
        setEditOptions({set: true, data: null});
    };

    return (
        <div className={styles.editContainer}>
            <div className={styles.title}>
                <Text name="Category" value={initialState.title} size={20}  /> 
            </div>
            {initialState.subsets.map((s, index) => 
                <div className={`${styles.element} ${editOptions.data?.id === s.id ? styles.selected : ""}`} key={s.id} onClick={(e) => onEditSubsetPosition(e, s)}>
                    <Text name={`${index+1}. Subset`} value={s.title} />
                </div>
            )}
        </div>
    )
}

const SubsetTitle = () => {
    const { initialState, onSelectEdit, index} = useContext(Context);

    return (
        <div className={styles.subsetTitleContainer} onClick={() => onSelectEdit("title", initialState.title)}>
            <button><Text name={`${index+1}. Category`} value={initialState.title} /> </button>
        </div>
    )
}

const SubsetItems = () => {
    const { initialState, onSelectEdit, findSubsetIndex, setInitialState, setEditArea, setEditItem } = useContext(Context);

    const onAddItem = (subsets: IPriceSubsets) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        const data = {...initialState}
        const initialItem = {id: generateid(), name: "", price: 0, discount: 0, bulk_discount: false, bulk_price: 0, subsetId: subsets.id};
        const subsetIndex = findSubsetIndex(subsets.id);
        const subsetsItems = data.subsets[subsetIndex].items;
        subsetsItems[subsetsItems.length] = initialItem;
        setInitialState(data);
        setEditArea("items");
        setEditItem(initialItem)
    };
    
    return (
        <div className={styles.subsetItemsContainer}>
            {initialState.subsets.map((s, index) => 
                <div className={styles.element} key={s.id} onClick={() => onSelectEdit("subsets", s)}>
                    <Text name={`${index+1}. Subset`} value={s.title} />
                    <Table subset={s} data={initialState} onSelectEdit={onSelectEdit}/>
                    <button onClick={onAddItem(s)}>insert new price</button>
                </div>
            )}
        </div>
    )
};

const Content = () => {
    const { editOptions } = useContext(Context);

    return (
        <div className={styles.container}>
            <Actions />
            {editOptions.set 
                ?        
                    <Edit />
                :
                <>
                    <SubsetTitle/>
                    <SubsetItems />
                </>
            }
        </div>
    )
}

export default Content