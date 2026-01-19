"use client";

import { Button } from './ui/button';
import { ExternalLink, TrendingUp } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function RightSidebar() {
  const { allUsers, currentUser, sendConnectionRequest } = useApp();

  const suggestions = allUsers
    .filter(u => u.id !== currentUser.id && !currentUser.connections.includes(u.id))
    .slice(0, 3);

  const news = [
    { title: 'Przełom w badaniach nad fuzją jądrową', source: 'Nature', time: '2h' },
    { title: 'Nowa szczepionka na raka w fazie testów', source: 'Science', time: '5h' },
    { title: 'AI osiąga nowy poziom w rozumieniu języka', source: 'MIT Tech Review', time: '8h' },
    { title: 'Odkrycie nowej planety w habitowalnej strefie', source: 'NASA', time: '1d' },
    { title: 'Kwantowe komputery coraz bliżej zastosowań', source: 'IEEE', time: '2d' }
  ];

  return (
    <div className="space-y-4 sticky top-20">
      {/* News */}
      <div className="card" style={{ padding: 0 }}>
        <div className="section-header">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3>Aktualności naukowe</h3>
          </div>
        </div>
        <div>
          {news.map((item, index) => (
            <div key={index} className="list-item" style={{ cursor: 'pointer' }}>
              <h4 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h4>
              <div className="flex items-center justify-between text-xs text-muted">
                <span>{item.source}</span>
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '0.75rem', borderTop: '1px solid var(--secondary-bg)' }}>
          <button className="btn btn-ghost sidebar-btn" style={{ width: '100%', justifyContent: 'center' }}>
            Zobacz więcej
            <ExternalLink className="w-3 h-3 ml-2" />
          </button>
        </div>
      </div>

      {/* Suggested Connections */}
      <div className="card" style={{ padding: 0 }}>
        <div className="section-header">
          <h3>Sugestie znajomych</h3>
        </div>
        <div>
          {suggestions.map((user) => (
            <div key={user.id} className="list-item">
              <div className="flex items-start gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="rounded-full object-cover"
                  style={{ width: '3rem', height: '3rem', border: '2px solid var(--border-color)' }}
                />
                <div className="flex-1" style={{ minWidth: 0 }}>
                  <h4 className="text-sm font-bold text-gray-900 truncate">{user.name}</h4>
                  <p className="text-xs text-muted truncate">{user.title}</p>
                  <p className="text-xs text-muted mt-1">{user.institution}</p>
                  <button
                    onClick={() => sendConnectionRequest(user)}
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '0.5rem', fontSize: '0.875rem' }}
                  >
                    Połącz
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Jobs */}
      <div className="card" style={{ padding: 0 }}>
        <div className="section-header">
          <h3>Polecane oferty</h3>
        </div>
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-gray-900">AI Research Scientist</h4>
            <p className="text-xs text-muted">Google DeepMind</p>
            <p className="text-xs text-muted">London, UK</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-gray-900">Postdoctoral Researcher</h4>
            <p className="text-xs text-muted">MIT</p>
            <p className="text-xs text-muted">Cambridge, USA</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-gray-900">Quantum Computing Lead</h4>
            <p className="text-xs text-muted">IBM Research</p>
            <p className="text-xs text-muted">Zürich, Switzerland</p>
          </div>
        </div>
        <div style={{ padding: '0.75rem', borderTop: '1px solid var(--secondary-bg)' }}>
          <button className="btn btn-ghost sidebar-btn text-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Zobacz wszystkie oferty
          </button>
        </div>
      </div>
    </div>
  );
}
