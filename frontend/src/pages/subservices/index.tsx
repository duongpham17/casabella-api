import styles from './Subservices.module.scss';
import { useState } from 'react';
import { useAppSelector } from '@redux/hooks/useRedux';
import Services from '@redux/actions/services';
import useFetch from '@redux/hooks/useFetch';

import Item from './item';
import Actions from './actions';
import Edit from './edit';

const SubServicesContainer = () => {

  useFetch(Services.find("type=subservices"));

  const [editServices, setEditServices] = useState(false)

  const {services} = useAppSelector(state => state.services);

  return (
    <div className={styles.container}>
      
      <Actions editServices={editServices} setEditServices={setEditServices} />

      {!editServices 
        ? 
          <div className={styles.sub}>
          {services && services.map((el, index) => <Item key={el._id} service={el} index={index} />)}
          </div>
        :
          <Edit />
      }

    </div>
  )
}

export default SubServicesContainer