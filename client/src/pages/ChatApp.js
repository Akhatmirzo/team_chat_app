import React from 'react'
import ChatNavbar from '../components/etc/ChatNavbar'
import ChatArea from '../components/etc/ChatArea'
import MsgForm from '../components/Forms/MsgForm'

export default function ChatApp() {
  return (
    <div className='w-full h-screen overflow-hidden text-white bg-[#333]'>
      <ChatNavbar />
      <ChatArea />
      <MsgForm />      
    </div>
  )
}
