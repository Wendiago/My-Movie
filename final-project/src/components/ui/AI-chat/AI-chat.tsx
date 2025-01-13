"use client";

import React, { useState, useEffect, useRef } from "react";
import { Bot, Send, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Avatar } from "../avatar";
import { Separator } from "../separator";
import { Input } from "../input";
import { useRouter } from "next/navigation";
import CustomImage from "../custom-image";
import { useSearchAI } from "@/api/search/search";
import { useSession } from "next-auth/react";

function AIChat() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([
    { type: "bot", content: "Hello, What do you want to find?" },
  ]);
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [isFirstTimeQuery, setFirstTimeQuery] = useState(false); //This is to prevent loading state because react query executes when the component first mounted
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const {
    data: aiData,
    isError: aiError,
    status: searchStatus,
    refetch,
  } = useSearchAI(query);

  useEffect(() => {
    if (searchStatus === "success" && !aiError) {
      if (aiData.route) {
        setMessages((prev) => [
          ...prev,
          { type: "bot", content: "Here's what I found for you" },
        ]);
        router.push(aiData.route);
      } else {
        setMessages((prev) => [
          ...prev,
          { type: "bot", content: "Sorry, I cannot find what you want" },
        ]);
      }
    } else if (searchStatus === "error") {
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: "Sorry, I cannot find what you want" },
      ]);
    }
  }, [aiData, aiError, searchStatus, router]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    setQuery(input.trim());
    setInput("");
    setFirstTimeQuery(true);
    refetch();
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Popover>
      <PopoverTrigger className="z-[99999] p-3 bg-emerald-600 fixed bottom-3 left-3 flex justify-center items-center rounded-full cursor-pointer">
        <Bot size={24} />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={5}
        alignOffset={32}
        className="w-[25vw] flex flex-col p-0"
      >
        <div className="w-full flex items-center justify-between px-4 py-3">
          <div className="flex gap-2 items-center">
            <Avatar className="flex justify-center items-center bg-emerald-600">
              <Bot />
            </Avatar>
            <p className="font-bold">AI Search Assistant</p>
          </div>
          <PopoverPrimitive.Close>
            <X />
          </PopoverPrimitive.Close>
        </div>
        <Separator />
        <div className="h-[60vh] rounded-md flex flex-col text-sm p-4 overflow-hidden overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-[80%] mb-4 flex items-center gap-2 ${
                message.type === "bot" ? "" : "self-end"
              }`}
            >
              {message.type === "bot" && (
                <div className="flex justify-center items-center bg-emerald-600 w-6 h-6 rounded-full">
                  <Bot size={16} />
                </div>
              )}
              <div className="rounded-full px-3 py-2 bg-secondary">
                {message.content}
              </div>
              {message.type === "user" && (
                <CustomImage
                  unoptimized
                  priority
                  src={
                    session?.user?.image && session?.user?.image != ""
                      ? session.user.image
                      : "/avatar.jpeg"
                  }
                  alt="user-avatar"
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full"
                />
              )}
            </div>
          ))}
          {searchStatus === "pending" && isFirstTimeQuery && (
            <div className="max-w-[80%] mb-4 flex items-center gap-2">
              <div className="flex justify-center items-center bg-emerald-600 w-6 h-6 rounded-full">
                <Bot size={16} />
              </div>
              <div className="animate-pulse rounded-full px-3 py-2 bg-secondary">
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="w-full px-2 flex items-center gap-2 py-4">
          <Input
            className="w-full rounded-full outline-none focus-visible:ring-offset-0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask me if you want to find anything..."
          />
          <Send
            className="cursor-pointer text-primary"
            onClick={handleSendMessage}
          />
        </div>
        <PopoverPrimitive.Arrow />
      </PopoverContent>
    </Popover>
  );
}

export default AIChat;
