import { React, useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Input,
  Button,
  Badge,
  HStack,
} from '@chakra-ui/react';
import axios from "axios";

export default function App() {
  const [user, setUser] = useState('');
  const handleChange = event => setUser(event.target.value);
  const handleSubmit = event => {
    event.preventDefault();
    //alert(`Username: ${user}`);
  };

  const [online, setOnline] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState('');
  const [send, setSend] = useState(false);
  const handleMessage = event => setMessage(event.target.value);
  const handleReceiver = event => setReceiver(event.target.value);
  const handleSend = event => {
    event.preventDefault();
    //alert(`Message: ${message}\nTo: ${receiver}`);
  }


  useEffect(() => {
    if (send) {
      console.log(`${user} => ${receiver} : ${message}`);
      axios.post("http://localhost:27017/nariel", {
        sender: user,
        receiver: receiver,
        message: message,
      });
      
      setMessage("");
      setSend(false);
    }
  }, [send]);

  function Inbox() {
    axios
      .get("http://localhost:27017/nariel", {
        receiver: receiver,
      })
      .then((res) => {
        setMessages(res.data);
        console.log(messages)
      });
      messages.forEach(function(item, index) {
          <Receiver 
            user={item.receiver}
            message={item.message}/>
      })
  }

  useEffect(() => {
    if (online) {
      localStorage.setItem("name", JSON.stringify(user));
      setInterval(Inbox, 1000);
      Inbox();
    } else {
      localStorage.removeItem("name");
    }
  }, [online]);

  

  return (
      <Box m='-10'>
      <Box w='100vw' bg='#00c04b' >
        <Text fontSize='40px' fontWeight='bold' fontFamily='sans-serif' m='0px' pl='10px'>
          NARIEL
        </Text>
      </Box>
      {!online && (
        <Box display='flex' justifyContent='center' bg='transparent' pt='20%'>
          <Box p='10px' bg='teal' borderRadius='5px'>
            <Text fontSize='30px' fontWeight='bold' fontFamily='sans-serif'>
              Log into Nariel
            </Text>
            <form onSubmit={handleSubmit}>
              <Input
                placeholder='username'
                w='300px'
                h='30px'
                onChange={handleChange}
              />
              <Button
                type='submit'
                mx='5px'
                h='30px'
                bg='teal'
                onClick={() => setOnline(true)}
              >
                Log In
              </Button>
            </form>
          </Box>
        </Box>
      )}
      {online && (
        <Box>
        <Box bg='#e6e6fa'  display='flex' justifyContent='space-between'>
        <Box w='100vw' display='flex'>
            <Text m='0px' fontSize='15px' fontWeight='bold' fontFamily='sans-serif' pl='10px' py='5px'>
              {user}
            </Text>
            <Text bg='black' borderRadius='5px' my='2px' ml='5px' fontSize='13px' fontWeight='bold' fontFamily='sans-serif' px='5px' py='5px' color='#39ff14'>
              online
            </Text>
        </Box>
        <Button
            type='submit'
            mx='5px'
            h='30px'
            bg='black'
            color='#39ff14'
            onClick={() => setOnline(false)}
            >
            Log Out
        </Button>
        </Box>
        <Box display='flex' borderWidth='100px' borderColor='#00c04b' w='100vw' h='90vh'>
          <Inbox />
        <Box position='absolute' bottom='0' w='100vw' bg='#e6e6fa' display='flex' justifyContent='space-around' p='5px'>
        <form onSubmit={handleSend}>
              <Input
                placeholder='To'
                w='10vw'
                h='30px'
                onChange={handleReceiver}
              />
              <Input
                placeholder='Message'
                w='80vw'
                h='30px'
                onChange={handleMessage}
              />
              <Button
                type='submit'
                mx='5px'
                h='30px'
                bg='teal'
                onClick={() => setSend(true)}
              >
                Send
              </Button>
            </form>
          </Box>
        </Box>
        </Box>
      )}
    </Box>
  );

  

  const Sender = props => {
    return (
      <Box display='block' bg='orange'><Text m='5px' p='5px'>{props.user} : {props.message}</Text></Box>
    );
  }

  const Receiver = props => {
    return (
      <Box display='block' bg='#04d9ff'><Text m='5px' p='5px'>{props.user} : {props.message}</Text></Box>
    );
  }
}


