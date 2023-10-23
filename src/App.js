import React from 'react';
import './App.css';
import {Grid} from '@mui/material';
import { useState } from 'react';

export default function App(){
    var [counter,setCounter] = useState(0);
    const winningSequence = [6,4,1,2,8,3,7,5,0];
    const [colorControl,setColorControl] = useState([false,false,false,false,false,false,false,false,false]);
    const [sequence,setSequence] = useState([0,0,0,0,0,0,0,0,0]);
    const colors = ["aquamarine","blue","yellow","orange","red","green","purple","chartreuse","sienna"];
    const onEnter = (val) =>{
        document.getElementById("Box"+val).style.backgroundColor = colors[val];
    }
    const onExit = val =>{
        if(!colorControl[val]){
            document.getElementById("Box"+val).style.backgroundColor = "white";
        }
    }
    // const resetGame = () =>{

        
    // }
    const resetter = ()=>{
        setCounter(0);
        setSequence([0,0,0,0,0,0,0,0,0]);
        for(var i = 0;i<9;i++){
            document.getElementById("Box"+i).style.backgroundColor = "white";
        }
        setColorControl([false,false,false,false,false,false,false,false,false]);
    }
    const clickerHandler = val =>{
        if(counter>-1 && counter <9){
            document.getElementById("Box"+val).style.backgroundColor = colors[val];
            var tempcontrol =[...colorControl];
            tempcontrol[val] = true;
            setColorControl([...tempcontrol]);
            const temp = [...sequence];
            temp[counter]=val;
            setSequence([...temp]);
            if(counter<=8){
                console.log("ctr= "+counter);
                if(counter===8){
                    alert("Congratulations!");
                    setCounter(9);
                }else{
                    if(temp[counter]!==winningSequence[counter]){
                        resetter();
                    }else{
                        setCounter(counter+1);
                    }
                }
            }
        }
    }

    return (
        <Grid container sx={{margin:'0 auto',width:600}}>
            <Grid item xs={12}>
                <div style={{backgroundColor:colors[winningSequence[0]],width:'50px',height:'50px',border:'solid 1px black',display:'inline-block',marginLeft:'50px'}}></div>
                <div style={{backgroundColor:colors[winningSequence[1]],width:'50px',height:'50px',border:'solid 1px black',display:'inline-block'}}></div>
                <div style={{backgroundColor:colors[winningSequence[2]],width:'50px',height:'50px',border:'solid 1px black',display:'inline-block'}}></div>
                <div style={{backgroundColor:colors[winningSequence[3]],width:'50px',height:'50px',border:'solid 1px black',display:'inline-block'}}></div>
                <div style={{backgroundColor:colors[winningSequence[4]],width:'50px',height:'50px',border:'solid 1px black',display:'inline-block'}}></div>
                <div style={{backgroundColor:colors[winningSequence[5]],width:'50px',height:'50px',border:'solid 1px black',display:'inline-block'}}></div>
                <div style={{backgroundColor:colors[winningSequence[6]],width:'50px',height:'50px',border:'solid 1px black',display:'inline-block'}}></div>
                <div style={{backgroundColor:colors[winningSequence[7]],width:'50px',height:'50px',border:'solid 1px black',display:'inline-block'}}></div>
                <div style={{backgroundColor:colors[winningSequence[8]],width:'50px',height:'50px',border:'solid 1px black',display:'inline-block'}}></div>
            </Grid>
            <Grid item xs={4}><Colorbox id={0} whileHovered={()=>{onEnter(0)}} whileLeave={()=>{onExit(0)}} whileClicked = {()=>{clickerHandler(0)}} ></Colorbox></Grid>
            <Grid item xs={4}><Colorbox id={1} whileHovered={()=>{onEnter(1)}} whileLeave={()=>{onExit(1)}} whileClicked = {()=>{clickerHandler(1)}} ></Colorbox></Grid>
            <Grid item xs={4}><Colorbox id={2} whileHovered={()=>{onEnter(2)}} whileLeave={()=>{onExit(2)}} whileClicked = {()=>{clickerHandler(2)}} ></Colorbox></Grid>
            <Grid item xs={4}><Colorbox id={3} whileHovered={()=>{onEnter(3)}} whileLeave={()=>{onExit(3)}} whileClicked = {()=>{clickerHandler(3)}} ></Colorbox></Grid>
            <Grid item xs={4}><Colorbox id={4} whileHovered={()=>{onEnter(4)}} whileLeave={()=>{onExit(4)}} whileClicked = {()=>{clickerHandler(4)}} ></Colorbox></Grid>
            <Grid item xs={4}><Colorbox id={5} whileHovered={()=>{onEnter(5)}} whileLeave={()=>{onExit(5)}} whileClicked = {()=>{clickerHandler(5)}} ></Colorbox></Grid>
            <Grid item xs={4}><Colorbox id={6} whileHovered={()=>{onEnter(6)}} whileLeave={()=>{onExit(6)}} whileClicked = {()=>{clickerHandler(6)}} ></Colorbox></Grid>
            <Grid item xs={4}><Colorbox id={7} whileHovered={()=>{onEnter(7)}} whileLeave={()=>{onExit(7)}} whileClicked = {()=>{clickerHandler(7)}} ></Colorbox></Grid>
            <Grid item xs={4}><Colorbox id={8} whileHovered={()=>{onEnter(8)}} whileLeave={()=>{onExit(8)}} whileClicked = {()=>{clickerHandler(8)}} ></Colorbox></Grid>
            <Grid item xs={12}><button className='btn' onClick={resetter}> Reset Game</button></Grid>
        </Grid>
    );
}


function Colorbox(props){
    return (

        <div id = {"Box"+props.id} onMouseEnter={props.whileHovered} onMouseLeave={props.whileLeave} onClick={props.whileClicked} className='colorBox'></div>


    )
}
