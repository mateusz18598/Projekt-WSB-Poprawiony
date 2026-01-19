"use client";

import { useState } from 'react';
import { Heart, MessageCircle, Share2, Send, Bookmark, MoreVertical, Edit2, Trash2, Briefcase, FileText, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useApp } from '../contexts/AppContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface PostCardProps {
  post: any;
  onEdit?: (post: any) => void;
}

export function PostCard({ post, onEdit }: PostCardProps) {
  const { currentUser, likePost, addComment, deleteComment, deletePost, savedPosts, toggleSavePost } = useApp();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const isLiked = post.likes.includes(currentUser.id);
  const isSaved = savedPosts.includes(post.id);
  const isAuthor = post.author.id === currentUser.id;

  const handleLike = () => {
    likePost(post.id);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      addComment(post.id, commentText);
      setCommentText('');
    }
  };

  const handleShare = () => {
    alert('Post udostępniony!');
  };

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="p-4">
        {/* Author Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="avatar-md"
              style={{ border: '2px solid var(--border-color)' }}
            />
            <div>
              <h3 className="font-bold text-gray-900">{post.author.name}</h3>
              <p className="text-sm text-gray-600">{post.author.title}</p>
              <p className="text-xs text-muted">{post.timeAgo}</p>
            </div>
          </div>

          {/* More menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="btn btn-ghost" style={{ padding: '0.5rem', borderRadius: '50%' }}>
                <MoreVertical className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toggleSavePost(post.id)}>
                <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? 'text-primary' : ''}`} />
                {isSaved ? 'Usuń z zapisanych' : 'Zapisz post'}
              </DropdownMenuItem>
              {isAuthor && (
                <>
                  <DropdownMenuItem onClick={() => onEdit?.(post)}>
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edytuj
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (confirm('Czy na pewno chcesz usunąć ten post?')) {
                        deletePost(post.id);
                      }
                    }}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Usuń
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Job Badge */}
        {post.type === 'job' && post.jobDetails && (
          <div className="mb-4" style={{ padding: '0.75rem', backgroundColor: 'var(--secondary-bg)', borderRadius: 'var(--radius-md)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-primary" />
              <span className="font-bold text-primary">Oferta pracy</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-1">{post.jobDetails.position}</h4>
            <p className="text-sm text-gray-600">{post.jobDetails.company} • {post.jobDetails.location}</p>
            {post.jobDetails.salary && (
              <p className="text-sm text-primary mt-1">{post.jobDetails.salary}</p>
            )}
          </div>
        )}

        {/* Content */}
        <p className="post-content">{post.content}</p>
      </div>

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post content"
          className="post-image"
        />
      )}

      {/* Images Gallery */}
      {post.images && post.images.length > 0 && (
        <div className={`image-grid ${post.images.length === 1 ? 'grid-cols-1' :
          post.images.length === 2 ? 'grid-cols-2' :
            post.images.length === 3 ? 'grid-cols-3' :
              'grid-cols-2'
          }`}>
          {post.images.slice(0, 4).map((img: string, index: number) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt={`Post image ${index + 1}`}
                style={{ width: '100%', height: '16rem', objectFit: 'cover', cursor: 'pointer' }}
              />
              {index === 3 && post.images.length > 4 && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  +{post.images.length - 4}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* PDF Attachment */}
      {post.pdfUrl && (
        <div className="mb-4 mx-4" style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '3rem', height: '3rem', backgroundColor: '#fee2e2', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText className="w-6 h-6 text-red-600" />
          </div>
          <div style={{ flex: 1 }}>
            <p className="text-sm font-bold text-gray-900">Załącznik PDF</p>
            <p className="text-xs text-muted">Dokument badawczy</p>
          </div>
          <button
            onClick={() => window.open(post.pdfUrl, '_blank')}
            className="btn btn-ghost"
            style={{ border: '1px solid var(--border-color)' }}
          >
            <Download className="w-4 h-4 mr-1" />
            Pobierz
          </button>
        </div>
      )}

      {/* YouTube Video */}
      {post.youtubeUrl && getYouTubeVideoId(post.youtubeUrl) && (
        <div className="aspect-video" style={{ padding: '0 1rem 1rem' }}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(post.youtubeUrl)}`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Stats */}
      <div className="post-stats">
        <span>{post.likes.length} polubień</span>
        <span>{post.comments.length} komentarzy • {post.shares} udostępnień</span>
      </div>

      {/* Actions */}
      <div className="post-actions">
        <button
          className={`btn btn-ghost ${isLiked ? 'text-primary' : ''}`}
          onClick={handleLike}
        >
          <Heart className={`w-5 h-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
          <span>Lubię to</span>
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          <span>Komentuj</span>
        </button>
        <button
          className="btn btn-ghost"
          onClick={handleShare}
        >
          <Share2 className="w-5 h-5 mr-2" />
          <span>Udostępnij</span>
        </button>
        <button
          className={`btn btn-ghost ${isSaved ? 'text-primary' : ''}`}
          onClick={() => toggleSavePost(post.id)}
        >
          <Bookmark className={`w-5 h-5 mr-2 ${isSaved ? 'fill-current' : ''}`} />
          <span>Zapisz</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="comment-section">
          <div className="comment-input-area">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="avatar-sm"
            />
            <div style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
              <Textarea
                placeholder="Dodaj komentarz..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={1}
                className="flex-1"
                style={{ minHeight: '2.5rem', padding: '0.5rem' }}
              />
              <button
                onClick={handleComment}
                disabled={!commentText.trim()}
                className="btn btn-primary"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="comment-list">
            {post.comments.map((comment: any) => (
              <div key={comment.id} className="flex gap-2 group">
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="avatar-sm"
                />
                <div className="comment-bubble">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{comment.author.name}</h4>
                      <p className="text-xs text-muted">{comment.timeAgo}</p>
                    </div>
                    {comment.author.id === currentUser.id && (
                      <button
                        className="btn btn-ghost"
                        style={{ padding: '0.25rem' }}
                        onClick={() => {
                          if (confirm('Czy na pewno chcesz usunąć ten komentarz?')) {
                            deleteComment(post.id, comment.id);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-900 mt-1">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}