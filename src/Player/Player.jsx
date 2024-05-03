import { useRef, useEffect } from "react";
import styles from "../Player/Player.module.css";

// export default function Player({ source }) {
//   const playerRef = useRef();

//   const play = () => playerRef.current.play();

//   const pause = () => playerRef.current.pause();

//   return (
//     <div>
//       <video ref={playerRef} src={source}>
//         Sorry, your browser does not support embedded videos.
//       </video>
//       <div>
//         <button onClick={play}>Play</button>
//         <button onClick={pause}>Pause</button>
//       </div>
//     </div>
//   );
// }

export default function Player({ source }) {
  const playerRef = useRef();

  const play = () => {
    if (playerRef.current) {
      playerRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  };

  const pause = () => {
    if (playerRef.current) {
      playerRef.current.pause();
    }
  };

  // Use useEffect to log the video source when the component mounts (for debugging)
  useEffect(() => {
    console.log("Video source:", source);
  }, [source]);

  return (
    <div>
      <video ref={playerRef} src={source}>
        Sorry, your browser does not support embedded videos.
      </video>
      <div>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
      </div>
    </div>
  );
}
