import { createContext, useState } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/wilson/song/songs/Wingman_502pbd6Ft.mp3",
    posterUrl:
      "https://ik.imagekit.io/wilson/song/poster/Wingman_o81RmwhKj.jpeg",
    title: "Wingman",
    mood: "happy",
  });

  const [loading, setLoading] = useState(false)

  return(
    <SongContext.Provider value={{song,setSong,loading,setLoading}}>{children}</SongContext.Provider>
  )
};
