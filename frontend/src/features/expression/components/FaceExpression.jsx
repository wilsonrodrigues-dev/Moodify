import { useEffect, useRef, useState } from "react";
import { detect,init } from "../utils/util";
import "./faceExpression.scss"


export default function FaceExpression({onClick=()=>{}}) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [ expression, setExpression ] = useState("Detecting...");

    useEffect(() => {
        init({landmarkerRef,videoRef,streamRef});

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick() {
       const expression =detect({landmarkerRef,videoRef,setExpression})
       onClick(expression)

    }

return (
    <div className="face-card">

        <div className="face-card__camera">
            <video
                ref={videoRef}
                className="face-card__video"
                playsInline
            />
        </div>

        <div className="face-card__result">
            <span className="face-card__label">Detected Mood</span>
            <h2 className="face-card__expression">{expression}</h2>
        </div>

        <button
            className="face-card__btn"
            onClick={handleClick}
        >
            Detect Expression
        </button>

    </div>
);
}