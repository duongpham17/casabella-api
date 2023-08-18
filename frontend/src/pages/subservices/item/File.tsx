import styles from './File.module.scss';
import {useState} from 'react';
import Spinner from '@components/loading/Spinner';
import Button from '@components/buttons/Button';

interface Props {
    src: string,
    callback?: (blob: any) => Promise<void>;
    onDelete?: () => Promise<void>;
}

const File = ({src, callback, onDelete}: Props) => {

    const [loading, setLoading] = useState(false);

    const [preview, setPreview] = useState<string>(src);
    
    const onChangeFile = async (e: any): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        const file = e.target.files ? e.target.files : e.dataTransfer.files;
        const objectUrl = URL.createObjectURL(file[0]);
        setPreview(objectUrl);
        if(callback) await callback(file[0]);
        setLoading(false)
    };

    const onRemoveFile = async () => {
        setLoading(true);
        setPreview("");
        if(onDelete) await onDelete();
        setLoading(false)
    };

    return (
        <div className={styles.container}>

            {!preview 
                ?
                    <div className={styles.upload} onDragOver={(e) => e.preventDefault()} onDrop={onChangeFile}>
                        <label htmlFor="myfile">Upload images <br/> or <br/> drag and drop</label>
                        <input type="file" id="myfile" accept='image/*' className={styles.inputFile} onChange={onChangeFile}/>
                    </div>
                :
                <div className={styles.preview}>
                    {loading 
                        ? 
                            <Spinner size={20} center />
                        :
                        <div>
                            <img src={preview} alt="preview"/>
                            <Button label1="Replace Image" onClick={onRemoveFile} color="red" />
                        </div> 
                    }
                </div>
            }

        </div>
    )
}

export default File