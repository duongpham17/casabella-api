import styles from './Services.module.scss';
import { useState } from 'react';
import { useAppSelector } from '@redux/hooks/useRedux';
import Admin from '@redux/actions/admin';
import useFetch from '@redux/hooks/useFetch';

import Item from './item';
import Actions from './actions';
import Edit from './edit';

const Services = () => {

  const [editServices, setEditServices] = useState(false)

  useFetch(Admin.services());

  const {services} = useAppSelector(state => state.admin);

  return (
    <div className={styles.container}>
      <Actions editServices={editServices} setEditServices={setEditServices} />

      {!editServices 
        ? 
          services && services.map(el => <Item key={el._id} service={el} />)
        :
          <Edit />
      }

    </div>
  )
}

export default Services