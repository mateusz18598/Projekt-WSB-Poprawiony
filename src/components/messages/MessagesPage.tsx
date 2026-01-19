"use client";

import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { MessageSquare, Send, Search } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function MessagesPage() {
  const { currentUser, allUsers, conversations, messages, sendMessage } = useApp();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const connections = allUsers.filter(u => currentUser.connections.includes(u.id));

  const getConversationMessages = (conversationId: string) => {
    return messages.filter(m => m.conversationId === conversationId).sort((a, b) => a.timestamp - b.timestamp);
  };

  const getOtherParticipant = (conversationId: string) => {
    const conv = conversations.find(c => c.id === conversationId);
    if (!conv) return null;
    const otherId = conv.participants.find(p => p !== currentUser.id);
    return allUsers.find(u => u.id === otherId);
  };

  const handleSendMessage = () => {
    if (messageText.trim() && selectedConversation) {
      const other = getOtherParticipant(selectedConversation);
      if (other) {
        sendMessage(other.id, messageText);
        setMessageText('');
      }
    }
  };

  const filteredConnections = connections.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ height: 'calc(100vh - 10rem)' }}>
      <div className="messages-layout h-full">
        {/* Conversations List */}
        <aside className="conversations-sidebar card p-0">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Wiadomości</h2>
            <div className="relative input-with-icon">
              <Search className="input-icon" />
              <Input
                type="text"
                placeholder="Szukaj..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input w-full"
                style={{ height: 'auto', padding: '0.5rem 0.5rem 0.5rem 2.5rem' }}
              />
            </div>
          </div>

          <div className="conversations-list">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-muted">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Brak konwersacji</p>
                <p className="text-sm mt-1">Wybierz kontakt, aby rozpocząć rozmowę</p>
              </div>
            ) : (
              conversations.map((conv) => {
                const other = getOtherParticipant(conv.id);
                if (!other) return null;

                return (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`conversation-item ${selectedConversation === conv.id ? 'active' : ''}`}
                  >
                    <div className="flex gap-3">
                      <img
                        src={other.avatar}
                        alt={other.name}
                        className="avatar-md"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-gray-900 truncate">{other.name}</h3>
                          <span className="text-xs text-muted">2h</span>
                        </div>
                        <p className="text-sm text-muted truncate mt-1">
                          {conv.lastMessage.content}
                        </p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className="flex-shrink-0 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            {/* Available Connections */}
            {conversations.length === 0 && filteredConnections.length > 0 && (
              <div className="p-4">
                <h3 className="text-sm text-gray-600 mb-2">Twoje kontakty</h3>
                {filteredConnections.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => {
                      const conversationId = [currentUser.id, user.id].sort().join('-');
                      setSelectedConversation(conversationId);
                    }}
                    className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center gap-3 mb-2"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="avatar-sm"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{user.name}</h4>
                      <p className="text-xs text-muted">{user.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Chat Window */}
        <main className="card p-0 h-full overflow-hidden flex-1">
          {selectedConversation ? (
            <div className="chat-window">
              {/* Chat Header */}
              <div className="chat-header">
                {(() => {
                  const other = getOtherParticipant(selectedConversation);
                  return other ? (
                    <div className="flex items-center gap-3">
                      <img
                        src={other.avatar}
                        alt={other.name}
                        className="avatar-md"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900">{other.name}</h3>
                        <p className="text-sm text-muted">{other.title}</p>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>

              {/* Messages */}
              <div className="chat-messages">
                {getConversationMessages(selectedConversation).map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.from === currentUser.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`message-bubble ${msg.from === currentUser.id
                        ? 'sent'
                        : 'received'
                        }`}
                    >
                      <p>{msg.content}</p>
                      <p className={`text-xs mt-1 ${msg.from === currentUser.id ? 'text-pink-100' : 'text-muted'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="chat-input-area">
                <Input
                  type="text"
                  placeholder="Napisz wiadomość..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 chat-input"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="btn btn-primary"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Wybierz konwersację, aby rozpocząć czat</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
