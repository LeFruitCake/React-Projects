import './App.css'
import { useState } from 'react'
import axios from 'axios';


export default function App(){
    const [gamecode,setGameCode] = useState("");
    const [flag,setFlag] = useState(false);
    const [gamecard,setGameCard] = useState();
    const [token,setToken] = useState();

    const getCard =()=>{
        axios.post(`http://www.hyeumine.com/getcard.php?bcode=${gamecode}`).then(response=>{
            if(!(response.status===200 && response.statusText==="OK")){
                setFlag(false)
                
            }else if(response.data !== 0){
                console.log("gone here")
                setFlag(true);
                setGameCard(response.data.card)
                setToken(response.data.playcard_token)
            }else{
                alert("Game code not found")
            }
            
            
        })
        .catch(error => {
            console.error("Problem with get operation",error)
        });
    }

    const checkWin = ()=>{
        axios.get(`http://www.hyeumine.com/checkwin.php?playcard_token=${token}`).then(response=>{
            if(response.data === 1){
                alert("Congrats you win");
            }else{
                alert("Not yet")
            }
        })
    }

    

    return(
        <>
            {!flag?
                <div className="container">
                <div className="ui-container">
                    
                    <h3>Enter your game code here</h3>
                    
                    <input type='text' name='gamecard' onChange={(e)=>{setGameCode(e.target.value)}} placeholder='Game Code'></input>
                    <br></br>
                    <br/>
                    <button onClick={getCard}>Get Card</button>
                </div>
            </div>:<>
                <div className='second-container'>
                    <h1>Game Code: {gamecode}</h1>
                    <button className='btn-changecode' onClick={()=>{setFlag(false)}}>Change Code</button>
                    <a href={`http://www.hyeumine.com/bingodashboard.php?bcode=${gamecode}`} target='_blank'>Open Dashboard</a>
                    <div className='bingo-grid'>
                        <div className='bingo'>BINGO</div>
                        <div id='B1' className='bingo-box'>{gamecard.B[0]}</div>
                        <div id='I1' className='bingo-box'>{gamecard.I[0]}</div>
                        <div id='N1' className='bingo-box'>{gamecard.N[0]}</div>
                        <div id='G1' className='bingo-box'>{gamecard.G[0]}</div>
                        <div id='O1' className='bingo-box'>{gamecard.O[0]}</div>
                        <div id='B2' className='bingo-box'>{gamecard.B[1]}</div>
                        <div id='I2' className='bingo-box'>{gamecard.I[1]}</div>
                        <div id='N2' className='bingo-box'>{gamecard.N[1]}</div>
                        <div id='G2' className='bingo-box'>{gamecard.G[1]}</div>
                        <div id='O2' className='bingo-box'>{gamecard.O[1]}</div>
                        <div id='B3' className='bingo-box'>{gamecard.B[2]}</div>
                        <div id='I3' className='bingo-box'>{gamecard.I[2]}</div>
                        <div id='N3' className='bingo-box'>{gamecard.N[2]}</div>
                        <div id='G3' className='bingo-box'>{gamecard.G[2]}</div>
                        <div id='O3' className='bingo-box'>{gamecard.O[2]}</div>
                        <div id='B4' className='bingo-box'>{gamecard.B[3]}</div>
                        <div id='I4' className='bingo-box'>{gamecard.I[3]}</div>
                        <div id='N4' className='bingo-box'>{gamecard.N[3]}</div>
                        <div id='G4' className='bingo-box'>{gamecard.G[3]}</div>
                        <div id='O4' className='bingo-box'>{gamecard.O[3]}</div>
                        <div id='B5' className='bingo-box'>{gamecard.B[4]}</div>
                        <div id='I5' className='bingo-box'>{gamecard.I[4]}</div>
                        <div id='N5' className='bingo-box'>{gamecard.N[4]}</div>
                        <div id='G5' className='bingo-box'>{gamecard.G[4]}</div>
                        <div id='O5' className='bingo-box'>{gamecard.O[4]}</div>
                    </div>
                        
                    <button className='btn-changecode' onClick={checkWin}>Check Win</button>
                    <button style={{marginLeft:'380px'}} onClick={getCard}>New Card</button>
                </div>
            </>}
        </>
    )
}