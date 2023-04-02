import styles from './Item.module.scss';
import { useAppSelector } from '@redux/hooks/useRedux';
import { IPrice } from '@redux/types/prices';

import Editing from './Editing';
import Content from './Content';
import useContext from './useContext';

const Item = ({data, index}: {data: IPrice, index: number}) => {
    const context = useContext({data, index});
  
    return (
      <div className={styles.container}>

        <div className={styles.content}>
            <Content {...context} />
        </div>

        <div className={styles.editing}>
            <Editing {...context} />
        </div>

      </div>    
    )
}

const ItemsWrapper = () => {

  const {prices} = useAppSelector(state => state.admin);

  return ( !prices ? null : <> {prices.map((el, index) => <Item data={el} key={el._id} index={index} /> )}</>)
}

export default ItemsWrapper