import './Comment.css'
import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { useUser } from '../UserContext';
import { theme } from 'antd';
function Comment(props) {
    const [comments, setComment] = useState([]);
    const { updateUser } = useUser();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { user } = useUser();

    useEffect(() => {
        const storedId = localStorage.getItem('id');
        const storedUsername = localStorage.getItem('fullname');
        updateUser({ fullname: storedUsername, id: storedId, token: localStorage.getItem('accessToken') });
        axiosClient.get("/Comments")
        .then(async (res) => {
            const commentsData = res.data;
            const userPromises = commentsData.map(item =>
                axiosClient.get(`/Users/${item.userId}`).then(res => res.data.fullName)
            );

            const userNames = await Promise.all(userPromises);

            const updatedComments = commentsData.map((item, index) => ({
                ...item,
                userName: userNames[index]
            }));

            setComment(updatedComments);
        });
    }, [user.id]);

    const getTime = () => {
        const currentDate = new Date();

        const day = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        const formattedTime = `${year}-${month+1}-${day}`;

        return formattedTime;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setComment((prevComments) => ({
            ...(prevComments || {}),
            [name]: type === 'select-one' ? e.target.selectedOptions[0].value : (type === 'checkbox' ? checked : value),
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const commentData = {
            content: comments.content,
            userId: user.id, 
            //date: getTime(), 
            clothesId: props.clothesId
        };
        console.log("in",commentData);
        axiosClient.post("/Comments", commentData)
                    .then(()=>{
                        window.location.reload();
                    })
    }

    return (
        <>
            <div className='comments'>
                <div className='post-cmt'>
                    <form className='cmt-box' onSubmit={handleSubmit}>
                        <div className='user'>
                            <div className='user-img'><img src='../image/banner/OIP.jpg' alt='user-avatar' /></div>
                            <div className='name'>{user.fullname}</div>
                        </div>
                        <input
                            type='text'
                            name='content'
                            className='cmt'
                            placeholder='Write a comment ...'
                            onChange={(e)=>handleChange(e)}
                        />
                        <button>Comment</button>
                    </form>
                    <div className='cmt-list'>
                        {
                            Array.isArray(comments) && (
                                comments.map((item) => {
                                    if (item.parentCommentId === null && item.clothesId===props.clothesId) {
                                        return (
                                            <>
                                                <div className='flex'>
                                                    <div className='user'>
                                                        <div className='user-img'><img src='../image/banner/OIP.jpg' /></div>
                                                        <div className='user-meta'>
                                                            <div className='name'>{item.userName}</div>
                                                            <div className='day'>{item.date}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='cmt'>{item.content}</div>
                                                {
                                                    comments.map((i) => {
                                                        if (item.id === i.parentCommentId) {
                                                            return (
                                                                <div className='cmt-reply'>
                                                                    <div className='flex'>
                                                                        <div className='user'>
                                                                            <div className='user-img'><img src='../image/banner/OIP.jpg' /></div>
                                                                            <div className='user-meta'>
                                                                                <div className='name'>{i.userId} - <span className='name-reply'>{item.userId}</span> - <p>Admin</p></div>
                                                                                <div className='day'>10 day ago</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='cmt'>{i.content}</div>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                }
                                            </>
                                        )
                                    }
                                })
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Comment;
