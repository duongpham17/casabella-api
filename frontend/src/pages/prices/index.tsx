import styles from './Prices.module.scss';
import { useState } from 'react'
import Admin from '@redux/actions/admin';
import useFetch from '@redux/hooks/useFetch';

import Items from './items';
import Actions from './actions';
import Edit from './edit';

const Prices = () => {

    useFetch(Admin.prices());

    const [editPrice, setEditPrice] = useState(false)

    return (
        <div className={styles.container}>

            <Actions editPrice={editPrice} setEditPrice={setEditPrice} />

            { editPrice 
                ?
                    <Edit />
                :
                    <Items />
            }
            
        </div>
    )
}

export default Prices