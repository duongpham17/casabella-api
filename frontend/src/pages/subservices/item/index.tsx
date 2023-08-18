import styles from './Item.module.scss';
import { useAppDispatch } from '@redux/hooks/useRedux';
import { IService } from '@redux/types/services';
import { upload, remove } from '@thirdparty/nftstorage';

import Services from '@redux/actions/services';
import Alert from '@redux/actions/alert';
import useForm from '@hooks/useForm';
import empty from '@validations/empty';

import Input from '@components/inputs/Input';
import Textarea from '@components/inputs/Textarea';
import Button from '@components/buttons/Button';

import File from './File';

interface Props{
    service: IService,
    index: number,
};

const Item = ({service, index}: Props) => {

    const dispatch = useAppDispatch();

    const {onSubmit, values, onChange, edited, onSetValue} = useForm(service, callback, empty);

    function callback(){
        dispatch(Services.update(values));
        dispatch(Alert.set("updated", "green"));
    };

    const onUploadImage = async (file: any) => {
        const {ipfs} = await upload(file);
        const url = `https://${ipfs}.ipfs.nftstorage.link`;
        await onSetValue({image: url});
        await dispatch(Services.update({...values, image: url}));
    };

    const onRemoveImage = async () => {
        onSetValue({image: ""});
        const cid = values.image.split("/")[2].split(".")[0];
        await dispatch(Services.update({...values, image: ""}));
        await remove(cid);
    };

    return (
        <div className={styles.container}>

            <div className={styles.image}>
                <File src={values.image} callback={onUploadImage} onDelete={onRemoveImage}/>
            </div>

            <div className={styles.index}>
                <span>{index+1}</span>
            </div>

            <div className={styles.description}>
                <form onSubmit={onSubmit}>
                    <Input className={styles.input1} name="text_1" value={values.text_1 || ""} onChange={onChange} placeholder="header" />

                    <Textarea className={styles.input2} name="text_2" value={values.text_2 || ""} onChange={onChange} placeholder="description" />
                    
                    {edited && <Button type="submit" label1="Save" color='main' />}
                </form>
            </div>

        </div>
    )
}

export default Item