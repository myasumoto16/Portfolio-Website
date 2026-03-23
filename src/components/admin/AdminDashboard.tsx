import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { BlogPost } from '../../types';
import './Admin.css';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = () => {
    if (!supabase) return;
    supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setPosts(data ?? []);
        setLoading(false);
      });
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async (id: string) => {
    if (!supabase) return;
    if (!window.confirm('Delete this post?')) return;
    await supabase.from('posts').delete().eq('id', id);
    fetchPosts();
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Blog Admin</h1>
        <div className="admin-header-actions">
          <Link to="/admin/new" className="admin-btn admin-btn-primary">+ New Post</Link>
          <button className="admin-btn admin-btn-secondary" onClick={handleSignOut}>Sign Out</button>
        </div>
      </header>

      {loading ? (
        <p className="admin-loading">Loading posts…</p>
      ) : posts.length === 0 ? (
        <p className="admin-empty">No posts yet. <Link to="/admin/new">Create one!</Link></p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td className="admin-table-title">{post.title}</td>
                <td>
                  <span className={`admin-badge ${post.is_published ? 'badge-published' : 'badge-draft'}`}>
                    {post.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="admin-table-date">
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric',
                  })}
                </td>
                <td className="admin-table-actions">
                  <Link to={`/admin/edit/${post.id}`} className="admin-btn admin-btn-sm">Edit</Link>
                  <button
                    className="admin-btn admin-btn-sm admin-btn-danger"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
