import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';
import { estimateReadingTime } from '../lib/sanity';
import { supabase } from '../lib/supabase';
import { BlogPost } from '../types';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) { setError(true); setLoading(false); return; }
    supabase
      .from('posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .then(({ data, error: err }) => {
        if (err) { setError(true); } else { setPosts(data ?? []); }
        setLoading(false);
      });
  }, []);

  const allTags = Array.from(new Set(posts.flatMap(p => p.tags ?? [])));
  const filtered = activeTag ? posts.filter(p => p.tags?.includes(activeTag)) : posts;

  return (
    <section className="blog-section">
      <h2>Blog</h2>

      {allTags.length > 0 && (
        <div className="blog-tags-filter">
          <button
            className={`tag-chip${activeTag === null ? ' active' : ''}`}
            onClick={() => setActiveTag(null)}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`tag-chip${activeTag === tag ? ' active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="blog-loading">
          {[1, 2, 3].map(i => <div key={i} className="post-card-skeleton" />)}
        </div>
      )}

      {error && (
        <div className="blog-empty">
          <p>Couldn't load posts. Make sure your Supabase env vars are set.</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="blog-empty">
          <p>{activeTag ? `No posts tagged "${activeTag}".` : 'No posts yet — check back soon!'}</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="posts-grid">
          {filtered.map(post => (
            <Link to={`/blog/${post.slug}`} key={post.id} className="post-card">
              {post.cover_image && (
                <div className="post-card-image">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="post-card-body">
                {post.tags && post.tags.length > 0 && (
                  <div className="post-card-tags">
                    {post.tags.map(tag => (
                      <span key={tag} className="post-tag">{tag}</span>
                    ))}
                  </div>
                )}
                <h3>{post.title}</h3>
                {post.excerpt && <p>{post.excerpt}</p>}
                <div className="post-card-meta">
                  <span>
                    {new Date(post.published_at ?? post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
                  </span>
                  <span>{estimateReadingTime(post.body ?? '')} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Blog;
