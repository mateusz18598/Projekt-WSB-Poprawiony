"use client";

import { Button } from '../ui/button';
import { FileText, Bookmark, Users2, Eye, Link2, Quote } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface LeftSidebarProps {
  onNavigate: (tab: string) => void;
}

export function LeftSidebar({ onNavigate }: LeftSidebarProps) {
  const { currentUser, savedPosts } = useApp();

  return (
    <div className="space-y-4 sticky top-20">
      {/* Mini Profile Card */}
      <div className="card profile-card">
        <div
          className="profile-cover"
          style={{
            backgroundImage: `url(${currentUser.coverImage})`,
          }}
        />

        <div className="profile-avatar-container">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="profile-avatar"
            onClick={() => onNavigate('profile')}
          />

          <div className="text-center">
            <h3
              className="font-bold text-gray-900"
              style={{ cursor: 'pointer' }}
              onClick={() => onNavigate('profile')}
            >
              {currentUser.name}
            </h3>
            <p className="text-sm text-gray-600">{currentUser.title}</p>
            <p className="text-xs text-muted">{currentUser.institution}</p>
          </div>

          <div className="profile-stats">
            <div className="stat-row">
              <div className="flex items-center gap-2 text-gray-600">
                <Eye className="w-4 h-4" />
                <span>Wyświetlenia profilu</span>
              </div>
              <span className="text-primary font-bold">{currentUser.profileViews}</span>
            </div>

            <div className="stat-row">
              <div className="flex items-center gap-2 text-gray-600">
                <Link2 className="w-4 h-4" />
                <span>Połączenia</span>
              </div>
              <span className="text-primary font-bold">{currentUser.connections.length}</span>
            </div>

            <div className="stat-row">
              <div className="flex items-center gap-2 text-gray-600">
                <Quote className="w-4 h-4" />
                <span>Cytowania</span>
              </div>
              <span className="text-primary font-bold">{currentUser.citations}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="card">
        <div className="space-y-2">
          <button
            className="btn btn-ghost sidebar-btn"
            onClick={() => onNavigate('articles')}
          >
            <FileText className="w-5 h-5 mr-3 text-primary" />
            <span className="text-sm">Moje artykuły</span>
            <span className="ml-auto text-xs bg-pink-100 text-primary px-2 py-1 rounded-full">
              {currentUser.publications?.length || 0}
            </span>
          </button>

          <button
            className="btn btn-ghost sidebar-btn"
            onClick={() => onNavigate('saved')}
          >
            <Bookmark className="w-5 h-5 mr-3 text-primary" />
            <span className="text-sm">Zapisane</span>
            <span className="ml-auto text-xs bg-pink-100 text-primary px-2 py-1 rounded-full">
              {savedPosts?.length || 0}
            </span>
          </button>

          <button
            className="btn btn-ghost sidebar-btn"
            onClick={() => onNavigate('network')}
          >
            <Users2 className="w-5 h-5 mr-3 text-primary" />
            <span className="text-sm">Grupy</span>
            <span className="ml-auto text-xs bg-pink-100 text-primary px-2 py-1 rounded-full">
              3
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}