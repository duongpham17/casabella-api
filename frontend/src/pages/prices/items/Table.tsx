import { IPriceSubsets, IPricesItem, IPrice } from '@redux/types/prices';
import { useState } from 'react';
import styles from './Table.module.scss';
import { useAppDispatch } from '@redux/hooks/useRedux';
import { HiMenuAlt4 } from 'react-icons/hi';
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

        const first_selected_item = subset.items[position];
        const second_selected_item = subset.items[index];
        
        //replace each other values
        const new_subset = {...cloneSubset};
        new_subset.items[position] = second_selected_item;
        new_subset.items[index] = first_selected_item;
        
        //update main document
        const new_price_list = {...data};  
        const subset_index = new_price_list.subsets.findIndex(el => el.id === new_subset.id);
        new_price_list.subsets[subset_index] = new_subset;

        // //update databse
        dispatch(Admin.prices_update(new_price_list));

        //reset 
        setCloneSubset(new_subset);
        setPosition(-1);
    };

    return (
        <div className={styles.container}>
            <table>

                <thead>
                    <tr>
                        <th className={styles.name}>TREATMENT</th>
                        <th>PRICE</th>
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
                                    <span>{index+1}. </span>
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