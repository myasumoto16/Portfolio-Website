import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './BlogPost.css';
import { estimateReadingTime } from '../lib/sanity';
import { supabase } from '../lib/supabase';
import { BlogPost as BlogPostType, Comment } from '../types';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    if (!slug) return;
    if (!supabase) { setNotFound(true); setLoading(false); return; }
    supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()
      .then(({ data, error }) => {
        if (error || !data) { setNotFound(true); } else { setPost(data); }
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    if (!slug || !supabase) { setCommentsLoading(false); return; }
    supabase
      .from('comments')
      .select('*')
      .eq('post_slug', slug)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        setComments(data ?? []);
        setCommentsLoading(false);
      });
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim() || !supabase) return;
    setSubmitting(true);
    setCommentError('');

    const { error } = await supabase
      .from('comments')
      .insert({ post_slug: slug, author_name: authorName.trim(), content: content.trim() });

    if (error) {
      setCommentError('Failed to post comment. Please try again.');
      setSubmitting(false);
      return;
    }

    const { data: fresh } = await supabase
      .from('comments')
      .select('*')
      .eq('post_slug', slug)
      .order('created_at', { ascending: true });

    setComments(fresh ?? []);
    setAuthorName('');
    setContent('');
    setSubmitted(true);
    setSubmitting(false);
    setTimeout(() => setSubmitted(false), 4000);
  };

  if (loading) {
    return (
      <section className="blogpost-section">
        <div className="blogpost-skeleton-header" />
        <div className="blogpost-skeleton-body">
          {[1, 2, 3, 4].map(i => <div key={i} className="blogpost-skeleton-line" />)}
        </div>
      </section>
    );
  }

  if (notFound || !post) {
    return (
      <section className="blogpost-section">
        <p className="blogpost-not-found">Post not found. <Link to="/blog">Back to Blog</Link></p>
      </section>
    );
  }

  const readTime = estimateReadingTime(post.body ?? '');
  const dateStr = new Date(post.published_at ?? post.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <section className="blogpost-section">
      <div className="blogpost-container">
        <Link to="/blog" className="blogpost-back">← Back to Blog</Link>

        <header className="blogpost-header">
          {post.tags && post.tags.length > 0 && (
            <div className="blogpost-tags">
              {post.tags.map(tag => <span key={tag} className="post-tag">{tag}</span>)}
            </div>
          )}
          <h1>{post.title}</h1>
          <div className="blogpost-meta">
            <span>{dateStr}</span>
            <span className="meta-sep">·</span>
            <span>{readTime} min read</span>
          </div>
        </header>

        {post.cover_image && (
          <div className="blogpost-cover">
            <img src={post.cover_image} alt={post.title} />
          </div>
        )}

        <article className="blogpost-body">
          {!post.body ? (
            <p>No content yet.</p>
          ) : post.body.trimStart().startsWith('<') ? (
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body) }} />
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          )}
        </article>

        {/* Comments */}
        <section className="comments-section">
          <h2>Comments</h2>

          {commentsLoading ? (
            <p className="comments-loading">Loading comments…</p>
          ) : comments.length === 0 ? (
            <p className="comments-empty">No comments yet. Be the first!</p>
          ) : (
            <ul className="comments-list">
              {comments.map(c => (
                <li key={c.id} className="comment-item">
                  <div className="comment-header">
                    <span className="comment-author">{c.author_name}</span>
                    <span className="comment-date">
                      {new Date(c.created_at).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="comment-content">{c.content}</p>
                </li>
              ))}
            </ul>
          )}

          <form className="comment-form" onSubmit={handleSubmit}>
            <h3>Leave a comment</h3>
            <label htmlFor="author-name">Name</label>
            <input
              id="author-name"
              type="text"
              placeholder="Your name"
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
              required
              maxLength={80}
            />
            <label htmlFor="comment-content">Comment</label>
            <textarea
              id="comment-content"
              placeholder="Share your thoughts…"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
              maxLength={1000}
              rows={4}
            />
            {commentError && <p className="comment-error">{commentError}</p>}
            {submitted && <p className="comment-success">Comment posted!</p>}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting || !authorName.trim() || !content.trim()}
            >
              {submitting ? 'Posting…' : 'Post Comment'}
            </button>
          </form>
        </section>
      </div>
    </section>
  );
};

export default BlogPost;
