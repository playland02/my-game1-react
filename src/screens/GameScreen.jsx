import { useEffect, useState ,useRef} from "react"
import { useRemoveParenteses } from "../hooks/useRemoveParenteses"

function GameScreen({ username, character,nextLevel,endGame}) {

    const [response, setResponse] = useState([])
    const [score,setScore] = useState(0)
    const [attempt,setAttempt] = useState(0)
    
    const submit_ref = useRef()

    useEffect(()=>{
        if(response.length < 4){
            
            submit_ref.current.disabled = true
        }else{
            submit_ref.current.disabled = false
        }
    })



    useEffect(()=>{
        if(attempt === 4){
            endGame()
        }
    })


    function clickSubmit(event) {
        event.preventDefault()
        let answer = useRemoveParenteses(character.name)
        console.log(answer)
       if(response.length > 3){
            if(answer.localeCompare(response)=== 0){
                setScore(score + 1)
                setAttempt(0)
                nextLevel()
                
                
            }else{
                setAttempt(attempt + 1)
            }
       }
       
    }

    return (
        <>
            <div className="container">
                <div className="card">
                    <p className="card-title border bg-dark text-white">What is the animated character</p>
                    <div className="row">
                        <div className="col">Score:{score}</div>
                        <div className="col">Name: <span className="text-warning">{username}</span></div>

                    </div>
                    <div className="card-body bg-dark text-white">
                        <div className="card-title row">
                            <span className="col">Attempts:{attempt}</span>
                           
                        </div>
                        <div className="container">
                            <div className="container-fluid flex border ">
                                <img src={character.thumbnail.path + '.jpg'} className="w-25" alt="" />
                            </div>

                            <div className="container-fluid bg-">
                                <form onSubmit={clickSubmit} >
                                    <label >
                                        <input onChange={(e)=>(setResponse(e.target.value))} type="text" name="" id="" placeholder="Response" />
                                    </label>
                                    <input className="btn btn-warning" type="submit" value="Submit" ref={submit_ref} />
                                </form>

                            </div>
                        </div>




                    </div>
                </div>
            </div>
        </>
    )
} export default GameScreen