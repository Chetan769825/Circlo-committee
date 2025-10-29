import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  FaPaperPlane,
  FaSmile,
  FaPaperclip,
  FaSearch,
  FaEllipsisV,
  FaArrowLeft,
  FaUsers,
  FaPhone,
  FaVideo,
  FaTrash,
  FaReply,
  FaCopy,
  FaDownload,
  FaImage,
  FaFile,
  FaTimes,
  FaCheck,
  FaCheckDouble,
} from "react-icons/fa";
import axios from "axios";

export default function CommitteeChat() {
  const location = useLocation();
  const navigate = useNavigate();
  const committeeData = location.state?.committeeData;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState("You");
  const [onlineMembers, setOnlineMembers] = useState([]);
  const [typing, setTyping] = useState([]);
  const [showAttachment, setShowAttachment] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Emojis list
  const emojis = [
    "😀", "😃", "😄", "😁", "😅", "😂", "🤣", "😊", "😇", "🙂",
    "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋",
    "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳",
    "👍", "👎", "👏", "🙌", "🤝", "💪", "🙏", "❤️", "💕", "💖",
    "✨", "🎉", "🎊", "🔥", "⭐", "✅", "❌", "💯", "👀", "💰"
  ];

  // Load messages from backend
  useEffect(() => {
    if (committeeData?.committeeID) {
      loadMessages();
      // Simulate online members
      setOnlineMembers(committeeData.members?.slice(0, 3) || []);
    }
  }, [committeeData]);

  const loadMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/committees/${committeeData.committeeID}/messages`
      );
      setMessages(response.data.data || []);
    } catch (error) {
      console.error("Error loading messages:", error);
      // Load demo messages if backend fails
      loadDemoMessages();
    }
  };

  const loadDemoMessages = () => {
    const demoMessages = [
      {
        id: "1",
        sender: committeeData?.chairperson || "John",
        text: "Welcome everyone to our committee chat! 🎉",
        timestamp: new Date(Date.now() - 3600000),
        status: "read",
        type: "text"
      },
      {
        id: "2",
        sender: committeeData?.members?.[0] || "Alice",
        text: "Thanks for creating this! Looking forward to working together.",
        timestamp: new Date(Date.now() - 3000000),
        status: "read",
        type: "text"
      },
      {
        id: "3",
        sender: "You",
        text: "Great to be part of this committee!",
        timestamp: new Date(Date.now() - 2400000),
        status: "delivered",
        type: "text"
      }
    ];
    setMessages(demoMessages);
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim() && !selectedFile) return;

    const messageData = {
      id: Date.now().toString(),
      sender: currentUser,
      text: newMessage,
      timestamp: new Date(),
      status: "sent",
      type: selectedFile ? "file" : "text",
      file: selectedFile ? {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type
      } : null,
      replyTo: replyingTo ? {
        sender: replyingTo.sender,
        text: replyingTo.text
      } : null
    };

    try {
      // Send to backend
      await axios.post(
        `http://localhost:3001/api/committees/${committeeData.committeeID}/messages`,
        messageData
      );

      setMessages([...messages, messageData]);
      setNewMessage("");
      setReplyingTo(null);
      setSelectedFile(null);
      setShowEmojiPicker(false);
    } catch (error) {
      console.error("Error sending message:", error);
      // Still add to local state if backend fails
      setMessages([...messages, messageData]);
      setNewMessage("");
      setReplyingTo(null);
      setSelectedFile(null);
    }
  };

  // Handle typing indicator
  const handleTyping = () => {
    // Simulate typing indicator (in real app, use WebSocket)
    const randomMember = committeeData?.members?.[Math.floor(Math.random() * committeeData.members.length)];
    if (randomMember && !typing.includes(randomMember)) {
      setTyping([...typing, randomMember]);
      setTimeout(() => {
        setTyping(typing.filter(m => m !== randomMember));
      }, 3000);
    }
  };

  // Delete message
  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await axios.delete(
        `http://localhost:3001/api/committees/${committeeData.committeeID}/messages/${messageId}`
      );
      setMessages(messages.filter(m => m.id !== messageId));
      setSelectedMessage(null);
    } catch (error) {
      console.error("Error deleting message:", error);
      setMessages(messages.filter(m => m.id !== messageId));
      setSelectedMessage(null);
    }
  };

  // Copy message
  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
    alert("Message copied to clipboard!");
    setSelectedMessage(null);
  };

  // Reply to message
  const handleReplyMessage = (message) => {
    setReplyingTo(message);
    setSelectedMessage(null);
  };

  // Handle file upload
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setShowAttachment(false);
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Filter messages by search
  const filteredMessages = messages.filter(msg =>
    msg.text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.sender?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Export chat
  const handleExportChat = () => {
    const chatText = messages.map(m => 
      `[${new Date(m.timestamp).toLocaleString()}] ${m.sender}: ${m.text}`
    ).join('\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${committeeData?.committeeName || 'committee'}_chat.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setShowMenu(false);
  };

  // Clear chat
  const handleClearChat = async () => {
    if (!window.confirm("Clear all messages? This cannot be undone.")) return;

    try {
      await axios.delete(
        `http://localhost:3001/api/committees/${committeeData.committeeID}/messages`
      );
      setMessages([]);
      setShowMenu(false);
    } catch (error) {
      console.error("Error clearing chat:", error);
      setMessages([]);
      setShowMenu(false);
    }
  };

  if (!committeeData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl mb-4">No committee data found!</p>
          <Link
            to="/create"
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500"
          >
            Create Committee
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white flex flex-col">
      {/* Header */}
      <header className="bg-zinc-800 border-b border-zinc-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard", { state: { committeeData } })}
              className="hover:bg-zinc-700 p-2 rounded-full"
            >
              <FaArrowLeft size={20} />
            </button>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-xl">
                  {committeeData.committeeName?.charAt(0).toUpperCase()}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-800"></div>
              </div>

              <div>
                <h1 className="text-lg font-bold">{committeeData.committeeName}</h1>
                <p className="text-xs text-zinc-400">
                  {onlineMembers.length} online • {committeeData.members?.length || 0} members
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="hover:bg-zinc-700 p-3 rounded-full transition"
            >
              <FaSearch size={18} />
            </button>

            <button className="hover:bg-zinc-700 p-3 rounded-full transition">
              <FaPhone size={18} />
            </button>

            <button className="hover:bg-zinc-700 p-3 rounded-full transition">
              <FaVideo size={18} />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="hover:bg-zinc-700 p-3 rounded-full transition"
              >
                <FaEllipsisV size={18} />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-zinc-800 rounded-lg shadow-xl border border-zinc-700 z-50">
                  <button
                    onClick={() => {
                      navigate("/dashboard", { state: { committeeData } });
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-zinc-700 flex items-center gap-3"
                  >
                    <FaUsers /> View Committee Info
                  </button>
                  <button
                    onClick={handleExportChat}
                    className="w-full text-left px-4 py-3 hover:bg-zinc-700 flex items-center gap-3"
                  >
                    <FaDownload /> Export Chat
                  </button>
                  <button
                    onClick={handleClearChat}
                    className="w-full text-left px-4 py-3 hover:bg-zinc-700 flex items-center gap-3 text-red-400"
                  >
                    <FaTrash /> Clear Chat
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="max-w-7xl mx-auto mt-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Online Members Bar */}
      <div className="bg-zinc-800 border-b border-zinc-700 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto">
          <span className="text-xs text-zinc-400 whitespace-nowrap">Online:</span>
          {onlineMembers.map((member, idx) => (
            <div key={idx} className="flex items-center gap-1 bg-zinc-700 px-3 py-1 rounded-full whitespace-nowrap">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs">{member}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23ffffff' fill-opacity='0.03'/%3E%3C/svg%3E')",
          backgroundSize: "30px 30px"
        }}
      >
        <div className="max-w-4xl mx-auto space-y-3">
          {filteredMessages.map((message) => {
            const isOwnMessage = message.sender === currentUser;

            return (
              <div
                key={message.id}
                className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} group`}
              >
                <div className={`flex gap-2 max-w-lg ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}>
                  {/* Avatar */}
                  {!isOwnMessage && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {message.sender?.charAt(0).toUpperCase()}
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div className="flex flex-col gap-1">
                    {!isOwnMessage && (
                      <span className="text-xs text-zinc-400 px-2">{message.sender}</span>
                    )}

                    <div
                      className={`relative px-4 py-2 rounded-2xl ${
                        isOwnMessage
                          ? "bg-yellow-500 text-black rounded-br-none"
                          : "bg-zinc-700 text-white rounded-bl-none"
                      }`}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setSelectedMessage(message);
                      }}
                    >
                      {/* Reply Preview */}
                      {message.replyTo && (
                        <div className={`mb-2 pb-2 border-b ${isOwnMessage ? "border-yellow-600" : "border-zinc-600"} text-xs`}>
                          <div className="font-semibold">{message.replyTo.sender}</div>
                          <div className={`${isOwnMessage ? "text-black/70" : "text-zinc-400"} truncate`}>
                            {message.replyTo.text}
                          </div>
                        </div>
                      )}

                      {/* File Preview */}
                      {message.type === "file" && message.file && (
                        <div className={`mb-2 p-2 rounded ${isOwnMessage ? "bg-yellow-600" : "bg-zinc-600"}`}>
                          <div className="flex items-center gap-2">
                            {message.file.type?.startsWith("image/") ? <FaImage /> : <FaFile />}
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold truncate">{message.file.name}</div>
                              <div className="text-xs opacity-70">
                                {(message.file.size / 1024).toFixed(1)} KB
                              </div>
                            </div>
                            <button className="hover:scale-110 transition">
                              <FaDownload size={14} />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Message Text */}
                      <p className="break-words whitespace-pre-wrap">{message.text}</p>

                      {/* Timestamp & Status */}
                      <div className={`flex items-center gap-1 justify-end mt-1 text-xs ${
                        isOwnMessage ? "text-black/60" : "text-zinc-400"
                      }`}>
                        <span>{formatTime(message.timestamp)}</span>
                        {isOwnMessage && (
                          <span>
                            {message.status === "sent" && <FaCheck size={12} />}
                            {message.status === "delivered" && <FaCheckDouble size={12} />}
                            {message.status === "read" && <FaCheckDouble size={12} className="text-blue-400" />}
                          </span>
                        )}
                      </div>

                      {/* Quick Actions (on hover) */}
                      <div className={`absolute top-0 ${isOwnMessage ? "left-0" : "right-0"} transform ${
                        isOwnMessage ? "-translate-x-full" : "translate-x-full"
                      } opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 px-2`}>
                        <button
                          onClick={() => handleReplyMessage(message)}
                          className="bg-zinc-600 hover:bg-zinc-500 p-2 rounded-full"
                          title="Reply"
                        >
                          <FaReply size={12} />
                        </button>
                        <button
                          onClick={() => handleCopyMessage(message.text)}
                          className="bg-zinc-600 hover:bg-zinc-500 p-2 rounded-full"
                          title="Copy"
                        >
                          <FaCopy size={12} />
                        </button>
                        {isOwnMessage && (
                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                            className="bg-red-600 hover:bg-red-500 p-2 rounded-full"
                            title="Delete"
                          >
                            <FaTrash size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {typing.length > 0 && (
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
              </div>
              <span>{typing[0]} is typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Context Menu */}
      {selectedMessage && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="bg-zinc-800 rounded-lg p-2 w-48"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => handleReplyMessage(selectedMessage)}
              className="w-full text-left px-4 py-3 hover:bg-zinc-700 rounded flex items-center gap-3"
            >
              <FaReply /> Reply
            </button>
            <button
              onClick={() => handleCopyMessage(selectedMessage.text)}
              className="w-full text-left px-4 py-3 hover:bg-zinc-700 rounded flex items-center gap-3"
            >
              <FaCopy /> Copy
            </button>
            {selectedMessage.sender === currentUser && (
              <button
                onClick={() => handleDeleteMessage(selectedMessage.id)}
                className="w-full text-left px-4 py-3 hover:bg-zinc-700 rounded flex items-center gap-3 text-red-400"
              >
                <FaTrash /> Delete
              </button>
            )}
          </div>
        </div>
      )}

      {/* Reply Bar */}
      {replyingTo && (
        <div className="bg-zinc-800 border-t border-zinc-700 px-4 py-2">
          <div className="max-w-4xl mx-auto flex items-center justify-between bg-zinc-700 px-4 py-2 rounded">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-yellow-400 font-semibold">Replying to {replyingTo.sender}</div>
              <div className="text-sm text-zinc-300 truncate">{replyingTo.text}</div>
            </div>
            <button
              onClick={() => setReplyingTo(null)}
              className="ml-2 hover:bg-zinc-600 p-2 rounded-full"
            >
              <FaTimes size={14} />
            </button>
          </div>
        </div>
      )}

      {/* File Preview */}
      {selectedFile && (
        <div className="bg-zinc-800 border-t border-zinc-700 px-4 py-2">
          <div className="max-w-4xl mx-auto flex items-center justify-between bg-zinc-700 px-4 py-2 rounded">
            <div className="flex items-center gap-3">
              {selectedFile.type.startsWith("image/") ? <FaImage size={20} /> : <FaFile size={20} />}
              <div>
                <div className="text-sm font-semibold">{selectedFile.name}</div>
                <div className="text-xs text-zinc-400">{(selectedFile.size / 1024).toFixed(1)} KB</div>
              </div>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="hover:bg-zinc-600 p-2 rounded-full"
            >
              <FaTimes size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-zinc-800 border-t border-zinc-700 p-4">
        <div className="max-w-4xl mx-auto flex items-end gap-2">
          {/* Attachment Button */}
          <div className="relative">
            <button
              onClick={() => setShowAttachment(!showAttachment)}
              className="bg-zinc-700 hover:bg-zinc-600 p-3 rounded-full transition"
            >
              <FaPaperclip size={20} />
            </button>

            {showAttachment && (
              <div className="absolute bottom-full mb-2 left-0 bg-zinc-700 rounded-lg shadow-xl p-2 w-40">
                <button
                  onClick={() => {
                    fileInputRef.current.accept = "image/*";
                    fileInputRef.current.click();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-zinc-600 rounded flex items-center gap-2"
                >
                  <FaImage /> Image
                </button>
                <button
                  onClick={() => {
                    fileInputRef.current.accept = "*";
                    fileInputRef.current.click();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-zinc-600 rounded flex items-center gap-2"
                >
                  <FaFile /> File
                </button>
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Message Input */}
          <div className="flex-1 bg-zinc-700 rounded-3xl flex items-center px-4 py-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none text-white placeholder-zinc-400"
            />

            {/* Emoji Button */}
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="hover:scale-110 transition ml-2"
            >
              <FaSmile size={20} className="text-yellow-400" />
            </button>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() && !selectedFile}
            className={`p-3 rounded-full transition ${
              newMessage.trim() || selectedFile
                ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
            }`}
          >
            <FaPaperPlane size={20} />
          </button>
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="max-w-4xl mx-auto mt-2 bg-zinc-700 rounded-lg p-4 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">Emojis</span>
              <button
                onClick={() => setShowEmojiPicker(false)}
                className="hover:bg-zinc-600 p-1 rounded"
              >
                <FaTimes size={14} />
              </button>
            </div>
            <div className="grid grid-cols-10 gap-2 max-h-48 overflow-y-auto">
              {emojis.map((emoji, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setNewMessage(newMessage + emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="text-2xl hover:bg-zinc-600 p-2 rounded transition"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
