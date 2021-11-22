import React, { useState, useEffect } from 'react'
import { Container, Grid } from "semantic-ui-react";
import './App.css';
import LeftBar from './Features/Chat/LeftBar/LeftBar';
import ChatDetail from './Features/Chat/ChatDetail/ChatDetail';
import getChatData from './repository/chat/chatRepository';


function App() {
  const [chatData, setChatData] = useState([]);
  const [leftBarData, setLeftBarData] = useState([]);
  const [chatDetailData, setChatDetailData] = useState({});
  const [selectedIndex, setSelectedIndex] = useState('');

  const [searchedText, setsearchedText] = useState('');

  const createLeftBarData = (chatInputData) => {
    if (!chatInputData)
      chatInputData = chatData;
    let leftDataChanged = chatInputData.map(({ id, title, imageURL, orderId, latestMessageTimestamp, messageList }) => {
      return {
        id,
        title,
        imageURL,
        orderId,
        latestMessageTimestamp,
        messagePreview: messageList[messageList?.length - 1]?.message,
      }
    });
    return leftDataChanged;
  };

  const fetchChatData = async () => {
    const chatApiData = await getChatData();
    setChatData(chatApiData);
    console.dir(chatApiData);
  };

  useEffect(() => {
    fetchChatData();
  }, []);


 useEffect(()=>{
     if(selectedIndex)
     setChatDetailData(chatData.find((item)=>item.id===selectedIndex));
  },[selectedIndex])

  useEffect(() => {
    if (chatData?.length && searchedText ) {
      const filteredData = chatData.filter(
        (item) => item?.orderId?.includes(searchedText?.toUpperCase())
          || item?.title?.toUpperCase()?.includes(searchedText?.toUpperCase())
      );
      setLeftBarData(createLeftBarData(filteredData));
    } else {
      setLeftBarData(createLeftBarData());
    }
  }, [searchedText])

const addMessage=(index,msg)=>{
  const copiedData = [...chatData]

  copiedData.forEach((item)=>{
    if(index===item?.id)
    item.messageList.push({
      messageId: 'msg',
      message: msg,
      timestamp: new Date(),
      sender: 'USER',
      messageType: 'text'
      });
  })
  setChatData(copiedData)
}


  useEffect(() => {
    if (chatData.length) {
      setLeftBarData(createLeftBarData());
      // createChatDetailData();
    }

  }, [chatData]);

  return (
    <Container style={{ margin: 20 }}>
      <Grid>
        <Grid.Row>
          <LeftBar data={leftBarData} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} setsearchedText={setsearchedText}></LeftBar>
          {selectedIndex && (
            <ChatDetail data={chatDetailData} addMessage={addMessage}></ChatDetail>
          )}
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default App;
