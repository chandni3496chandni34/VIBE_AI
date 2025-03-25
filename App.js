import './App.css';
import gptlogo from './assets/chatgpt.svg';
import addbtn from './assets/add-30.png';
import msgicon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendbtn from './assets/send.svg';
import usericon from './assets/user-icon.png';
import gptimg from './assets/chatgpt.svg';
import { sendMsgToOpenAi } from './assets/openai';
import{useEffect, useState,useRef} from 'react';
function App() {
  const msgEnd=useRef(null);
  const[input,setInput]=useState("");
  const [messages,setMessages]=useState([{
    text: "Hii am Vibe_AI ",
    isBot: true,

  }]);
  useEffect(()=>{
    msgEnd.current.scrollIntoView();

  },[messages])
  const handleSend=async ()=>{
    const text=input;
    setInput('');
    setMessages([
      ...messages,
      {text,isBot:false}
    ]);
    const res = await sendMsgToOpenAi(input)
    setMessages([
      ...messages,
      {text ,isBot:false},
      {text:res,isBot:true}
    ]);
    console.log(res);
  }
  const handleEnter=async(e)=>{
    if(e.key==="Enter")await handleSend();
  }
  const handleQuery=async(e)=>{
    const text=e.target.value;
  setMessages([
    ...messages,
    {text,isBot:false}
  ])};
  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperside">
          <div className="uppersideTop"><img src={gptlogo} alt="Logo" className="logo" /><span className='brand'>VibeAi</span></div>
          <button className="midBtn" onClick={()=>{window.location.reload()}}><img src={addbtn} alt="new chat" className="addBtn" />New Chat</button>
          <div className="upperSideBottom">
            <button className="query"onCLick={handleQuery} value="what is programming"><img src={msgicon} alt =" Query"/>What is programming ?</button>
            <button className="query"><img src={msgicon} alt ="Query"/>How to use api?</button>
      
          </div>
        </div>
        <div className="lowerside">
          <div className="listitems"><img src={home} alt="Home" className="listitemsimg" />Home</div>
          <div className="listitems"><img src={saved} alt="Saved" className="listitemsimg" />Saved</div>
          <div className="listitems"><img src={rocket} alt="Upgrade to pro" className="listitemsimg" />Upgrade to pro</div>

        </div>
      </div>
      < div className="main">
        <div className="chats">
          
          {messages.map((message,i)=>
              < div key={i} className={message.isBot?"chat bot":"chat"}>
                 <img className='chatimg'src={message.isBot?gptimg:usericon} alt="" /><p className="txt">{message.text}
                
                 </p>
              </div>
            
            )}
            <div ref={msgEnd}/>
          </div>
          
          <div className="chatfooter">
            <div className="inp">
              <input type="text" placeholder="send a message" value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/><button className='send' on onClick={handleSend}><img src={sendbtn} alt="sendbtn" /></button>
            </div>
            <p > ChatGpt may produce inaccurate </p>
            
        </div>
        

      </div>
    </div>
    
  );
}

export default App;
