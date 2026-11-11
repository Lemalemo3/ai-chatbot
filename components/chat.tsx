
'use client'

import { useChat, Message } from 'ai/react'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'

export interface ChatProps extends React.ComponentProps<'div'> {
  id?: string
  initialMessages?: Message[]
  session?: any
}

export function Chat({ id, initialMessages = [], session }: ChatProps) {
  const { messages, append, reload, stop, isLoading, input, setInput } = useChat({
    initialMessages,
    body: { id }
  })

  return (
    <div className="flex flex-col flex-1 h-full max-w-2xl px-4 mx-auto md:px-0">
      <div className="flex-1 overflow-y-auto pt-4 md:pt-10">
        {messages.length > 0 ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </div>
  )
}
