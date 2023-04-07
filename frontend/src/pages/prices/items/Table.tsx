import { IPriceSubsets, IPricesItem, IPrice } from '@redux/types/prices';
import { useState } from 'react';
import styles from './Table.module.scss';
import { useAppDispatch } from '@redux/hooks/useRedux';
import { HiMenuAlt4 } from 'react-icons/hi';
import { cloneObject } from '@utils/functions';
import Admin from '@redux/actions/admin';

interface Props {
    data: IPrice,
    subset: IPriceSubsets, 
    onSelectEdit: (area: "" | "title" | "subsets" | "items", value: any) => void,
};

const Table = ({subset, onSelectEdit, data}: Props) => {

    const dispatch = useAppDispatch();

    const [position, setPosition] = useState(-1);

    const [cloneSubset, setCloneSubset] = useState(subset);

    const onEventWrapper = (value: IPricesItem) => (e: any) => {
        e.stopPropagation();
        onSelectEdit("items",value)
    };

    const onPosition = (index: number) => (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.stopPropagation();
        if(position === -1) return setPosition(index);
        if(position === index) return setPosition(-1);
        //update children : subset[index].item[index]
        const new_subset = cloneObject(subset);
        const update_item = new_subset.items[position];
        new_subset.items.splice(position, 1);
        new_subset.items.splice(index, 0, update_item);
        //update parent : price.subsets[index]
        const findSubsetIndex = (subsetId: string) => data.subsets.findIndex(el => el.id === subsetId);
        const subsetIndex = findSubsetIndex(new_subset.id);
        const new_data = cloneObject(data);
        new_data.subsets[subsetIndex] = new_subset;
        setCloneSubset(new_subset)
        dispatch(Admin.prices_update(new_data));
        setPosition(-1);
    };

    return (
        <div className={styles.container}>
            <table>

                <thead>
                    <tr>
                        <th className={styles.name}>TREATMENT</th>
                        <th>SINGLE PRICE</th>
                        {cloneSubset.type === "bulk" &&
                            <th className={styles.bulk}>
                                <span>BUY 3+</span>
                                {cloneSubset.bulk_discount > 0 && <span className={styles.bulk_discount}>{cloneSubset.bulk_discount}% OFF</span>}
                            </th>
                        }
                    </tr>
                </thead>

                <tbody>
                    {cloneSubset.items.map((el, index)  => 
                        <tr key={el.id} onClick={onEventWrapper(el)} >

                            <td className={styles.name}>
                                <div>
                                    <HiMenuAlt4 onClick={onPosition(index)} className={`${styles.icon} ${index === position ? styles.selected : ""}`}/>
                                    <span>{el.name}</span>
                                    {el.discount > 0 && <span>{el.discount}% OFF</span>}
                                </div>
                            </td>

                            {el.discount > 0  
                                ?  
                                    <td className={styles.price}>
                                        <s>£{el.price}</s>
                                        <span>£{Math.ceil(el.price * (1-(el.discount / 100)))}</span>
                                    </td>
                                :     
                                    <td className={styles.price}>£{el.price}</td>
                            }

                            {cloneSubset.type === "bulk" ?
                                el.discount !== 0 ?
                                <td className={styles.price}>
                                    <s>£{el.bulk_price}</s>
                                    <span>£{Math.ceil(el.bulk_price * (1-(cloneSubset.bulk_discount / 100)))}</span>
                                </td>
                                :
                                <td className={styles.price}>£{el.bulk_price}</td>
                                :
                                ""
                            }
                            
                        </tr>    
                    )}
                </tbody>
                
            </table>
        </div>
  )
};

export default Table;