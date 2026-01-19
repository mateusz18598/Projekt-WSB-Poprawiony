"use client";

import { useState } from 'react';
import { Home, Users, Briefcase, MessageSquare, Bell, Search, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useApp } from '../../contexts/AppContext';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSearch: (query: string) => void;
}

export function Navbar({ activeTab, onTabChange, onSearch }: NavbarProps) {
  const { currentUser, notifications } = useApp();
  const [searchInput, setSearchInput] = useState('');
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
    onTabChange('search');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Left Section */}
        <div className="navbar-left">
          <div
            className="brand-logo"
            onClick={() => onTabChange('home')}
            style={{ cursor: 'pointer' }}
          >
            <span>SL</span>
          </div>
          <span className="lg-block hidden font-bold text-gray-900">ScienceLink</span>

          <form onSubmit={handleSearch} className="md-block hidden relative input-with-icon" style={{ width: 'auto' }}>
            <Search className="input-icon" />
            <input
              type="text"
              placeholder="Szukaj profili, postów, artykułów..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="search-input"
            />
          </form>
        </div>

        {/* Center Navigation */}
        <div className="navbar-center lg-flex hidden">
          <button
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => onTabChange('home')}
          >
            <Home className="w-6 h-6" />
            <span>Strona główna</span>
          </button>

          <button
            className={`nav-link ${activeTab === 'network' ? 'active' : ''}`}
            onClick={() => onTabChange('network')}
          >
            <Users className="w-6 h-6" />
            <span>Moja sieć</span>
          </button>

          <button
            className={`nav-link ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => onTabChange('jobs')}
          >
            <Briefcase className="w-6 h-6" />
            <span>Oferty pracy</span>
          </button>

          <button
            className={`nav-link ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => onTabChange('messages')}
          >
            <MessageSquare className="w-6 h-6" />
            <span>Wiadomości</span>
          </button>

          <button
            className={`nav-link ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => onTabChange('notifications')}
          >
            <div className="relative">
              <Bell className="w-6 h-6" />
              {unreadNotifications > 0 && (
                <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-pink-600 text-white text-[10px] flex items-center justify-center border border-white">
                  {unreadNotifications > 99 ? '99+' : unreadNotifications}
                </div>
              )}
            </div>
            <span>Powiadomienia</span>
          </button>
        </div>

        {/* Right Section - User Menu */}
        <div className="navbar-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }}
                />
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="dropdown-header">
                <p className="dropdown-header-title">{currentUser.name}</p>
                <p className="dropdown-header-subtitle">{currentUser.title}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onTabChange('profile')}>
                <User className="w-4 h-4 mr-2" />
                Mój profil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Ustawienia
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="danger">
                <LogOut className="w-4 h-4 mr-2" />
                Wyloguj się
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
