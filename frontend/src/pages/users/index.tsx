import styles from './Users.module.scss';
import { useAppDispatch, useAppSelector } from '@redux/hooks/useRedux';
import useFetch from '@redux/hooks/useFetch';
import { IUser } from '@redux/types/user';
import Admin from '@redux/actions/admin';
import Alert from '@redux/actions/alert';

import useForm from '@hooks/useForm';
import {validation} from '@validations/empty'

import Search from '@components/search/Search';
import Container from '@components/container/Style1';
import Flex from '@components/flex/Flex';
import Button from '@components/buttons/Button';
import Loading from '@components/loading/Fish';

const Users = () => {

    const dispatch = useAppDispatch();

    const {users} = useAppSelector(state => state.admin);

    useFetch(dispatch(Admin.users), users);
    
    const initialState: IUser = {
        _id: "",
        email: "",
        role: "user",
        createdAt: new Date()
    };
    
    const {onSetValue, values, onSubmit, loading} = useForm(initialState, callback, validation);    

    async function callback(){
        await dispatch(Admin.users_update(values))
        dispatch(Alert.set("user updated", "green"));
    };

    return ( !users ? <Loading /> :
        <div className={styles.container}>

            <div className={styles.users}>
                <Search initialData={users} dataKey="email" placeholder='Search email'>
                    {(users) => 
                        users.map(el => 
                            <Container background='dark' key={el._id} onClick={() => onSetValue(el)} className={styles.element} margin pointer>
                                <Flex>
                                    <p>{el.email}</p>
                                    <p>{el.role}</p>
                                </Flex>
                            </Container>    
                        )
                    }
                </Search>
            </div>

            <div className={styles.edit}>
                {values.email &&
                    <form onSubmit={onSubmit}>
                    <p>{values.email}</p>

                        <div className={styles.roles}>
                            <button onClick={() => onSetValue({role: "admin"})} type="button" className={values.role === "admin" ? styles.selected : ""}>admin</button>
                            <button onClick={() => onSetValue({role: "user"})} type="button" className={values.role === "user" ? styles.selected : ""}>user</button>
                        </div>

                        <Button type="submit" label1="update" color="main" loading={loading} />
                    </form>
                }
            </div>

        </div>
    )
}


export default Users