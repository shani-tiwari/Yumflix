
import { useEffect, useState } from 'react'
import axios from 'axios';
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import {Helmet} from 'react-helmet'

const Home = () => {
    const [ videos, setVideos ] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://yumflix.onrender.com/food/videos", { withCredentials: true })
            .then(response => {
                setVideos(response.data.foodItmes);
            })
            .catch(() => { 
                if(videos.length === 0) {
                    navigate('/auth/user/register'); 
                    // navigate('/');
                };
            });
    }, []);

    async function likeVideo(item) {
        try {
            const response = await axios.post("https://yumflix.onrender.com/food/like", { foodId: item._id }, {withCredentials: true})
    
            if(response.data.like){
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
            }else{
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
            }
        } catch (error) {
            toast.error("only user's can like videos");
        }
        
    };

    async function saveVideo(item) {
        try {
            const response = await axios.post("https://yumflix.onrender.com/food/save", { foodId: item._id }, { withCredentials: true })
            
            if(response.data.save){
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v))
            }else{
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v))
            }  
        } catch (error) {
            toast.error("only user's can save videos");
        }
    }

    return (
        <>
         <Helmet>
      <title>Discover Delicious Food Videos & Top Food Partners | Yumflix</title>
      <meta
        name="description"
        content="Watch delicious food videos, like and save your favorites, and explore profiles of top food partners."
      />
      <meta name="keywords" content="food videos, save food videos, food partners, cooking, recipes" />
      <meta property="og:title" content="Discover Delicious Food Videos & Top Food Partners" />
      <meta property="og:description" content="Watch, like, save, and interact with your favorite food videos and partners." />
         </Helmet>
        <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="No videos available."
        />
        </>
    )
}

export default Home
