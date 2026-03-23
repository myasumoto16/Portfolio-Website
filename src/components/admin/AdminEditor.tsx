import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { supabase } from '../../lib/supabase';
import './Admin.css';

type EditorMode = 'rich' | 'markdown';

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function ToolbarButton({
  onClick, active, disabled, title, children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={e => { e.preventDefault(); onClick(); }}
      className={`tiptap-toolbar-btn${active ? ' active' : ''}`}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  if (!editor) return null;

  const setLink = () => {
    const url = window.prompt('URL');
    if (!url) { editor.chain().focus().unsetLink().run(); return; }
    editor.chain().focus().setLink({ href: url, target: '_blank' }).run();
  };

  return (
    <div className="tiptap-toolbar">
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold"><b>B</b></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic"><i>I</i></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline"><u>U</u></ToolbarButton>
      <div className="tiptap-toolbar-sep" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Heading 1">H1</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">H2</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">H3</ToolbarButton>
      <div className="tiptap-toolbar-sep" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">• List</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Ordered list">1. List</ToolbarButton>
      <div className="tiptap-toolbar-sep" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">"</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code block">{'</>'}</ToolbarButton>
      <ToolbarButton onClick={setLink} active={editor.isActive('link')} title="Link">Link</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal rule">—</ToolbarButton>
      <div className="tiptap-toolbar-sep" />
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">↩</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">↪</ToolbarButton>
    </div>
  );
}

const AdminEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id;

  const [mode, setMode] = useState<EditorMode>('rich');
  const [markdown, setMarkdown] = useState('');

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManual, setSlugManual] = useState(false);
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [saving, setSaving] = useState(false);
  const [formatting, setFormatting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Start writing your post…' }),
    ],
    editorProps: {
      attributes: { class: 'tiptap-editor-content' },
    },
  });

  useEffect(() => {
    if (!id || !supabase) return;
    supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (!data) return;
        setTitle(data.title);
        setSlug(data.slug);
        setSlugManual(true);
        setExcerpt(data.excerpt ?? '');
        setTags((data.tags ?? []).join(', '));
        setCoverImage(data.cover_image ?? '');

        const body = data.body ?? '';
        // Detect format: if body starts with '<' it's HTML (rich), otherwise markdown
        if (body.trimStart().startsWith('<')) {
          setMode('rich');
          if (editor) editor.commands.setContent(body);
        } else {
          setMode('markdown');
          setMarkdown(body);
        }
      });
  }, [id, editor]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugManual) setSlug(toSlug(val));
  };

  const getBody = (): string => {
    if (mode === 'rich') return editor ? editor.getHTML() : '';
    return markdown;
  };

  const handleFormatWithAI = async () => {
    if (!supabase) return;
    const raw = getBody();
    if (!raw.trim()) { setError('Nothing to format yet.'); return; }

    setFormatting(true);
    setError('');

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setError('Not authenticated.'); setFormatting(false); return; }

    const { data, error: fnError } = await supabase.functions.invoke('format-post', {
      body: { content: raw, title, mode },
    });

    setFormatting(false);

    if (fnError || data?.error) {
      setError(data?.error ?? fnError?.message ?? 'AI formatting failed.');
      return;
    }

    const formatted: string = data.formatted ?? '';
    if (mode === 'rich' && editor) {
      editor.commands.setContent(formatted);
    } else {
      setMarkdown(formatted);
    }
    setSuccess('Formatted! Review before saving.');
  };

  const handleSave = async (publish: boolean) => {
    if (!supabase) { setError('Supabase is not configured.'); return; }
    if (!title.trim() || !slug.trim()) { setError('Title and slug are required.'); return; }

    setSaving(true);
    setError('');
    setSuccess('');

    const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      body: getBody(),
      excerpt: excerpt.trim() || null,
      tags: tagsArray,
      cover_image: coverImage.trim() || null,
      is_published: publish,
      published_at: publish ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (isNew) {
      result = await supabase.from('posts').insert(payload).select().single();
    } else {
      result = await supabase.from('posts').update(payload).eq('id', id!).select().single();
    }

    setSaving(false);

    if (result.error) { setError(result.error.message); return; }

    setSuccess(publish ? 'Published!' : 'Draft saved.');
    if (isNew && result.data?.id) {
      navigate(`/admin/edit/${result.data.id}`, { replace: true });
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>{isNew ? 'New Post' : 'Edit Post'}</h1>
        <div className="admin-header-actions">
          <button className="admin-btn admin-btn-secondary" onClick={() => navigate('/admin')}>
            ← Dashboard
          </button>
        </div>
      </header>

      <div className="admin-editor-layout">
        <div className="admin-editor-fields">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={e => handleTitleChange(e.target.value)}
            placeholder="Post title"
          />

          <label>Slug</label>
          <input
            type="text"
            value={slug}
            onChange={e => { setSlug(e.target.value); setSlugManual(true); }}
            placeholder="post-slug"
          />

          <label>Excerpt</label>
          <input
            type="text"
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            placeholder="Short description (optional)"
          />

          <label>Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="tech, design, life"
          />

          <label>Cover Image URL</label>
          <input
            type="url"
            value={coverImage}
            onChange={e => setCoverImage(e.target.value)}
            placeholder="https://…"
          />
        </div>

        <div className="admin-editor-body">
          <div className="admin-editor-body-header">
            <label>Body</label>
            <div className="admin-mode-toggle">
              <button
                type="button"
                className={`admin-mode-btn${mode === 'rich' ? ' active' : ''}`}
                onClick={() => setMode('rich')}
              >
                Rich Text
              </button>
              <button
                type="button"
                className={`admin-mode-btn${mode === 'markdown' ? ' active' : ''}`}
                onClick={() => setMode('markdown')}
              >
                Markdown
              </button>
            </div>
          </div>

          {mode === 'rich' && (
            <div className="tiptap-wrapper">
              <Toolbar editor={editor} />
              <EditorContent editor={editor} />
            </div>
          )}

          {mode === 'markdown' && (
            <div className="admin-split-pane">
              <div className="admin-split-left">
                <textarea
                  className="admin-body-textarea"
                  value={markdown}
                  onChange={e => setMarkdown(e.target.value)}
                  placeholder="Write your post in Markdown…"
                />
              </div>
              <div className="admin-split-right">
                <div className="admin-preview blogpost-body">
                  {markdown
                    ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
                    : <p className="admin-preview-empty">Preview will appear here…</p>
                  }
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {error && <p className="admin-error">{error}</p>}
      {success && <p className="admin-success">{success}</p>}

      <div className="admin-editor-actions">
        <button
          className="admin-btn admin-btn-secondary"
          onClick={() => handleSave(false)}
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Save Draft'}
        </button>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => handleSave(true)}
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Publish'}
        </button>
      </div>
    </div>
  );
};

export default AdminEditor;
