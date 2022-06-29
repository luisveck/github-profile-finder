import React, {useEffect, useState} from 'react';
import '../assets/css/user.scss';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'; 
import axios from '../axios';

const Details = () => {

    const { login } = useParams();

    const [userDetails, setUserDetails] = useState({});
    //const [userRepos, setUserRepos] = useState({});

    useEffect( () => {
        const fetchUserInfo = async () => {
            try {
                const response = await Promise.all([
                    axios.get(`/users/${login}`),
                    //axios.get(`/users/${login}/repos`),
                ]);
                setUserDetails(response[0].data);
                //setUserRepos(response[1].data);
                //console.log(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserInfo();
    });

    return (
        <div className="profile-container">
            <Link to={"/"} className="back-button">
                Back
            </Link>
            <div className="details-user">
                <div className="user-image">
                <img src={userDetails?.avatar_url} alt={userDetails?.login}/>
                </div>
                <div className="user-content">
                    <h3>{userDetails?.login}</h3>
                    <p>{userDetails?.bio}</p>
                    <div className="user-data">
                        <div className="user-item">
                            <FontAwesomeIcon icon={faUserGroup}/> 
                            {userDetails?.followers} Followers · {userDetails?.following} Following 
                        </div>

                        <div className="user-item">
                            <FontAwesomeIcon icon={faLocationDot} /> {userDetails?.location}
                        </div>

                        <div className="user-item">
                            <a href={`https://twitter.com/`+userDetails?.twitter_username} target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href={userDetails?.html_url} target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faGithub} />
                            </a>     
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}


export default Details;