"use client";

import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { MessageSquare, UserMinus, X, Check, Search } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';

export function NetworkTab() {
  const {
    currentUser,
    allUsers,
    connectionRequests,
    acceptConnectionRequest,
    rejectConnectionRequest,
    withdrawConnectionRequest,
    removeConnection,
    sendConnectionRequest
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const connections = allUsers.filter(u => currentUser.connections.includes(u.id));
  const receivedRequests = connectionRequests.filter(r => r.status === 'pending');
  const sentRequests = connectionRequests.filter(r => r.from.id === currentUser.id && r.status === 'pending');

  const suggestions = allUsers
    .filter(u =>
      u.id !== currentUser.id &&
      !currentUser.connections.includes(u.id) &&
      !connectionRequests.some(r => r.from.id === currentUser.id && r.status === 'pending')
    )
    .slice(0, 6);

  const filteredConnections = connections.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveConnection = (userId: string, userName: string) => {
    if (confirm(`Czy na pewno chcesz usunąć połączenie z ${userName}?`)) {
      removeConnection(userId);
      toast.success('Połączenie usunięte');
    }
  };

  return (
    <div className="space-y-6">
      <div className="card" style={{ padding: '0 0 1rem 0', overflow: 'hidden' }}>
        <Tabs defaultValue="connections" className="w-full">
          <TabsList className="tabs-list m-0">
            <TabsTrigger value="connections" className="tab-trigger">
              Połączenia ({connections.length})
            </TabsTrigger>
            <TabsTrigger value="invitations" className="tab-trigger">
              Zaproszenia ({receivedRequests.length})
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="tab-trigger">
              Sugestie
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connections" className="p-4">
            <div className="input-with-icon mb-4">
              <Search className="input-icon" />
              <input
                type="text"
                placeholder="Szukaj w sieci..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
              />
            </div>

            {filteredConnections.length === 0 ? (
              <div className="text-center py-12 text-muted">
                <p>Brak połączeń</p>
              </div>
            ) : (
              <div className="network-grid">
                {filteredConnections.map((user) => (
                  <div key={user.id} className="network-card">
                    <div className="flex items-start gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="avatar-md"
                      />
                      <div className="flex-1" style={{ minWidth: 0 }}>
                        <h3 className="font-bold text-gray-900 truncate">{user.name}</h3>
                        <p className="text-sm text-gray-600 truncate">{user.title}</p>
                        <p className="text-xs text-muted mt-1">{user.institution}</p>
                        <div className="flex gap-2 mt-3">
                          <button
                            className="btn btn-ghost"
                            style={{ border: '1px solid var(--border-color)', flex: 1 }}
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Wiadomość
                          </button>
                          <button
                            className="btn btn-ghost"
                            style={{ border: '1px solid var(--border-color)', color: 'var(--primary-color)' }}
                            onClick={() => handleRemoveConnection(user.id, user.name)}
                          >
                            <UserMinus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="invitations" className="p-4">
            {receivedRequests.length === 0 && sentRequests.length === 0 ? (
              <div className="text-center py-12 text-muted">
                <p>Brak zaproszeń</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {receivedRequests.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Otrzymane ({receivedRequests.length})</h3>
                    <div className="network-grid">
                      {receivedRequests.map((request) => (
                        <div key={request.id} className="network-card">
                          <div className="flex items-start gap-3">
                            <img
                              src={request.from.avatar}
                              alt={request.from.name}
                              className="avatar-md"
                            />
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900">{request.from.name}</h4>
                              <p className="text-sm text-gray-600">{request.from.title}</p>
                              <p className="text-xs text-muted mt-1">
                                {request.mutualConnections} wspólnych połączeń
                              </p>
                              <div className="flex gap-2 mt-3">
                                <button
                                  onClick={() => {
                                    acceptConnectionRequest(request.id);
                                    toast.success('Zaproszenie zaakceptowane');
                                  }}
                                  className="btn btn-primary"
                                  style={{ flex: 1 }}
                                >
                                  <Check className="w-4 h-4 mr-1" />
                                  Akceptuj
                                </button>
                                <button
                                  onClick={() => {
                                    rejectConnectionRequest(request.id);
                                    toast.success('Zaproszenie odrzucone');
                                  }}
                                  className="btn btn-ghost"
                                  style={{ border: '1px solid var(--border-color)' }}
                                >
                                  <X className="w-4 h-4 mr-1" />
                                  Odrzuć
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {sentRequests.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Wysłane ({sentRequests.length})</h3>
                    <div className="network-grid">
                      {sentRequests.map((request) => (
                        <div key={request.id} className="network-card">
                          <div className="flex items-start justify-between">
                            <div className="flex gap-3">
                              <img
                                src={request.from.avatar}
                                alt={request.from.name}
                                className="avatar-md"
                              />
                              <div>
                                <h4 className="font-bold text-gray-900">{request.from.name}</h4>
                                <p className="text-sm text-gray-600">{request.from.title}</p>
                                <p className="text-xs text-muted mt-1">Oczekuje na odpowiedź</p>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                withdrawConnectionRequest(request.id);
                                toast.success('Zaproszenie wycofane');
                              }}
                              className="btn btn-ghost"
                              style={{ border: '1px solid var(--border-color)' }}
                            >
                              Wycofaj
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="suggestions" className="p-4">
            {suggestions.length === 0 ? (
              <div className="text-center py-12 text-muted">
                <p>Brak sugestii</p>
              </div>
            ) : (
              <div className="network-grid cols-3">
                {suggestions.map((user) => (
                  <div key={user.id} className="network-card text-center">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="avatar-md mx-auto"
                      style={{ width: '5rem', height: '5rem', margin: '0 auto' }}
                    />
                    <h3 className="font-bold text-gray-900 mt-3">{user.name}</h3>
                    <p className="text-sm text-gray-600 mt-1" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.title}</p>
                    <p className="text-xs text-muted mt-1">{user.institution}</p>
                    <p className="text-xs text-primary mt-2">
                      {user.connections.filter(c => currentUser.connections.includes(c)).length} wspólnych połączeń
                    </p>
                    <button
                      onClick={() => {
                        sendConnectionRequest(user);
                        toast.success('Zaproszenie wysłane');
                      }}
                      className="btn btn-primary"
                      style={{ width: '100%', marginTop: '0.75rem' }}
                    >
                      Połącz
                    </button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
