import {useHistory} from 'react-router-dom';

const UserSignOut = (props) => {
  const {setAuthUser} = props;
  const history = useHistory();

  const signOut = () => {
    setAuthUser(null);
    history.push('/');
  };
  
  signOut();
};

export default UserSignOut;