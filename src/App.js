import { useState, useEffect } from 'react'
import './App.css'



export default function TaskManager(){

    const [boxWidth1, setBoxWidth1] = useState(0);
    const [boxWidth2, setBoxWidth2] = useState(0);
    const [boxWidth3, setBoxWidth3] = useState(0);
    const [boxWidth4, setBoxWidth4] = useState(0);
    const [Tasks, setTasks] = useState([]);
    const [HPQ, setHPQ] = useState([]);
    const [RPQ0, setRPQ0] = useState([]);
    const [RPQ1, setRPQ1] = useState([]);
    const [RPQ2, setRPQ2] = useState([]);
    const [s1,setS1] = useState(0)
    const [s2,setS2] = useState(0)
    const [s3,setS3] = useState(0)

    const addTask = () => {

        var randomNumber = Math.floor(Math.random() * (100 - 1) + 1)
        // var randomColor = color[Math.floor(Math.random()*color.length)];
        let randomColor = "";

        if (Math.ceil(Math.random() * 10) > 7) {
            randomColor = "red";
        } else {
            randomColor = "black";
        }

        const newTask = { color: randomColor, taskno: randomNumber };
        setTasks([...Tasks, newTask]);
    }
    const distributeTasks = () => {
        const temp = [...Tasks];
        if (Tasks.length === 0) {
            alert("No task to assign");
        } else {
            if (temp[0].color === "red") {
                setHPQ([...HPQ, temp[0]])
            } else {
                var i;
                if (s1 == 0 && s2 == 0 && s3 == 0) {
                    setRPQ0([...RPQ0, temp[0]])
                    setS1(s1+temp[0].taskno)
                } else if (s1 != 0 && s2 == 0 && s3 == 0) {
                    setRPQ1([...RPQ1, temp[0]])
                    setS2(s2+temp[0].taskno)
                } else if (s1 != 0 && s2 != 0 && s3 == 0) {
                    setRPQ2([...RPQ2, temp[0]])
                    setS3(s3+temp[0].taskno)
                } else if (s1 > s2 && s2 < s3) {
                    setRPQ1([...RPQ1, temp[0]])
                    setS2(s2+temp[0].taskno)
                } else if (s2 > s3 && s3 < s1) {
                    setRPQ2([...RPQ2, temp[0]])
                    setS3(s3+temp[0].taskno)
                } else {
                    setRPQ0([...RPQ0, temp[0]])
                    setS1(s1+temp[0].taskno)
                }
            }
            temp.shift();
            setTasks([...temp]);
        }

    }
    useEffect(() => {
        if (HPQ.length > 0 && boxWidth1 === 0) {
            setBoxWidth1(HPQ[0].taskno*2)
        }
        if (RPQ0.length > 0 && boxWidth2 === 0) {
            setBoxWidth2(RPQ0[0].taskno*2)
        }
        if (RPQ1.length > 0 && boxWidth3 === 0) {
            setBoxWidth3(RPQ1[0].taskno*2)
        }
        if (RPQ2.length > 0 && boxWidth4 === 0) {
            setBoxWidth4(RPQ2[0].taskno*2)
        }
    }, [HPQ, RPQ0, RPQ1, RPQ2]);

    useEffect(() => {
        if (boxWidth2<=0) {
            if (RPQ0.length > 0) {
                // console.log("boxwidth2: if")
                let temp = [...RPQ0]
                // s1.current -= temp[0].taskno
                temp.shift()
                setRPQ0(temp)
            }
        } else {
            // console.log("boxwidth2: else")
            const intervalId = setInterval(() => {
                setBoxWidth2(boxWidth2 - 2);
            }, 30);
            return () => clearInterval(intervalId);
        }

    }, [boxWidth2])

    useEffect(() => {

        if (boxWidth3<=0) {
            if (RPQ1.length > 0) {
                // console.log("boxwidth3: if")
                let temp = [...RPQ1]
                // s2.current -= temp[0].taskno
                temp.shift()
                setRPQ1(temp)
            }
        } else {
            // console.log("boxwidth3: else")
            const intervalId = setInterval(() => {
                setBoxWidth3(boxWidth3 - 2);
            }, 30);
            return () => clearInterval(intervalId);
        }

    }, [boxWidth3])

    useEffect(() => {

        if (boxWidth4<=0) {
            if (RPQ2.length > 0) {
                let temp = [...RPQ2]
                temp.shift()
                setRPQ2(temp)
            }
        } else {
            const intervalId = setInterval(() => {
                setBoxWidth4(boxWidth4 - 2);
            }, 30);
            return () => clearInterval(intervalId);
        }
    }, [boxWidth4])

    useEffect(() => {
        if (boxWidth1<=0) {
            let temp = [...HPQ]
            temp.shift()
            setHPQ(temp)
        } else {
            const intervalId = setInterval(() => {
                setBoxWidth1(boxWidth1 - 2);
            }, 30);
            return () => clearInterval(intervalId);
        }

    }, [boxWidth1])


    

    return (
        <div className='container'>
            <div className='task-generator'>
                <div className='btns'>
                    <button onClick={addTask}>Generate Random Task</button>
                    <button onClick={distributeTasks}>Assign Task</button>
                </div>
                <div>
                    <h1>Task List</h1>
                    <div>
                        {Tasks.map((tasks,index)=>(
                            <div key={index} className='taskbox' style={{backgroundColor:tasks.color}}>{tasks.taskno}</div>
                        ))}
                    </div>
                </div>
                
            </div>
            <div className='box-teams'>
                <div>
                    <h3>High Priority Queue</h3>
                    <h4>Task List</h4>
                    <Queue value={HPQ}></Queue>
                    <h5>Duration</h5>
                    <div className='duration-box' style={{width:`${boxWidth1}px`}}></div>
                </div>
                <div>
                    <h3>Regular Queue 1</h3>
                    <h4>Task List</h4>
                    <Queue value={RPQ0}></Queue>
                    <h5>Duration</h5>
                    <div className='duration-box' style={{width:`${boxWidth2}px`}}></div>
                </div>
                <div>
                    <h3>Regular Queue 2</h3>
                    <h4>Task List</h4>
                    <Queue value={RPQ1}></Queue>
                    <h5>Duration</h5>
                    <div className='duration-box' style={{width:`${boxWidth3}px`}}></div>
                </div>
                <div>
                    <h3>Regular Queue 3</h3>
                    <h4>Task List</h4>
                    <Queue value={RPQ2}></Queue>
                    <h5>Duration</h5>
                    <div className='duration-box' style={{width:`${boxWidth4}px`}}></div>
                </div>
            </div>
        </div>
    )
}

function Queue(props){
    return(
        <div className='Queue-fnc'>
            {props.value.map((tasks,index)=>(
                <div key={index} className='taskbox-queued' style={{backgroundColor:tasks.color}}>{tasks.taskno}</div>
            ))}
        </div>
    )
}