import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS, GET_USER_BY_ID } from './query/user';
import './App.css';
import { CREATE_USER } from './mutations/user';

const App = () => {
    const { loading, data, error, refetch } = useQuery(
        GET_ALL_USERS
        // { pollInterval: 500 }
    );

    // const {
    //     loading: loadingUser,
    //     data: dataUser,
    //     error: errorUser,
    //     refetch: refetchUser,
    // } = useQuery(GET_USER_BY_ID, { variables: { id: 1 } });

    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [age, setAge] = useState(0);

    const [newUser] = useMutation(CREATE_USER);

    useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers);
        }
    }, [data, loading]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Data Loading Error</h1>;
    }

    const addUser = (e) => {
        e.preventDefault();
        newUser({
            variables: {
                input: {
                    username,
                    age,
                },
            },
        }).then(({ data }) => {
            setUsername('');
            setAge(0);
        });
    };

    const getAll = (e) => {
        e.preventDefault();
        refetch();
    };

    return (
        <div>
            <form>
                <div className={'inputContainer'}>
                    <label className={'label'} htmlFor="usernameInput">
                        Username:
                    </label>
                    <input
                        id={'usernameInput'}
                        type={'text'}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={'inputContainer'}>
                    <label className={'label'} htmlFor="ageInput">
                        Age:
                    </label>
                    <input
                        id={'ageInput'}
                        type={'number'}
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                    />
                </div>
                <div className={'buttonsContainer'}>
                    <button onClick={(e) => addUser(e)}>Create user</button>
                    <button onClick={(e) => getAll(e)}>Get users</button>
                </div>
            </form>
            {users.map((user) => {
                return (
                    <div key={user.id} className={'user'}>
                        {user.id}. {user.username} {user.age}
                    </div>
                );
            })}
        </div>
    );
};

export default App;
