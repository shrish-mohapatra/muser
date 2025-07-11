import { useState, useEffect, useRef } from 'react';

export function ChatWindow() {
    const [messages, setMessages] = useState([
        {
            id: 0,
            text: "welcome to muser, a new vibe coding music platform to generate music. Chat to get started.",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        // Add placeholder response
        // FIXME: jae replace this with real LLM call
        const botMessage = {
            id: Date.now() + 1,
            text: "nah im good",
            sender: 'bot',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage, botMessage]);
        setInputValue('');
    };

    return (
        <div className="mt-6 flex flex-col h-full">
            {/* Chat Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'user'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                                }`}
                        >
                            <p className="text-sm">{message.text}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSubmit} className="mt-6 flex-shrink-0">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Generate lofi beats mixed with a bit of jazz..."
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        disabled={!inputValue.trim()}
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}
