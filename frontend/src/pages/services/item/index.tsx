import styles from './Item.module.scss';
import { useAppDispatch } from '@redux/hooks/useRedux';
import { IService } from '@redux/types/services';
import { upload, remove } from '@thirdparty/nftstorage';

import Admin from '@redux/actions/admin';
import Alert from '@redux/actions/alert';
import useForm from '@hooks/useForm';
import empty from '@validations/empty';
import Button from '@components/buttons/Button';

import File from './File';

interface Props{
    service: IService
};

const Item = ({service}: Props) => {

    const dispatch = useAppDispatch();

    const {onSubmit, values, onChange, edited, onSetValue} = useForm(service, callback, empty);

    function callback(){
        dispatch(Admin.services_update(values));
        dispatch(Alert.set("updated", "green"));
    };

    const onUploadImage = async (file: any) => {
        const {ipfs} = await upload(file);
        const url = `https://${ipfs}.ipfs.nftstorage.link`;
        await onSetValue({image: url});
        await dispatch(Admin.services_update({...values, image: url}));
    };

    const onRemoveImage = async () => {
        onSetValue({image: ""});
        const cid = values.image.split("/")[2].split(".")[0];
        await dispatch(Admin.services_update({...values, image: ""}));
        await remove(cid);
    };

    return (
        <div className={styles.container}>

            <div className={styles.left}>
                <form onSubmit={onSubmit}>
                    <input className={styles.input1} name="text_1" value={values.text_1 || ""} onChange={onChange} placeholder="small" />

                    <textarea className={styles.input2} name="text_2" value={values.text_2 || ""} onChange={onChange} placeholder="header" />

                    <textarea className={styles.input3} name="text_3" value={values.text_3 || ""} onChange={onChange} placeholder="summary" />

                    <textarea className={styles.input4} name="text_4" value={values.text_4 || ""} onChange={onChange} placeholder="paragraph" />

                    <textarea className={styles.input5} name="text_5" value={values.text_5 || ""} onChange={onChange} placeholder="summary" />
                    
                    {edited && <Button type="submit" label1="Save" color='main' />}
                </form>
            </div>

            <div className={styles.right}>
                <File src={values.image} callback={onUploadImage} onDelete={onRemoveImage}/>
            </div>

        </div>
    )
}

export default Item