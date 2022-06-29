import React, { useState } from 'react';
import '../assets/css/main.scss';
import User from '../components/User';
import axios from '../axios';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {

    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [dataFollowers, setDataFollowers] = useState([]);
    const [dataLogin, setDataLogin] = useState([]);
    const handleUsernameInput = (e) => {
        const value = e.target.value;
        setUsername(value);
        
    }

    const fetchUserData = async ( users ) => {

        const userData = [];
        let dataFollow = [];
        let dataLogin = [];
        users.forEach( async user => { 
            const { data } = await axios.get(`/users/${user.login}`);
            userData.push(data);
            dataFollow = userData.map(user=> user.followers);
            dataLogin = userData.map(user=> user.login);
            setDataFollowers(dataFollow);
            setDataLogin(dataLogin);
        });
        return userData;
    }

    const fetchUsers = async () => {
        
        try {
            const { data } = await axios.get("/search/users?q=" + username + "&per_page=12");
            await fetchUserData(data.items)
            return data?.items;
        }
        catch (error) {
            setErrorMessage(error.message);
        }
        
        
    }
    
    const handleSearchUsers = async (e) => {
        
        e.preventDefault();

        if (username.length < 4 ) {
            setErrorMessage("The username must have at least 4 characters.");
        }
        else if (username  === "iseijasunow") {
            setErrorMessage("The username cannot be " + username)
        }
        else {
            setErrorMessage("");
            const items = await fetchUsers();
            setUsers(items);
            
        }
    }

    const data = {
        labels: dataLogin,
        datasets: [
          {
            label: '# of Followers',
            data: dataFollowers,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

    return (
        <div>
            <div className="navbar">
                <div className="container">
                    <div className="search-form">
                        <form>
                            <input 
                                value={username} 
                                onChange={handleUsernameInput} 
                                type="text" 
                                placeholder="Search Github User..." 
                            />
                            <button onClick={ handleSearchUsers } className="btn-search">Search</button>
                        </form>
                    </div>
                </div>  
            </div>
            <div className="container">
                <div className="results-container">
                    { errorMessage && <div className="error"> Error: {errorMessage} </div> }
                    <div className="chart-results"><Pie data={data} /></div>
                    <div className="search-results">
                        { users? users.map((user) => {
                            return <User user={user} key={user.id} />
                        }) : (<p>Nothing for display...</p>)}
                        
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Home;