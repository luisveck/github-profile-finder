import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/css/user.scss';

const User = ({ user }) => {

    const { avatar_url, login, id, name } = user;

    return (
        <div className="user-box">
            <div className="profile-picture">
                <img src={avatar_url} alt={login} />
            </div>
            <div className="user-info">
                <p>{name}</p>
                <p>{login}</p>
                <p>ID: {id}</p>
                <p><Link className="btn-profile" to={`/user/${login}`}>View profile</Link></p>
            </div>
        </div>
    );
}


export default User;