
import { useState, useEffect } from 'react'
import '../../styles/profile.css'
// import '../../styles/Accounts.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Profile = () => {
    const { id }                        = useParams();
    const [ profile, setProfile ]       = useState(null);
    const [ videos, setVideos ]         = useState([]);
    const [foodPartner, setFoodPartner] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3000/food-partner/${id}`, { withCredentials: true })
            .then(response => {
                setFoodPartner(true);
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems)
            })
            .catch((e) => {
                setFoodPartner(false);
                console.error(e);
            })
    }, [ id ]);

    const logout = (e) => {
        e.preventDefault();
        document.cookie = "token=; path=/;"; //expires=Thu, 01 Jan 1970 00:00:00 UTC";
        navigate('/');
    };


    return (
        <main className="profile-page">
            <section className="profile-header">
                <div className="profile-meta">

                    <img className="profile-avatar" src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D" alt="" />

                    <div className="profile-info">
                        <h1 className="profile-pill profile-business" title="Business name">
                            {profile?.fullName}
                        </h1>
                        <p className="profile-pill profile-address" title="Address">
                            {profile?.address}
                        </p>
                    </div>

                </div>

                <div className="profile-stats" role="list" aria-label="Stats">
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label"> meals - {videos.length} </span>
                    </div>
                    {
                        foodPartner && ( <>
                            <Link className=" create-food" to={'/create-food'}> <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path></svg>
                            </Link>
                            <span className="logout" onClick={logout}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.2713 2 18.1757 3.57078 20.0002 5.99923L17.2909 5.99931C15.8807 4.75499 14.0285 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.029 20 15.8816 19.2446 17.2919 17.9998L20.0009 17.9998C18.1765 20.4288 15.2717 22 12 22ZM19 16V13H11V11H19V8L24 12L19 16Z"></path></svg>
                            </span>
                        </>)
                    }
                </div>



            </section>

            <hr className="profile-sep" />

            <section className="profile-grid" aria-label="Videos">
                {videos.map((v) => (
                    <div key={v._id} className="profile-grid-item">
                        {/* Placeholder tile; replace with <video> or <img> as needed */}
                        <video
                            className="profile-grid-video"
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            src={v.video} muted >
                        </video>
                    </div>
                ))}
            </section>
        </main>
    )
}

export default Profile
