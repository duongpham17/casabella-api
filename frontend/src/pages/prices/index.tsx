import styles from './Prices.module.scss';
import { useState } from 'react'
import Prices from '@redux/actions/prices';
import useFetch from '@redux/hooks/useFetch';

import Items from './items';
import Actions from './actions';
import Find from './find';
import Sort from './sort';

const PricesContainer = () => {

    useFetch(Prices.find());

    const [editPrice, setEditPrice] = useState(false)

    return (
        <div className={styles.container}>

            <Find />

            <Actions editPrice={editPrice} setEditPrice={setEditPrice} />

            { editPrice 
                ?
                    <Sort />
                :
                    <Items />
            }
            
        </div>
    )
}

export default PricesContainer