import styles from './Prices.module.scss';
import { useState } from 'react'
import Admin from '@redux/actions/admin';
import useFetch from '@redux/hooks/useFetch';

import Items from './items';
import Actions from './actions';
import Sort from './sort';

const Prices = () => {

    useFetch(Admin.prices());

    const [sortPriceList, setSortPriceList] = useState(false)

    return (
        <div className={styles.container}>

            <Actions sortPriceList={sortPriceList} setSortPriceList={setSortPriceList} />

            { sortPriceList 
                ?
                    <Sort />
                :
                    <Items />
            }
            
        </div>
    )
}

export default Prices