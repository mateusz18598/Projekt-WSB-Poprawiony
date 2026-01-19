"use client";

import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { MapPin, Briefcase, Clock, Bookmark, Search } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface JobsPageProps {
  onCreateJob: () => void;
}

export function JobsPage({ onCreateJob }: JobsPageProps) {
  const { posts, savedPosts, toggleSavePost } = useApp();
  const jobPosts = posts.filter(p => p.type === 'job');

  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [fieldFilter, setFieldFilter] = useState('all');

  const filteredJobs = jobPosts.filter(job => {
    const matchesSearch = searchQuery === '' ||
      job.jobDetails?.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobDetails?.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = locationFilter === 'all' ||
      job.jobDetails?.location.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesType = typeFilter === 'all' ||
      job.jobDetails?.jobType === typeFilter;

    const matchesField = fieldFilter === 'all' ||
      job.jobDetails?.field === fieldFilter;

    return matchesSearch && matchesLocation && matchesType && matchesField;
  });

  return (
    <div className="container">
      <div className="jobs-layout">
        {/* Filters Sidebar */}
        <aside className="filters-card">
          <Card className="card p-4">
            <h3 className="font-bold text-gray-900 mb-4">Filtry</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted mb-2 block">Lokalizacja</label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie</SelectItem>
                    <SelectItem value="warsaw">Warszawa</SelectItem>
                    <SelectItem value="remote">Zdalnie</SelectItem>
                    <SelectItem value="usa">USA</SelectItem>
                    <SelectItem value="europe">Europa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted mb-2 block">Typ</label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie</SelectItem>
                    <SelectItem value="full-time">Pełny etat</SelectItem>
                    <SelectItem value="part-time">Pół etatu</SelectItem>
                    <SelectItem value="internship">Staż</SelectItem>
                    <SelectItem value="grant">Grant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted mb-2 block">Dziedzina</label>
                <Select value={fieldFilter} onValueChange={setFieldFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie</SelectItem>
                    <SelectItem value="ai">AI/ML</SelectItem>
                    <SelectItem value="biotech">Biotechnologia</SelectItem>
                    <SelectItem value="physics">Fizyka</SelectItem>
                    <SelectItem value="medicine">Medycyna</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => {
                  setLocationFilter('all');
                  setTypeFilter('all');
                  setFieldFilter('all');
                  setSearchQuery('');
                }}
                variant="outline"
                className="w-full btn btn-ghost justify-center"
                style={{ border: '1px solid var(--border-color)' }}
              >
                Wyczyść filtry
              </Button>
            </div>
          </Card>
        </aside>

        {/* Jobs List */}
        <main className="space-y-4">
          {/* Search and Create */}
          <div className="flex gap-2">
            <div className="relative flex-1 input-with-icon">
              <Search className="input-icon" />
              <Input
                type="text"
                placeholder="Szukaj stanowiska lub firmy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input w-full"
                style={{ height: 'auto', padding: '0.75rem 0.75rem 0.75rem 2.5rem' }}
              />
            </div>
            <Button onClick={onCreateJob} className="btn btn-primary">
              Dodaj ofertę
            </Button>
          </div>

          {/* Jobs Cards */}
          {filteredJobs.length === 0 ? (
            <div className="card text-center p-4">
              <div className="text-gray-400 mb-4 flex justify-center">
                <Briefcase className="w-16 h-16" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Brak ofert pracy</h3>
              <p className="text-muted">Zmień filtry lub dodaj nową ofertę</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.id} className="card job-card">
                <div className="job-header">
                  <div className="flex gap-4 flex-1">
                    <div className="job-icon">
                      <Briefcase className="w-8 h-8 text-primary" />
                    </div>

                    <div className="job-details">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{job.jobDetails?.position}</h3>
                      <p className="text-gray-700 mb-2 font-medium">{job.jobDetails?.company}</p>

                      <div className="job-tags">
                        <span className="job-tag">
                          <MapPin className="w-4 h-4" />
                          {job.jobDetails?.location}
                        </span>
                        <span className="job-tag">
                          <Briefcase className="w-4 h-4" />
                          {job.jobDetails?.jobType}
                        </span>
                        <span className="job-tag">
                          <Clock className="w-4 h-4" />
                          {job.timeAgo}
                        </span>
                      </div>

                      {job.jobDetails?.salary && (
                        <p className="text-primary font-bold mb-2">{job.jobDetails.salary}</p>
                      )}

                      <p className="text-gray-700 line-clamp-2">{job.content}</p>

                      <div className="flex gap-2 mt-4">
                        <Button className="btn btn-primary">
                          Aplikuj
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => toggleSavePost(job.id)}
                          className={`btn btn-ghost ${savedPosts.includes(job.id) ? 'text-primary' : ''}`}
                          style={{ border: '1px solid var(--border-color)' }}
                        >
                          <Bookmark className={`w-4 h-4 ${savedPosts.includes(job.id) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
