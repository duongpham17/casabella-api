import React from 'react';
import { useState } from 'react';
import { IPrice, IPricesItem, IPriceSubsets } from '@redux/types/prices';
import { useAppDispatch } from '@redux/hooks/useRedux';
import Admin from '@redux/actions/admin';
import { generateid } from '@utils/functions';

interface Props {
    data: IPrice,
    index: number
};

type AreaTypes = "title" | "subsets" | "items" | "";

const useContext = ({data, index}:Props) => {
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);

    const [initialState, setInitialState] = useState<IPrice>(data); 
    
    const [editOptions, setEditOptions] = useState<{data: IPriceSubsets | null, set: boolean}>({set: false, data: null });

    const [editArea, setEditArea] = useState<AreaTypes>("");

    const [editTitle, setEditTitle] = useState<string>("");

    const [editSubsets, setEditSubsets] = useState<any>({});

    const [editItem, setEditItem] = useState<IPricesItem>({ id: "", subsetId: "", name: "", price: 0, discount: 0, bulk_discount: false, bulk_price: 0});

    const findSubsetIndex = (subsetId: string) => initialState.subsets.findIndex(el => el.id === subsetId);

    const loadingWrapper = async (Callback: any) => {
        setLoading(true);
        await Callback;
        setLoading(false)
    };

    const onAddSubsets = () => {
        setInitialState(state => ({ ...state, 
            subsets: [ ...state.subsets, 
                { id: generateid(), title: "Subset category", type: "price", bulk_discount: 0, items: [] } 
            ] 
        }));
    };

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

    const onUpdateTitle = (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {...initialState, title: editTitle};
        loadingWrapper(dispatch(Admin.prices_update(data)));
        setInitialState(data);
    };

    const onUpdateSubset = (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {...initialState};
        data.subsets = data.subsets.map((el) => editSubsets.id === el.id ? editSubsets : el);
        loadingWrapper(dispatch(Admin.prices_update(data)));
        setInitialState(data);
    };

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
        const new_item = {id: generateid(), subsetId: editItem.subsetId, name: "", price: 0, discount: 0, bulk_discount: false, bulk_price: 0}
        const subsetsItems = data.subsets[subsetIndex].items;
        subsetsItems[subsetsItems.length] = new_item;
        setEditArea("items");
        setEditItem(new_item)
    };

    const onSelectEdit = (area: typeof editArea, value: any) => {
        setEditArea(area);
        if(area==="title")   return setEditTitle(value);
        if(area==="subsets") return setEditSubsets(value)
        if(area==="items")   return setEditItem(value);
    };

    const onDeleteCategory = () => {
        loadingWrapper(dispatch(Admin.prices_delete(initialState)))
        setInitialState(data);
        setEditArea("");
    };

    const onDeleteSubset = () => {
        const data = {...initialState, subsets: initialState.subsets.filter((el) => editSubsets.id !== el.id)};
        loadingWrapper(dispatch(Admin.prices_update(data)))
        setInitialState(data);
        setEditArea("");
    };

    const onDeletePrice = () => {
        const data = {...initialState};
        const subsetIndex = findSubsetIndex(editItem.subsetId);
        data.subsets[subsetIndex].items = data.subsets[subsetIndex].items.filter(el => el.id !== editItem.id);
        loadingWrapper(dispatch(Admin.prices_update(data)));
        setInitialState(data);
        setEditArea("");
    };

    const onGetSubsetsData = (s: IPriceSubsets) => () => {
        if(s.id !== editSubsets.id) setEditSubsets(s)
    };

    const onEditOptions = () => {
        setEditOptions({set: !editOptions.set, data: null});
    };

    const onEditSubsetPosition = (subset: IPriceSubsets) => {
        onSelectEdit("subsets", subset);
        if(editOptions.data === null) return setEditOptions({...editOptions, data: subset});
        const data_new_position = {...initialState};
        const old_subset_index = findSubsetIndex(editOptions.data.id);
        const new_subset_index = findSubsetIndex(subset.id);
        data_new_position.subsets[new_subset_index] = editOptions.data;
        data_new_position.subsets[old_subset_index] = subset;
        loadingWrapper(dispatch(Admin.prices_update(data)));
        setInitialState(data_new_position);
        setEditOptions({set: true, data: null});
    };

  return {
    loading,
    data, index,
    initialState, setInitialState,
    editOptions, setEditOptions,
    editArea, setEditArea,
    editTitle, setEditTitle,
    editSubsets, setEditSubsets,
    editItem, setEditItem,
    findSubsetIndex,
    loadingWrapper,
    onAddSubsets,
    onAddItem,
    onUpdateTitle,
    onUpdateSubset,
    onUpdateItem,
    onDeleteCategory,
    onSelectEdit,
    onDeleteSubset,
    onDeletePrice,
    onGetSubsetsData,
    onEditOptions,
    onEditSubsetPosition
  }
};

export interface ContextPropsTypes {
    loading: boolean,
    data: IPrice,
    index: number,
    initialState: IPrice,
    setInitialState: React.Dispatch<React.SetStateAction<IPrice>>
    editOptions: { data: IPriceSubsets | null;  set: boolean },
    setEditOptions: React.Dispatch<React.SetStateAction<{ data: IPriceSubsets | null; set: boolean }>>,
    editArea: AreaTypes,
    setEditArea: React.Dispatch<React.SetStateAction<AreaTypes>>
    editTitle: string,
    setEditTitle: React.Dispatch<React.SetStateAction<string>>,
    editSubsets: any,
    setEditSubsets: React.Dispatch<any>,
    editItem: IPricesItem,
    setEditItem: React.Dispatch<React.SetStateAction<IPricesItem>>,
    findSubsetIndex: (subsetId: string) => number,
    loadingWrapper: (Callback: any) => Promise<void>,
    onAddSubsets: () => void,
    onAddItem: (subsets: IPriceSubsets) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    onUpdateTitle: (e: React.FormEvent<HTMLFormElement>) => void,
    onUpdateSubset: (e: React.FormEvent<HTMLFormElement>) => void,
    onUpdateItem: (e: React.FormEvent<HTMLFormElement>) => void,
    onDeleteCategory: () => void,
    onSelectEdit: (area: AreaTypes, value: any) => void,
    onDeleteSubset: () => void,
    onDeletePrice: () => void,
    onGetSubsetsData: (s: IPriceSubsets) => () => void,
    onEditOptions: () => void,
    onEditSubsetPosition: (subset: IPriceSubsets) => void
};

export default useContext