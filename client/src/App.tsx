import { useState, useEffect } from 'react'
import Panel from './components/panel'
import Button from './components/Button/button';
import NavigationBar from './components/NavigationBar/NavigationBar';

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
    <NavigationBar></NavigationBar>
        <Panel panelColor='text-red-500'></Panel>
        <Button onClick={() => console.log("Hello from Button")} size='small' type='primary' text='This is a button'></Button>
        <p>message: {message}</p>
    </>
  )
}

export default App
