import styles from './Item.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@redux/hooks/useRedux';
import { IService } from '@redux/types/services';
import { upload, remove } from '@thirdparty/nftstorage';

import Services from '@redux/actions/services';
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

    const [preview, setPreview] = useState(false);

    const [more, setMore] = useState(false);

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

            <div className={styles.previewBtn}>
                <Button label1="Preview Layout" color='black' onClick={() => setPreview(!preview)} />
            </div>

            { !preview ?
                <div className={styles.nopreviewContainer}>
                    <div className={styles.left}>
                        <form onSubmit={onSubmit}>
                            <input className={styles.input1} name="text_1" value={values.text_1 || ""} onChange={onChange} placeholder="small" />

                            <textarea className={styles.input2} name="text_2" value={values.text_2 || ""} onChange={onChange} placeholder="header" />

                            <textarea className={styles.input3} name="text_3" value={values.text_3 || ""} onChange={onChange} placeholder="summary" />

                            <textarea className={styles.input4} name="text_4" value={values.text_4 || ""} onChange={onChange} placeholder="paragraph" />

                            <textarea className={styles.input5} name="text_5" value={values.text_5 || ""} onChange={onChange} placeholder="summary" />

                            <textarea className={styles.more} name="more" value={values.more || ""} onChange={onChange} placeholder="more information, <h1>header</h1>, <h2>bold</h2>, <p>paragraph</p>" />
                            
                            {edited && <Button type="submit" label1="Save" color='main' />}
                        </form>
                    </div>

                    <div className={styles.right}>
                        <File src={values.image} callback={onUploadImage} onDelete={onRemoveImage}/>
                    </div>
                </div>
            : 
                <div className={styles.previewContainer}>
                    <div className={styles.left}>
                        {values.text_1 && <p className={styles.input1}>{values.text_1}</p>}
                        
                        {values.text_2 && <h1 className={styles.input2}>{values.text_2}</h1>}

                        {values.text_3 && <p className={styles.input3}>{values.text_3}</p>}

                        {values.text_4 && <p className={styles.input4}> {values.text_4} </p>}

                        {values.text_5 && <p className={styles.input5}> {values.text_5} </p>}

                        <div className={styles.actions}>
                            <Link to="https://booking.casabellalondon.co.uk" rel="noopener noreferrer" target="_blank">Book now</Link>
                            <button onClick={() => setMore(!more)}>More</button>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div/>
                        <img src={values.image} alt="treatments"/>
                    </div>
                    {more && 
                        <div className={styles.more}>
                           {values.more.split("\n").map((el, index) => 
                                el.includes("<p>") ? 
                                    <p key={index}>{el.replaceAll("<p>", " ").replaceAll("</p>", " ")}</p>
                                : el.includes("<h1>") ?
                                    <h1 key={index}>{el.replaceAll("<h1>", " ").replaceAll("</h1>", " ")}</h1>
                                : el.includes("<h2>") ? 
                                    <h2 key={index}>{el.replaceAll("<h2>", " ").replaceAll("</h2>", " ")}</h2>
                                : el.includes("<h3>") ?
                                    <h3 key={index}>{el.replaceAll("<h3>", " ").replaceAll("</h3>", " ")}</h3>
                                : el.includes("<youtube>") ?
                                    <iframe key={index} width="100%" height="400" 
                                        src={el.replaceAll("<youtube>", " ").replaceAll("</youtube>", " ")} 
                                        title="YouTube video player" frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        allowFullScreen>
                                    </iframe>
                                : el.includes("<video>") ?
                                    <video key={index} controls muted>
                                        <source src={el.replaceAll("<video>", " ").replaceAll("</video>", " ")} type="video/mp4" />
                                    </video>
                                :  el.includes("<img>") ?
                                    <img key={index} src={el.replaceAll("<img>", " ").replaceAll("</img>", " ")} alt="item" />
                                : ""
                            )}
                        </div>
                    }
                </div>
                
            }

        </div>
    )
}

export default Item