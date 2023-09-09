import styles from './Url.module.scss';
import {useState} from 'react';
import Spinner from '@components/loading/Spinner';
import { upload, remove } from '@thirdparty/nftstorage';
import Slidein from '@components/slidein';
import { BsTrash } from 'react-icons/bs';

const Url = ({button}: {button: any}) => {

    const [loading, setLoading] = useState(false);

    const local_value =  localStorage.getItem("urls");
    
    const local_value_parsaed = local_value ? JSON.parse(local_value) : [];

    const [images, setImages] = useState<string[]>(local_value_parsaed)

    const onChangeFile = async (e: any): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        const file = e.target.files ? e.target.files : e.dataTransfer.files;
        const {ipfs} = await upload(file[0]);
        const url = `https://${ipfs}.ipfs.nftstorage.link`;
        const newImages = [url, ...images]
        setImages(newImages);
        localStorage.setItem("urls", JSON.stringify(newImages));
        setLoading(false);
    };

    const onRemoveImage = async (url: string) => {
        setLoading(true);
        const cid = url.split("https://")[1].split(".")[0];
        await remove(cid);
        const removedImages = images.filter(el => el !== url)
        setImages(removedImages);
        localStorage.setItem("urls", JSON.stringify(removedImages));
        setLoading(false);
    };

    return (
        <Slidein icon={button}>
            <div className={styles.container}>
                <h2>Create image urls</h2>

                <div className={styles.upload} onDragOver={(e) => e.preventDefault()} onDrop={onChangeFile}>
                    <label htmlFor="myfile">Upload images <br/> or <br/> drag and drop</label>
                    <input type="file" id="myfile" accept='image/*' className={styles.inputFile} onChange={onChangeFile}/>
                </div>
                
                <div className={styles.preview}>
                    {loading 
                        ? 
                            <Spinner size={20} center />
                        :
                        <div className={styles.images}>
                            {images.map((el, index) => 
                                <div className={styles.image} key={index}>
                                    <button className={styles.deletebtn} onClick={() => onRemoveImage(el)}><BsTrash/></button>
                                    <img key={index} src={el} alt="preview"/> 
                                    <button onClick={() => navigator.clipboard.writeText(el)}>{el}</button>
                                </div>
                            )}
                        </div> 
                    }
                </div>

            </div>
        </Slidein>
    )
}

export default Url