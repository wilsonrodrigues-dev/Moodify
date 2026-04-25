import { useContext } from "react";
import { getSong } from "../services/song.api";
import { SongContext } from "../song.context.jsx";

export const useSong=()=>{
    const context=useContext(SongContext)

    const {song,setSong,loading,setLoading}=context

    async function handleGetsong({mood}) {

        setLoading(true)
        const data=await getSong({mood})
        setSong(data.song)
        setLoading(false)
        
    }

    return ({loading,song,handleGetsong})
}