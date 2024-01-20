import './Comment.css'
import comment from '../Assets/comment';

function Comment() {
    
  return (
    <>
        <div className='comments'>
            <h1>Comment</h1>
            <form>
                <input placeholder='Name here'/>
                <input placeholder='Comment here'/>
                <button>Submit</button>
            </form>
            <div className='list-comment'>
                {
                    comment.map((item)=>{
                        if(item.parent_id === null){
                            return(
                                <>
                                    <div className='d-flex align-items-center comment'>
                                        <i class="fa-solid fa-user"></i>
                                        <div className='border border-dark ps-4 rounded-pill mb-2 content-comment'>
                                            <p className='fw-bold m-0'>{item.user_name}</p>
                                            <p>{item.content}</p>
                                        </div>
                                        <i class="fa-solid fa-reply"></i>
                                    </div>
                                    
                                    {
                                        comment.map((i)=>{
                                            if(item.id === i.parent_id){
                                                return(
                                                    <div className='ms-5 d-flex align-items-center comment'>
                                                        <i class="fa-solid fa-user"></i>
                                                        <div className='border border-dark ps-4 rounded-pill mb-2 content-comment'>
                                                            <p className='fw-bold m-0'>{i.user_name}</p>
                                                            <p><span className='text-primary'>{item.user_name} </span>{i.content}</p>
                                                        </div>
                                                         <i class="fa-solid fa-reply"></i>
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
    </>
  );
}

export default Comment;
