import styles from './Editing.module.scss';
import { ContextPropsTypes } from './useContext';
import { ReactNode } from 'react';
import { BsTrash } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

import Input from '@components/inputs/Input';
import Button from '@components/buttons/Button';
import Choice from '@components/inputs/Choice';
import Checkbox from '@components/inputs/Checkbox';
import Flex from '@components/flex/Flex';

const EditWrapper = ({onSubmit, onDelete, loading, children, message, setEditArea}: {onSubmit: any, onDelete: any, loading: boolean, children: ReactNode, message: string, setEditArea: CallableFunction}) => (
    <form onSubmit={onSubmit}>
        <div className={styles.actionsContainer}>
            <div className={`${styles.buttons} ${styles.other}`}>
                <Button type="button" onClick={() => setEditArea("")} label1={<MdClose/>} color="light" />
            </div>
            <div className={`${styles.buttons}`}>
                <Button type="submit" label1="update" color="main" loading={loading} />
            </div>
            <div className={`${styles.buttons} ${styles.delete}`}>
                <Button type="button" onClick={onDelete} label1={<BsTrash/>} color="light" />
                <p className={styles.message}>{message}</p>
            </div>
        </div>
        {children}
    </form>
)

const Editing = (props: ContextPropsTypes) => {

    const {
        loading,
        editSubsets, setEditSubsets, 
        editItem, setEditItem,
        editArea, 
        editTitle, setEditTitle,
        setEditArea,
        onUpdateTitle, 
        onDeleteCategory,
        onUpdateSubset,
        onDeleteSubset,
        onUpdateItem,
        onDeletePrice
    } = props;

    const onChangeEditSubsets = (e: React.ChangeEvent<HTMLInputElement>) => setEditSubsets({...editSubsets, [e.target.name] : e.target.value});

    const onChangeEditItem = (e: React.ChangeEvent<HTMLInputElement>) => setEditItem({...editItem, [e.target.name] : e.target.value});

    return (
        <div className={styles.container}>
            {editArea==="title" && 
                <EditWrapper onSubmit={onUpdateTitle} onDelete={onDeleteCategory} loading={loading} message="delete everything" setEditArea={setEditArea}>
                    <Input label1="Main Title" 
                    name="title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} 
                    />
                </EditWrapper>
            }

            {editArea==="subsets" && 
                <EditWrapper onSubmit={onUpdateSubset} onDelete={onDeleteSubset} loading={loading} message="remove subset" setEditArea={setEditArea}>
                    <Input label1="Subset Title" 
                        name="title" value={editSubsets.title} onChange={onChangeEditSubsets} 
                    />
                    <Choice label="Type of table" items={["price", "bulk"]}
                        value={editSubsets.type} onClick={(s: string) => setEditSubsets({...editSubsets, type: s})} 
                    />

                    { editSubsets.type === "bulk" && 
                        <Input label1="Bulk discount" 
                            name="bulk_discount" value={editSubsets.bulk_discount || ""} onChange={onChangeEditSubsets} 
                        />
                    }
                </EditWrapper>
            }


            {editArea==="items" && 
                <EditWrapper onSubmit={onUpdateItem} onDelete={onDeletePrice} loading={loading} message="remove price" setEditArea={setEditArea}>
                    <Input label1="Name" 
                        name="name" value={editItem.name} onChange={onChangeEditItem} 
                    />
                    <Flex>
                        <Input type="number" label1="£ Price" 
                            name="price" value={editItem.price || ""} onChange={onChangeEditItem} 
                        /> 
                        <Input type="number" label1="% Discount" 
                            name="discount" value={editItem.discount || ""} onChange={onChangeEditItem} 
                        />
                    </Flex>
                    { editSubsets.type !== "bulk" ? "" :
                        <Flex>
                            <Input type="number" label1="£ Bulk Price" 
                                name="bulk_price" value={editItem.bulk_price || ""} onChange={onChangeEditItem} 
                            />
                            <Checkbox label="Discount applied" value={editItem.bulk_discount ? "on" : "off"} selected={editItem.bulk_discount}
                                onClick={() => setEditItem({...editItem, bulk_discount: !editItem.bulk_discount})} 
                            />
                        </Flex>
                    }
                </EditWrapper>                           
            }
        </div>
  )
}

export default Editing