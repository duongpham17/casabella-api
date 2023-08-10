import styles from './Find.module.scss';
import { useAppSelector } from '@redux/hooks/useRedux';

const FindContainer = () => {
    
    const {prices} = useAppSelector(state => state.admin);

    return (
        <div className={styles.container}>
            {prices?.map((el, index) => 
                <a key={el._id} href={`#${el.title}`}>
                    <span>{index+1}. {el.title} ( {el.subsets.length} )</span>
                    {el.subsets.map((s, i) => 
                        <small key={s.id}>{i+1}. {s.title}</small>    
                    )}
                </a>    
            )}
        </div>
    )
}

export default FindContainer