import { useState, useCallback, useEffect } from 'react'
import md5 from 'blueimp-md5/js/md5'
//API


//screens
import StartScreen from './screens/StartScreen'
import GameScreen from './screens/GameScreen'
import EndScreen from './screens/EndScreen'
import LoadScreen from './screens/LoadScreen'

//css
import './App.css'
import SeeScreen from './screens/SeeScreen'


const SCREENS = [
  { id: 0, name: 'start' },
  { id: 1, name: 'game' },
  { id: 2, name: 'end' },
  { id: 3, name: 'load' },
  {id:4, name:'see'}
]
//config da url API MARVEL
const TIMERSTAMP = Math.floor(Date.now() / 1000);
const PUBLIC_KEY = '14200177d4cdd77e938f6608b6dbfe19'
const PRIVATE_KEY = 'ab6da36ed8d563afa72c92407576f19788c7fa2c'
const MD5_KEY = md5(TIMERSTAMP + PRIVATE_KEY + PUBLIC_KEY)
const off_random = Math.floor(Math.random() * 1563)
const URL = `https://gateway.marvel.com/v1/public/characters?offset=${off_random}&limit=50&ts=${TIMERSTAMP}&apikey=${PUBLIC_KEY}&hash=${MD5_KEY}`

function App() {
  const [screen, setScreen] = useState(SCREENS[0].name)
  const [username, setUsername] = useState()
  const [data, setData] = useState([])
  const [character, setCharacter] = useState()
  const [load,setLoad] = useState(false)


  function randomChar() {
    const char_random = Math.floor(Math.random() * 50)
    return char_random

  }



  useEffect(() => {
    async function fetchData() {
      const res = await fetch(URL)
      const data_res = await res.json()
      setData(data_res.data.results)
    }
    fetchData()

  }, [])

  useEffect(() => {
    if (data.length === 0) {
      setLoad(false)
    }else{
      setLoad(true)
    }
  })

  function seeTheChar(e){
    e.preventDefault()
    setScreen(SCREENS[4].name)
  }


  function startGame(e) {
    e.preventDefault()
    if(load){
      setCharacter(data[randomChar()])
      setScreen(SCREENS[1].name)
    }
  }


  function endGame(){
    setScreen(SCREENS[2].name)
  }

  function handleUsername(e) {
    setUsername(e.target.value)
    
  }


  function nextLevel(){
    const data_prev = character
    const data_new = data[randomChar()]
 
    if(data_prev !== data_new){
      setCharacter(data_new)
    }

  }
  return (
    <>
      <div className='App'>
        {screen === 'start' && <StartScreen seeTheChar={seeTheChar} load={load} startGame={startGame} handleUsername={handleUsername} />}
        {screen === 'game' && <GameScreen 
          endGame={endGame}
          username={username} character={character} nextLevel={nextLevel}/>}
        {screen === 'end' && <EndScreen />}
        {screen === 'see'&& <SeeScreen />}
        
  

      </div>

    </>
  )
} export default App


