import styles from './Actions.module.scss';
import React from 'react';
import { useAppDispatch } from '@redux/hooks/useRedux';
import Admin from '@redux/actions/admin';

interface Props {
    editServices: boolean,
    setEditServices:  React.Dispatch<React.SetStateAction<boolean>>
}

const Actions = ({editServices, setEditServices}: Props) => {

    const dispatch = useAppDispatch();

    const onCreate = () => dispatch(Admin.services_create());

    return (
        <div className={styles.container}>
           {!editServices && <button onClick={onCreate}>new service</button>}
            <button onClick={() => setEditServices(!editServices)} className={ editServices ? styles.selected : ""}>{editServices ? "done" : "sort"}</button>
        </div>
    )
}   

export default Actions