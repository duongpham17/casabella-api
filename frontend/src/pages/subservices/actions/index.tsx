import styles from './Actions.module.scss';
import React from 'react';
import { useAppDispatch } from '@redux/hooks/useRedux';
import Services from '@redux/actions/services';

interface Props {
    editServices: boolean,
    setEditServices:  React.Dispatch<React.SetStateAction<boolean>>
}

const Actions = ({editServices, setEditServices}: Props) => {

    const dispatch = useAppDispatch();

    const onCreate = () => dispatch(Services.create({type: "subservices"}));

    return (
        <div className={styles.container}>
           {!editServices && <button onClick={onCreate}>new service</button>}
            <button onClick={() => setEditServices(!editServices)} className={ editServices ? styles.selected : ""}>{editServices ? "done" : "sort"}</button>
        </div>
    )
}   

export default Actions