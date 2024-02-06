import './Comment.css'
import comment from '../Assets/comment';
import { useRef } from 'react';

function Comment() {

const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };
    
  return (
    <>
        <div className='comments'>
            <div className='post-cmt'>

                <form className='cmt-box'>
                    <div className='user'>
                        <div className='user-img'><img src='../image/banner/banner_10.png' /></div>
                        <div className='name'>Phước</div>
                    </div>
                    <input className='cmt' placeholder='Write a comment ...' ref={inputRef}></input>
                    <button className='cmt-submit'>Comment</button>
                </form>

                <div className='cmt-list'>
                {
                    comment.map((item)=>{
                        if(item.parent_id === null){
                            return(
                                <>
                                    <div className='flex'>
                                        <div className='user'>
                                            <div className='user-img'><img src='../image/banner/banner_12.png' /></div>
                                            <div className='user-meta'>
                                                <div className='name'>{item.user_name}</div>
                                                <div className='day'>10 day ago</div>
                                            </div>
                                        </div>
                                        <div className='reply' onClick={handleClick}>Reply</div>
                                    </div>
                                    <div className='cmt'>{item.content}</div>
                                    
                                    {
                                        comment.map((i)=>{
                                            if(item.id === i.parent_id){
                                                return(
                                                    <div className='cmt-reply'>
                                                        <div className='flex'>
                                                            <div className='user'>
                                                                <div className='user-img'><img src='../image/banner/banner_10.png' /></div>
                                                                <div className='user-meta'>
                                                                    <div className='name'>{i.user_name} - <span className='name-reply'>{item.user_name}</span></div>
                                                                    <div className='day'>10 day ago</div>
                                                                </div>
                                                            </div>
                                                            <div className='reply' onClick={handleClick}>Reply</div>
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
                }
                </div>
            </div>
        </div>
    </>
  );
}

export default Comment;
