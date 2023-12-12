import { useState, useEffect } from "react";
import { useMarvelApi } from "../API/useMarvelApi"
import { useRemoveParenteses } from "../hooks/useRemoveParenteses";

import md5 from 'blueimp-md5/js/md5'

//screens
import LoadScreen from './LoadScreen'

//components
import Pagination from "../components/Pagination";


function SeeScreen() {
    //REQUEST URL
    const TIMERSTAMP = Math.floor(Date.now() / 1000);
    const PUBLIC_KEY = '14200177d4cdd77e938f6608b6dbfe19'
    const PRIVATE_KEY = 'ab6da36ed8d563afa72c92407576f19788c7fa2c'
    const MD5_KEY = md5(TIMERSTAMP + PRIVATE_KEY + PUBLIC_KEY)

    const [page,setPage] = useState(0)
    const url = `https://gateway.marvel.com/v1/public/characters?offset=${page}&limit=20&ts=${TIMERSTAMP}&apikey=${PUBLIC_KEY}&hash=${MD5_KEY}`

    const { DATA } = useMarvelApi(url)
    const [load, setLoad] = useState(false)


    let total_page = Math.floor(1563/20)
    let last_page = total_page * 20


    
    function nextPage(e){
        e.preventDefault()
        if(page < total_page){
            
            setPage(page + 20)
        }
     
    }
    function prevPage(e){
        e.preventDefault()
        if(page > 0){
            setPage(page - 20)
        }
    }

    function onFirstPage(e){
        e.preventDefault()
        setPage(0)
    }
    function onLastPage(e){
        e.preventDefault()
        setPage(last_page)
    }
    


    useEffect(() => {
        if (DATA === 0) {
            setLoad(false)
        } else {
            setLoad(true)
        }
    })

    function clickBackMenu() {
        location.reload()
    }

    return (
        <>
            {load === false && <LoadScreen />}
            <div className="card container-fluid">
                <div className="card-header bg-dark text-warning">
                    See the character
                </div>
                <div className="card-body bg-dark text-danger">
                    <div className="card-title">Header</div>
                    <div className="card-text accordion">
                        <ul>{
                            DATA.map((data) => (

                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={'#colapse' + data.id} aria-expanded="true" aria-controls={'colapse' + data.id}>
                                            {useRemoveParenteses(data.name)}
                                         
                                        </button>
                                    </h2>
                                    <div id={'colapse' + data.id} className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <div className="container name"><span>{data.name}</span></div>
                                            <div className="container image">
                                                <img className="w-25" src={data.thumbnail.path + '.'+data.thumbnail.extension} alt="" /></div>
                                            <div className="container description">{data.description}</div>

                                        </div>
                                    </div>
                                </div>
                            ))
                        } </ul>

                        <Pagination last_page={total_page}onLastPage={onLastPage} page={page} onFirstPage={onFirstPage} nextPage={nextPage} prevpage={prevPage}/>
                    </div>
                    <a className="btn btn-warning" onClick={clickBackMenu}>Back main menu</a>
                </div>
            </div>

        </>
    )
} export default SeeScreen

