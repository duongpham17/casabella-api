import styles from './Actions.module.scss';
import React from 'react';
import { useAppDispatch } from '@redux/hooks/useRedux';
import Services from '@redux/actions/services';

import Url from '../url';
import More from '../more';

interface Props {
    editServices: boolean,
    setEditServices:  React.Dispatch<React.SetStateAction<boolean>>,
}

const Actions = ({editServices, setEditServices}: Props) => {

    const dispatch = useAppDispatch();

    const onCreate = () => dispatch(Services.create({type: "services"}));

    return (
        <div className={styles.container}>
           {!editServices && <button className={styles.button} onClick={onCreate}>new service</button>}
            <button onClick={() => setEditServices(!editServices)} className={`${styles.button} ${editServices ? styles.selected : ""}`}>{editServices ? "done" : "sort"}</button>
            <More button={<button className={styles.button}>more?</button>} />
            <Url button={<button className={styles.button}>urls?</button>} />
        </div>
    )
}   

export default Actions