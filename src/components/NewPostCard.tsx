"use client";

import { Card } from './ui/card';
import { Button } from './ui/button';
import { Image, Video, FileText, Briefcase } from 'lucide-react';

interface NewPostCardProps {
  userAvatar: string;
  onCreatePost: (type?: 'post' | 'article' | 'job') => void;
}

export function NewPostCard({ userAvatar, onCreatePost }: NewPostCardProps) {
  return (
    <div className="card">
      <div className="flex gap-2 items-center">
        <img
          src={userAvatar}
          alt="User avatar"
          className="avatar-md"
          style={{ border: '2px solid var(--border-color)' }}
        />
        <button
          onClick={() => onCreatePost('post')}
          className="new-post-trigger"
        >
          Podziel się odkryciem...
        </button>
      </div>

      <div className="action-bar">
        <button
          onClick={() => onCreatePost('post')}
          className="btn btn-ghost sidebar-btn"
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <Image className="w-5 h-5 mr-3 text-primary" />
          <span className="text-sm">Zdjęcie</span>
        </button>

        <button
          onClick={() => onCreatePost('post')}
          className="btn btn-ghost sidebar-btn"
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <Video className="w-5 h-5 mr-3 text-primary" />
          <span className="text-sm">Video</span>
        </button>

        <button
          onClick={() => onCreatePost('article')}
          className="btn btn-ghost sidebar-btn"
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <FileText className="w-5 h-5 mr-3 text-primary" />
          <span className="text-sm">Artykuł</span>
        </button>

        <button
          onClick={() => onCreatePost('job')}
          className="btn btn-ghost sidebar-btn"
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <Briefcase className="w-5 h-5 mr-3 text-primary" />
          <span className="text-sm">Oferta</span>
        </button>
      </div>
    </div>
  );
}
