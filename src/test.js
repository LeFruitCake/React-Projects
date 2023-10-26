import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './test.css';


function Test(){
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [uid,setUID] = useState();
    const [logged,setLogged] = useState(false);
    const [posts,setPosts] = useState([{}]);
    const [page,setPage] = useState(1);
    const [loader, setLoader] = useState(1)
    const [replyflag,setReplyflag] = useState(false);
    const [ireplyflag,setiReplyflag] = useState(false);
    useEffect(() => {
        axios.get(`http://hyeumine.com/forumGetPosts.php?page=${page}`)
      .then(response => {
          if (!(response.status===200 && response.statusText==="OK")) {
              throw new Error('Network response was not ok');
          }
          setPosts(response.data)
          console.log(posts)
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
    }, [page,loader]);
    const registerUser = ()=>{
        const postData = {
            username: username,
            password: password,
          };
          
          axios.post(`http://hyeumine.com/forumCreateUser.php`, postData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then((response) => {
                console.log(response.data)
                setUID(response.data.id)
            })
            .catch((error) => {
              console.error('Error creating post:', error);
            });
    }
    const verifyLogin = ()=>{
        if(!uid){
            alert("Account doesn't exist")
        }else{
            axios.get(`http://hyeumine.com/forumLogin.php`, {
                id:uid,
                username: username,
            }, {
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((response)=>{
                console.log(response.data)
                setLogged(true);
                console.log("Logged in");
            }).catch((error) => {
                console.error('Error getting user:', error);
            });
        }
    }

    const createPost = ()=>{
        axios.post(`http://hyeumine.com/forumNewPost.php`, {
            id: uid,
            post: document.getElementById("post-box").value
            }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                if (!(response.status===200 && response.statusText==="OK")) {
                    throw new Error('Network response was not ok');
                }
                console.log(response.data)
                setLoader(Math.random()*1000)
                post: document.getElementById("postni").value = ""
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    const deletePost = (postID)=>{
        axios.post(`http://hyeumine.com/forumDeletePost.php?id=${postID}`,{}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                if (!(response.status===200 && response.statusText==="OK")) {
                    throw new Error('Network response was not ok');
                }
                console.log(response.data)
                setLoader(Math.random()*1000)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    const toggleReplies = ()=>{
        if(!replyflag){
            setReplyflag(true);
        }else{
            setReplyflag(false);
        }
    }

    const replyPost = (postid)=>{
        axios.post(`http://hyeumine.com/forumReplyPost.php`, {
            user_id: uid,
            post_id: postid,
            reply: document.getElementById("reply-box-ni-"+postid).value
            }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                if (!(response.status===200 && response.statusText==="OK")) {
                    throw new Error('Network response was not ok');
                }
                console.log(response.data)
                setLoader(Math.random()*1000)
                document.getElementById("reply-box-ni-"+postid).value = ""
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    const deleteReply = (replyid)=>{
        axios.post(`http://hyeumine.com/forumDeleteReply.php?id=${replyid}`,{}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                if (!(response.status===200 && response.statusText==="OK")) {
                    throw new Error('Network response was not ok');
                }
                console.log(response.data)
                setLoader(Math.random()*1000)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    return (
        //website container
        <div className='container'>
            {!logged?
            <>
                <div className='login-box'>
                    
                    <br></br>
                    <div className='myform'>
                    <h2 style={{textAlign:'center'}}>Login</h2>
                        <h3>Username</h3>
                        <input style={{padding:'10px',borderRadius:'10px'}} type='text' onChange={(e)=>{setUsername(e.target.value)}}></input>
                        <h3>Password</h3>
                        <input style={{padding:'10px',borderRadius:'10px'}} type='password' onChange={(e)=>{setPassword(e.target.value)}}></input>
                        <div className='mybtns'>
                            <button onClick={registerUser}>Register</button>
                            <button onClick={verifyLogin}>Login</button>
                        </div>
                    </div>
                </div>
            </>://if username exists
            <>
                <div className='Forum-container'>
                    <h1 style={{color:'navy'}}>Welcome to the Forum!</h1>
                    <h1>{uid} - {username}</h1>
                    <button onClick={()=>(window.location.reload())} className='logout-btn' >Logout</button>
                </div>
                <div className='create-post'>
                        <h3>What's on your mind?</h3>
                        <input id='post-box' className='input-box' type='text' autoFocus></input>
                        <button id='post-btn' onClick={createPost}>Post</button>
                </div>
                <div className='sub-container'>
                    {posts.map((post,index)=>(
                        <div className='posts' key={index}>
                            <div id='posts-box'>
                                <div>
                                    <h1>{post.post}</h1>
                                    <h2>{post.user}</h2>
                                    <h3>{post.date}</h3>
                                </div>
                                {post.uid == uid?<div>
                                    <button id='delete-btn' onClick={()=>{deletePost(post.id)}}>Delete</button>
                                </div>:<></>}
                            </div>
                            <hr></hr>
                            <div id='comments'>
                                <div>
                                    <input className='reply-box' id={`reply-box-ni-`+post.id} type='text'></input><br></br>
                                    <button id='reply-btn' onClick={()=>{replyPost(post.id)}}>Reply</button>
                                </div>
                                {post.reply?
                                    <>
                                        <button id='view-replies-btn' onClick={toggleReplies}><h4>{post.reply.filter(replies => replies.reply.length > 0).length} replies</h4>{post.reply.filter(replies => replies.reply.length > 0).length >0?<h4>View replies</h4>:<></>}</button>
                                        {replyflag?
                                            <>
                                                {post.reply.filter(replies => replies.reply.length > 0).map((replies,index)=>(
                                                <div className='reply'>
                                                    {replies.reply.length>0?
                                                        <>
                                                        <div key={index} style={{display:'flex',alignItems:'center'}}>
                                                            <h2>{replies.user}&nbsp;&nbsp; </h2>
                                                            <h4 style={{marginTop:'25px',color:'navy'}}>commented:&nbsp;&nbsp;</h4>
                                                            <div style={{display:'flex',flexWrap:'wrap'}}>
                                                                <h2 style={{wordBreak:'break-all'}}>{replies.reply}</h2>
                                                            </div>
                                                        </div>
                                                        <div>{replies.uid == uid?<button id='delete-reply-btn' onClick={()=>{deleteReply(replies.id)}}>Delete</button>:<></>}</div>
                                                        </>:<></>   
                                                    }
                                                </div>
                                            ))}
                                            </>:<></>
                                        }
                                    </>:<>
                                        <h4>No replies</h4>
                                    </>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </>}
        </div>
    );
}

export default Test;

