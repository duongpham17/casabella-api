import styles from './Editing.module.scss';
import { useContext, ReactNode } from 'react';
import { Context } from './useContext';

import { useAppDispatch } from '@redux/hooks/useRedux';
import Admin from '@redux/actions/admin';

import { generateid } from '@utils/functions';

import { BsTrash } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

import Input from '@components/inputs/Input';
import Button from '@components/buttons/Button';
import Choice from '@components/inputs/Choice';
import Checkbox from '@components/inputs/Checkbox';
import Flex from '@components/flex/Flex';
import Textarea from '@components/inputs/Textarea';

const Wrapper = ({onSubmit, onDelete, loading, children, message, setEditArea}: {onSubmit: any, onDelete: any, loading: boolean, children: ReactNode, message: string, setEditArea: CallableFunction}) => (
    <div className={styles.wrapper} onClick={() => setEditArea("")}>
        <form onSubmit={onSubmit} onClick={e => e.stopPropagation()}>
            <div className={styles.actions}>
                <div className={`${styles.buttons} ${styles.other}`}>
                    <Button type="button" onClick={() => setEditArea("")} label1={<MdClose/>} color="light" />
                </div>
                <div className={`${styles.buttons}`}>
                    <Button type="submit" label1="update" color="main" loading={loading} />
                </div>
                <div className={`${styles.buttons} ${styles.delete}`}>
                    <Button type="button" onClick={onDelete} label1={<BsTrash/>} color="light" />
                    <p className={styles.message}>{message}</p>
                </div>
            </div>
            {children}
        </form>
    </div>
);

const EditTitle = () => {

    const dispatch = useAppDispatch();

    const { loading, editTitle, setEditTitle, setEditArea, initialState, loadingWrapper, setInitialState } = useContext(Context);

    const onUpdateTitle = (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {...initialState, title: editTitle};
        loadingWrapper(dispatch(Admin.prices_update(data)));
        setInitialState(data);
    };

    const onDeleteCategory = () => {
        loadingWrapper(dispatch(Admin.prices_delete(initialState)))
        setEditArea("");
    };

    return (
        <Wrapper onSubmit={onUpdateTitle} onDelete={onDeleteCategory} loading={loading} message="delete everything" setEditArea={setEditArea}>
            <Input label1="Main Title" 
            name="title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} 
            />
        </Wrapper>
    )
};

const EditSubsets = () => {

    const dispatch = useAppDispatch();

    const { loading, editSubsets, setEditSubsets, setEditArea, loadingWrapper, setInitialState, initialState } = useContext(Context);

    const onChangeEditSubsets = (e: React.ChangeEvent<HTMLInputElement>) => setEditSubsets({...editSubsets, [e.target.name] : e.target.value});

    const onUpdateSubset = (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {...initialState};
        data.subsets = data.subsets.map((el) => editSubsets.id === el.id ? editSubsets : el);
        loadingWrapper(dispatch(Admin.prices_update(data)));
        setInitialState(data);
    };

    const onDeleteSubset = () => {
        const data = {...initialState, subsets: initialState.subsets.filter((el) => editSubsets.id !== el.id)};
        loadingWrapper(dispatch(Admin.prices_update(data)))
        setInitialState(data);
        setEditArea("");
    };

    return (
        <Wrapper onSubmit={onUpdateSubset} onDelete={onDeleteSubset} loading={loading} message="remove subset" setEditArea={setEditArea}>
            <Input label1="Subset Title" 
                name="title" value={editSubsets.title} onChange={onChangeEditSubsets} 
            />
            <Choice label="Type of table" items={["price", "bulk"]}
                value={editSubsets.type} onClick={(s: string) => setEditSubsets({...editSubsets, type: s})} 
            />
            { editSubsets.type === "bulk" && 
                <Input label1="Bulk discount" 
                    name="bulk_discount" value={editSubsets.bulk_discount || ""} onChange={onChangeEditSubsets} 
                />
            }
        </Wrapper>
    )
};

const EditItem = () => {

    const dispatch = useAppDispatch();

    const { loading, editSubsets, editItem, setEditItem, setEditArea, initialState, findSubsetIndex, loadingWrapper, setInitialState } = useContext(Context);

    const onChangeEditItem = (e: React.ChangeEvent<HTMLInputElement>) => setEditItem({...editItem, [e.target.name] : e.target.value});

    const onUpdateItem = (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {...initialState};
        const subsetIndex = findSubsetIndex(editItem.subsetId);
        const items = data.subsets[subsetIndex].items;
        items[items.findIndex(el => el.id === editItem.id)] = editItem;
        loadingWrapper(dispatch(Admin.prices_update(data)));
        setInitialState(data);
        const isLastItem = items.length - 1 === items.findIndex(el => el.id === editItem.id);
        if(!isLastItem) return;
        const new_item = {
            id: generateid(), 
            subsetId: editItem.subsetId, 
            name: "", 
            price: 0, 
            discount: 0, 
            bulk_discount: false, 
            bulk_price: 0,
            description: ""
        }
        const subsetsItems = data.subsets[subsetIndex].items;
        subsetsItems[subsetsItems.length] = new_item;
        setEditArea("items");
        setEditItem(new_item)
    };

    const onDeleteItem = () => {
        const data = {...initialState};
        const subsetIndex = findSubsetIndex(editItem.subsetId);
        data.subsets[subsetIndex].items = data.subsets[subsetIndex].items.filter(el => el.id !== editItem.id);
        loadingWrapper(dispatch(Admin.prices_update(data)));
        setInitialState(data);
        setEditArea("");
    };

    return (
        <Wrapper onSubmit={onUpdateItem} onDelete={onDeleteItem} loading={loading} message="remove price" setEditArea={setEditArea}>
            <Input label1="Name" 
                name="name" value={editItem.name} onChange={onChangeEditItem} 
            />
            <Textarea label1="Description" 
                name="description" value={editItem.description} onChange={onChangeEditItem as any} 
            />
            <Flex>
                <Input type="number" label1="£ Price" 
                    name="price" value={editItem.price || ""} onChange={onChangeEditItem} 
                /> 
                <Input type="number" label1="% Discount" 
                    name="discount" value={editItem.discount || ""} onChange={onChangeEditItem} 
                />
            </Flex>
            { editSubsets.type !== "bulk" ? "" :
                <Flex>
                    <Input type="number" label1="£ Bulk Price" 
                        name="bulk_price" value={editItem.bulk_price || ""} onChange={onChangeEditItem} 
                    />
                    <Checkbox label="Discount applied" value={editItem.bulk_discount ? "on" : "off"} selected={editItem.bulk_discount}
                        onClick={() => setEditItem({...editItem, bulk_discount: !editItem.bulk_discount})} 
                    />
                </Flex>
            }
        </Wrapper>                           
    )
}

const Editing = () => {

    const { editArea} = useContext(Context);

    return (
        <div className={styles.container}>
            {editArea === "title" && <EditTitle />}

            {editArea === "subsets" && <EditSubsets />}

            {editArea === "items" && <EditItem />}
        </div>
    )
}

export default Editing