import { useEffect, useState } from "react"

export function useMarvelApi(URL) {
    const [DATA, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const req = await fetch(URL)
            const req_json = await req.json()
            setData(req_json.data.results)
        }
        fetchData()
    }, [URL])
    return { DATA}


}