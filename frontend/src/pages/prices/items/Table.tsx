import { IPriceSubsets, IPricesItem } from '@redux/types/prices';
import styles from './Table.module.scss';

interface Props {
    data: IPriceSubsets, 
    onSelectEdit: (area: "" | "title" | "subsets" | "items", value: any) => void,
};

const Table = ({data, onSelectEdit}: Props) => {

    const onEventWrapper = (value: IPricesItem) => (e: any) => {
        e.stopPropagation();
        onSelectEdit("items",value)
    }

    return (
        <div className={styles.container}>
            <table>

                <thead>
                    <tr>
                        <th className={styles.name}>TREATMENT</th>
                        <th>SINGLE PRICE</th>
                        {data.type === "bulk" &&
                            <th className={styles.bulk}>
                                <span>BUY 3+</span>
                                {data.bulk_discount > 0 && <span className={styles.bulk_discount}>{data.bulk_discount}% OFF</span>}
                            </th>
                        }
                    </tr>
                </thead>

                <tbody>
                    {data.items.map((el)  => 
                        <tr key={el.id} onClick={onEventWrapper(el)} >

                            <td className={styles.name}>
                                <span>{el.name}</span>
                                {el.discount > 0 && <span>{el.discount}% OFF</span>}
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

                            {data.type === "bulk" ?
                                el.discount !== 0 ?
                                <td className={styles.price}>
                                    <s>£{el.bulk_price}</s>
                                    <span>£{Math.ceil(el.bulk_price * (1-(data.bulk_discount / 100)))}</span>
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