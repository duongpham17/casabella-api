import styles from './Content.module.scss';
import { ContextPropsTypes } from './useContext';
import Table from './Table';
import Button from '@components/buttons/Button';
import Text from '@components/text/Style1';
import Flex from '@components/flex/Flex';

const Content = (props: ContextPropsTypes) => {

    const {
        index,
        editOptions,
        initialState,
        onSelectEdit,
        onAddItem,
        onGetSubsetsData,
        onEditSubsetPosition,
        onAddSubsets,
        onEditOptions
    } = props;

    return (
        <div className={styles.container}>
            <header><button onClick={() => onSelectEdit("title", initialState.title)}>Category {index+1}</button></header>

            {editOptions.set 
                ?        
                    <div className={styles.subsets}>
                        {initialState.subsets.map((s, index) => 
                            <div className={`${styles.element} ${editOptions.data?.id === s.id ? styles.subsetEditSelected : ""}`} key={index} onClick={() => onEditSubsetPosition(s)} onMouseEnter={onGetSubsetsData(s)}>
                                <Text name={`${index+1} Subset category`} value={s.title} />
                            </div>
                        )}
                    </div>
                :
                    <>
                        <div className={styles.mainTitle} onClick={() => onSelectEdit("title", initialState.title)}>
                            <button><Text name="Main Category" value={initialState.title} /> </button>
                        </div>

                        <div className={styles.subsets}>
                            {initialState.subsets.map((s, index) => 
                                <div className={styles.element} key={index} onClick={() => onSelectEdit("subsets", s)} onMouseEnter={onGetSubsetsData(s)}>
                                    <Text name="Subset Category" value={s.title} />
                                    <Table data={s} onSelectEdit={onSelectEdit}/>
                                    <button onClick={onAddItem(s)}>insert new price</button>
                                </div>
                            )}
                        </div>
                    </>
            }

            <Flex>
                {initialState.subsets.length >= 2 ? <Button label1={editOptions.set ? "done" : "edit"} color="black" onClick={onEditOptions} style={{width: "80px"}} /> : <div></div>}
                <Button label1="new subset" color="black" onClick={onAddSubsets} />
            </Flex>
        </div>
    )
}

export default Content