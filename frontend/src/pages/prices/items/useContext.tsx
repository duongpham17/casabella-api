import React, {createContext} from 'react';
import { useState } from 'react';
import { IPrice, IPricesItem, IPriceSubsets } from '@redux/types/prices';

interface ContextTypesProps {
    children: React.ReactNode
    data: IPrice,
    index: number
};

type AreaTypes = "title" | "subsets" | "items" | "";

export interface PropsTypes {
    loading: boolean,
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
    onSelectEdit: (area: AreaTypes, value: any) => void,
    onEditOptions: () => void,
}

// for consuming in children components, initial return state
export const Context = createContext<PropsTypes>({
    loading: false,
    initialState: {_id: "", title: "", createdAt: new Date(), subsets: []},
    index: 0,
    setInitialState: () => null,
    editOptions: {set: false, data: null },
    setEditOptions: () => null,
    editArea: "",
    setEditArea: () => null,
    editTitle: "",
    setEditTitle: () => null,
    editSubsets: {},
    setEditSubsets: () => null,
    editItem: { id: "", subsetId: "", name: "", price: 0, discount: 0, bulk_discount: false, bulk_price: 0},
    setEditItem: () => {},
    findSubsetIndex: () => 0 ,
    loadingWrapper: async() => {},
    onSelectEdit: () => null,
    onEditOptions: () => null,
});

const UseContext = ({data, index, children}:ContextTypesProps) => {

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

    const onSelectEdit = (area: typeof editArea, value: any) => {
        setEditArea(area);
        if(area==="title")   return setEditTitle(value);
        if(area==="subsets") return setEditSubsets(value)
        if(area==="items")   return setEditItem(value);
    };

    const onEditOptions = () => {
        setEditOptions({set: !editOptions.set, data: null});
    };

    const value = {
        loading,
        index,
        initialState, setInitialState,
        editOptions, setEditOptions,
        editArea, setEditArea,
        editTitle, setEditTitle,
        editSubsets, setEditSubsets,
        editItem, setEditItem,
        findSubsetIndex,
        loadingWrapper,
        onSelectEdit,
        onEditOptions,
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default UseContext