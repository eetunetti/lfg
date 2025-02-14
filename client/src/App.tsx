import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Panel from './components/panel'

interface MessageResponse {
  message: string;
}

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetch("/api/message")
      .then((res) => res.json())
      .then((data: MessageResponse) => setMessage(data.message));
  }, []);

  return (
    <>
        <Panel panelColor='text-red-500'></Panel>
        <p>message: {message}</p>
    </>
  )
}

export default App
