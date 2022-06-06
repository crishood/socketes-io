import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "./App.css";
function App() {
  const ref = useRef();
  const [mes, setMes] = useState("cambialo");
  const [chat, setChat] = useState([]);
  const user = window.location.pathname.replace("/", "");

  useEffect(() => {
    ref.current = io("http://localhost:8000");

    ref.current.on("welcome", (data) => {
      console.log(data.message);
    });

    ref.current.on("broadcast", (data) => {
      console.log(data);
      setChat((chat) => [...chat, data]);
    });

    return () => {
      ref.current.close();
      ref.current.removeAllListeners();
    };
  }, []);

  const handleEmit = () => {
    const data = {
      message: mes,
      user: user,
    };
    ref.current.emit("message", data);
  };

  return (
    <div className="App">
      <form>
        <input
          type="text"
          value={mes}
          onChange={(e) => {
            setMes(e.target.value);
          }}
        />
        <button type="button" onClick={handleEmit}>
          Enviar
        </button>
      </form>
      {chat.map((item) => {
        return (
          <div>
            <p>{item.user}</p>
            <p>{item.message}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
