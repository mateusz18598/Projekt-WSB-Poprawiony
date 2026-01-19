"use client";

import { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { Navbar } from './components/layout/Navbar';
import { LeftSidebar } from './components/home/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { NewPostCard } from './components/NewPostCard';
import { PostCard } from './components/PostCard';
import { NetworkTab } from './components/NetworkTab';
import { NotificationsTab } from './components/NotificationsTab';
import { SearchResults } from './components/SearchResults';
import { SavedPostsTab } from './components/SavedPostsTab';
import { ProfilePage } from './components/profile/ProfilePage';
import { JobsPage } from './components/jobs/JobsPage';
import { MessagesPage } from './components/messages/MessagesPage';
import { ArticlesPage } from './components/articles/ArticlesPage';
import { CreatePostModal } from './components/modals/CreatePostModal';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { posts, setSearchQuery } = useApp();
  const [activeTab, setActiveTab] = useState('home');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTab('search');
  };

  const handleEditPost = (post: any) => {
    setEditingPost(post);
    setShowCreatePost(true);
  };

  const handleCloseCreatePost = () => {
    setShowCreatePost(false);
    setEditingPost(null);
  };

  const handleCreatePost = (type?: 'post' | 'article' | 'job') => {
    setEditingPost(null);
    setShowCreatePost(true);
  };

  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSearch={handleSearch}
      />

      <div className={`container ${activeTab === 'home' ? 'app-layout' : 'app-page'}`}>
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <>
            <aside className="lg-block hidden">
              <LeftSidebar onNavigate={setActiveTab} />
            </aside>

            <main className="space-y-4">
              <NewPostCard
                userAvatar={posts[0]?.author.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop'}
                onCreatePost={handleCreatePost}
              />

              {posts.length === 0 ? (
                <div className="card text-center" style={{ padding: '3rem' }}>
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-gray-900 mb-2 font-bold">Brak postów</h3>
                  <p className="text-gray-600">Zacznij dodawać treści, aby zobaczyć swój feed</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} onEdit={handleEditPost} />
                  ))}
                </div>
              )}
            </main>

            <aside className="lg-block hidden">
              <RightSidebar />
            </aside>
          </>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <ProfilePage />
        )}

        {/* NETWORK TAB */}
        {activeTab === 'network' && (
          <div className="max-w-5xl mx-auto">
            <NetworkTab />
          </div>
        )}

        {/* JOBS TAB */}
        {activeTab === 'jobs' && (
          <JobsPage onCreateJob={handleCreatePost} />
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <MessagesPage />
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === 'notifications' && (
          <div className="max-w-3xl mx-auto">
            <NotificationsTab />
          </div>
        )}

        {/* SEARCH TAB */}
        {activeTab === 'search' && (
          <div className="max-w-5xl mx-auto">
            <SearchResults />
          </div>
        )}

        {/* SAVED POSTS TAB */}
        {activeTab === 'saved' && (
          <div className="max-w-4xl mx-auto">
            <SavedPostsTab onEditPost={handleEditPost} />
          </div>
        )}

        {/* ARTICLES TAB */}
        {activeTab === 'articles' && (
          <ArticlesPage onCreateArticle={handleCreatePost} />
        )}
      </div>

      {/* Modals */}
      <CreatePostModal
        open={showCreatePost}
        onClose={handleCloseCreatePost}
        editPost={editingPost}
      />

      <Toaster position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
