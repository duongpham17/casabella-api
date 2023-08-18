import { useAppSelector } from '@redux/hooks/useRedux';
import { IPrice } from '@redux/types/prices';

import Editing from './Editing';
import Content from './Content';
import UseContext from './useContext';

const Item = ({data, index}: {data: IPrice, index: number}) => {

    return (
      <UseContext data={data} index={index}>

        <Content />

        <Editing />

      </UseContext>
    )
}

const ItemsWrapper = () => {

  const {prices} = useAppSelector(state => state.prices);

  return ( !prices ? null : 
    <div> 
      {prices.map((el, index) => 
        <div id={el.title} key={el._id}>
          <Item data={el} index={index} /> 
        </div>
      )}
    </div>
    )
}

export default ItemsWrapper