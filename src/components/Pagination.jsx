import { useEffect, useRef } from "react"

function Pagination({page,nextPage,prevpage,onFirstPage,last_page,onLastPage}) {

    const next_page_ref = useRef()
    const prev_page_ref = useRef()
    const first_page_ref = useRef()
    const last_page_ref = useRef()

    useEffect(()=>{
        if(page === 0){
            prev_page_ref.current.hidden = true
            first_page_ref.current.hidden = true
        }else{
            prev_page_ref.current.hidden = false
            first_page_ref.current.hidden = false
        }
    },[page])

    useEffect(()=>{
        if(page === 1560){
            next_page_ref.current.hidden = true
            last_page_ref.current.hidden = true
        }else{
            last_page_ref.current.hidden = false
            next_page_ref.current.hidden = false
        }
    },[page])



    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" ref={prev_page_ref} onClick={prevpage} href="" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li className="page-item"><a ref={first_page_ref} onClick={onFirstPage} className="page-link" href="">0</a></li>
                    <li className="page-item"><a className="page-link bg-warning border border-dark" >{Math.floor(page/20)}</a></li>
                    <li className="page-item"><a  ref={last_page_ref} onClick={onLastPage} className="page-link" href="#">{last_page}</a></li>
                    <li className="page-item">
                        <a className="page-link" ref={next_page_ref} onClick={nextPage} href="" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>

        </>
    )

} export default Pagination