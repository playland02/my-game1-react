import Button from 'react-bootstrap/Button'

import  useState  from 'react'
import LoadScreen from './LoadScreen'





function StartScreen({startGame,handleUsername,load,seeTheChar}) {

   

    return (
        <div>
             {load === false && <LoadScreen/>}
           
            <h2>What is the animated character</h2>
            <div>
                <form className='form_start' onSubmit={startGame}>
                    <div id='start_form_name'>
                        <label >Nome:
                            <input  onChange={handleUsername} type="text" placeholder="Fulano" />
                        </label>
                    </div>
                    <div >
                        <button className='btn btn-primary' type='submit'>Play</button>
                    </div>
                </form>
            </div>
           <a href="" onClick={seeTheChar}>See the characters</a>

        </div>
    )

} export default StartScreen