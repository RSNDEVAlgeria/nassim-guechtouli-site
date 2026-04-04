import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase, Project, SocialLink } from '../lib/supabase'
import './Admin.css'

const PROJECTS_BUCKET = import.meta.env.VITE_SUPABASE_PROJECTS_BUCKET || 'projects'

type Tab = 'projects' | 'skills' | 'socials' | 'site'

interface ProjectFormData {
  title: string
  category: string
  year: string
  tags: string
  color: string
  gradient: string
  description: string
  size: string
  image: string
  link: string
}

interface SocialFormData {
  name: string
  handle: string
  href: string
  icon: string
  color: string
}

const ADMIN_EMAIL = 'nassim@gmail.com'
const ADMIN_PASSWORD = 'nassimkchkch'

const gradientOptions = [
  'linear-gradient(135deg, #1a3a5c 0%, #0d1530 100%)',
  'linear-gradient(135deg, #2d1b5c 0%, #1a0d30 100%)',
  'linear-gradient(135deg, #5c1a1a 0%, #300d0d 100%)',
  'linear-gradient(135deg, #1a3a2d 0%, #0d1a15 100%)',
  'linear-gradient(135deg, #5c3a1a 0%, #301e0d 100%)',
  'linear-gradient(135deg, #1a2e5c 0%, #0d1530 100%)',
]

const colorOptions = [
  '#63b3ed', '#9f7aea', '#fc8181', '#68d391', '#f6ad55', '#ed64a6', '#4fd1c5'
]

const categoryOptions = ['All', 'Branding', 'UI/UX', 'Print', 'Motion']
const sizeOptions = ['small', 'medium', 'large']

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [activeTab, setActiveTab] = useState<Tab>('projects')
  const [projects, setProjects] = useState<Project[]>([])
  const [socials, setSocials] = useState<SocialLink[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [activeTab, isAuthenticated])

  function handleLogin(email: string, password: string) {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setLoginError('')
    } else {
      setLoginError('Invalid email or password')
    }
  }

  function handleLogout() {
    setIsAuthenticated(false)
    window.location.href = '/'
  }

  async function loadData() {
    setLoading(true)
    if (activeTab === 'projects') {
      const { data } = await supabase.from('projects').select('*').order('order_index')
      setProjects(data || [])
    } else if (activeTab === 'socials') {
      const { data } = await supabase.from('social_links').select('*').order('order_index')
      setSocials(data || [])
    }
    setLoading(false)
  }

  async function saveProject(data: ProjectFormData) {
    setSaving(true)
    const tags = data.tags.split(',').map(t => t.trim()).filter(t => t)
    const payload = {
      title: data.title,
      category: data.category,
      year: data.year,
      tags,
      color: data.color,
      gradient: data.gradient,
      accent: data.color + '33',
      description: data.description,
      size: data.size as 'small' | 'medium' | 'large',
      image: data.image || null,
      link: data.link || null,
    }
    if (editingId) {
      await supabase.from('projects').update(payload).eq('id', editingId)
    } else {
      await supabase.from('projects').insert([{ ...payload, order_index: projects.length + 1 }])
    }
    setEditingId(null)
    loadData()
    setSaving(false)
  }

  async function deleteProject(id: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      await supabase.from('projects').delete().eq('id', id)
      loadData()
    }
  }

  async function saveSocial(data: SocialFormData) {
    setSaving(true)
    if (editingId) {
      await supabase.from('social_links').update(data).eq('id', editingId)
    } else {
      await supabase.from('social_links').insert([{ ...data, order_index: socials.length + 1 }])
    }
    setEditingId(null)
    loadData()
    setSaving(false)
  }

  async function deleteSocial(id: number) {
    if (confirm('Are you sure you want to delete this social link?')) {
      await supabase.from('social_links').delete().eq('id', id)
      loadData()
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <motion.div 
          className="login-box glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="login-logo">NG<span className="login-dot">.</span></div>
          <h2>Admin Login</h2>
          <p className="login-subtitle">Enter your credentials to access the admin panel</p>
          <LoginForm onSubmit={handleLogin} error={loginError} />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="admin-container">
      <motion.div 
        className="admin-sidebar"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <div className="admin-sidebar-top">
          <a href="/" className="admin-logo">NG<span className="admin-dot">.</span></a>
          <button className="admin-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <nav className="admin-nav" aria-label="Admin sections">
          <button className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}>
            Projects
          </button>
          <button className={activeTab === 'skills' ? 'active' : ''} onClick={() => setActiveTab('skills')}>
            Skills
          </button>
          <button className={activeTab === 'socials' ? 'active' : ''} onClick={() => setActiveTab('socials')}>
            Social Links
          </button>
          <button className={activeTab === 'site' ? 'active' : ''} onClick={() => setActiveTab('site')}>
            Site Info
          </button>
        </nav>
        <a href="/" className="admin-back">
          ← Back to Site
        </a>
      </motion.div>

      <motion.div 
        className="admin-main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <header className="admin-header">
          <div>
            <p className="admin-kicker">Admin</p>
            <h1>{activeTab === 'projects' ? 'Projects' : activeTab === 'skills' ? 'Skills' : activeTab === 'socials' ? 'Social Links' : 'Site Info'}</h1>
          </div>
          <div className="admin-header-actions">
            <button className="admin-ghost" onClick={handleLogout}>Logout</button>
          </div>
        </header>

        <div className="admin-content">
          {activeTab === 'projects' && (
            <ProjectsTab 
              projects={projects} 
              loading={loading}
              onEdit={(p: Project) => { setEditingId(p.id); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              onDelete={deleteProject}
              onSave={saveProject}
              saving={saving}
              editingId={editingId}
              onCancelEdit={() => setEditingId(null)}
              gradientOptions={gradientOptions}
              colorOptions={colorOptions}
              categoryOptions={categoryOptions}
              sizeOptions={sizeOptions}
            />
          )}
          {activeTab === 'skills' && <SkillsTab />}
          {activeTab === 'socials' && (
            <SocialsTab 
              socials={socials}
              loading={loading}
              onEdit={(s: SocialLink) => { setEditingId(s.id); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              onDelete={deleteSocial}
              onSave={saveSocial}
              saving={saving}
              editingId={editingId}
              onCancelEdit={() => setEditingId(null)}
              colorOptions={colorOptions}
            />
          )}
          {activeTab === 'site' && <SiteInfoTab />}
        </div>
      </motion.div>
    </div>
  )
}

function LoginForm({ onSubmit, error }: { onSubmit: (email: string, password: string) => void, error: string }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(email, password)
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="admin@example.com"
          required 
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="••••••••"
          required 
        />
      </div>
      {error && <p className="login-error">{error}</p>}
      <button type="submit" className="login-btn">
        Sign In
      </button>
    </form>
  )
}

function ProjectsTab({ 
  projects, loading, onEdit, onDelete, onSave, saving, editingId, onCancelEdit,
  gradientOptions, colorOptions, categoryOptions, sizeOptions 
}: any) {
  const [form, setForm] = useState<ProjectFormData>({
    title: '', category: 'Branding', year: '2024', tags: '', color: '#63b3ed',
    gradient: gradientOptions[0], description: '', size: 'medium', image: '', link: ''
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  useEffect(() => {
    if (editingId) {
      const p = projects.find((x: Project) => x.id === editingId)
      if (p) setForm({ ...p, tags: p.tags.join(', ') })
    }
  }, [editingId, projects])

  function handleColorClick(color: string) {
    setForm({ ...form, color })
  }

  function handleGradientChange(gradient: string) {
    setForm({ ...form, gradient })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    let imageUrl = form.image
    setUploadError('')

    if (selectedFile) {
      setUploading(true)
      const safeName = selectedFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const filePath = `projects/${Date.now()}-${safeName}`
      const { error: uploadError } = await supabase
        .storage
        .from(PROJECTS_BUCKET)
        .upload(filePath, selectedFile, {
          upsert: true,
          contentType: selectedFile.type || 'image/jpeg',
          cacheControl: '3600',
        })

      if (uploadError) {
        console.error('Supabase upload error', uploadError)
        setUploadError(uploadError.message || `Image upload failed. Check storage policies for bucket "${PROJECTS_BUCKET}".`)
        setUploading(false)
        return
      }

      const { data } = supabase.storage.from(PROJECTS_BUCKET).getPublicUrl(filePath)
      imageUrl = data.publicUrl
      setUploading(false)
    }

    onSave({ ...form, image: imageUrl })
    if (!editingId) {
      setForm({ title: '', category: 'Branding', year: '2024', tags: '', color: '#63b3ed', gradient: gradientOptions[0], description: '', size: 'medium', image: '', link: '' })
      setSelectedFile(null)
    }
  }

  if (loading) return <div className="admin-loading">Loading...</div>

  return (
    <div>
      <form className="admin-form glass" onSubmit={handleSubmit}>
        <h3>{editingId ? 'Edit Project' : 'Add New Project'}</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Title</label>
            <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              {categoryOptions.filter((c: string) => c !== 'All').map((c: string) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Year</label>
            <input value={form.year} onChange={e => setForm({...form, year: e.target.value})} required />
          </div>
            <div className="form-group">
            <label>Size</label>
            <select value={form.size} onChange={e => setForm({...form, size: e.target.value})}>
              {sizeOptions.map((s: string) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Color</label>
            <div className="color-options">
              {colorOptions.map((c: string) => (
                <button type="button" key={c} className={`color-btn ${form.color === c ? 'selected' : ''}`}
                  style={{ background: c }} onClick={() => handleColorClick(c)} />
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Gradient</label>
            <select value={form.gradient} onChange={e => handleGradientChange(e.target.value)}>
              {gradientOptions.map((g: string) => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div className="form-group full">
            <label>Tags (comma separated)</label>
            <input value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="Logo, Brand System, Typography" />
          </div>
          <div className="form-group full">
            <label>Description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} />
          </div>
          <div className="form-group">
            <label>Project Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setSelectedFile(e.target.files?.[0] || null)}
            />
            <input
              value={form.image}
              onChange={e => setForm({ ...form, image: e.target.value })}
              placeholder="Or paste an existing image URL"
            />
            {selectedFile && <p className="admin-hint">Selected: {selectedFile.name}</p>}
            {uploadError && <p className="login-error" style={{ marginTop: 4 }}>{uploadError}</p>}
          </div>
          <div className="form-group">
            <label>Project Link</label>
            <input value={form.link} onChange={e => setForm({...form, link: e.target.value})} placeholder="https://example.com" />
          </div>
        </div>
        <div className="form-actions">
          {editingId && <button type="button" className="btn-cancel" onClick={onCancelEdit}>Cancel</button>}
          <button type="submit" className="btn-save" disabled={saving || uploading}>
            {uploading ? 'Uploading...' : saving ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
          </button>
        </div>
      </form>

      <div className="admin-list">
        {projects.length === 0 ? (
          <div className="empty-state">
            <p>No projects yet. Add your first project above.</p>
          </div>
        ) : (
          projects.map((p: Project) => (
            <div key={p.id} className="admin-item glass">
              <div className="item-preview" style={{ background: p.gradient }}>
                <span style={{ color: p.color }}>{p.title[0]}</span>
              </div>
              <div className="item-info">
                <h4>{p.title}</h4>
                <span>{p.category} · {p.year}</span>
              </div>
              <div className="item-actions">
                <button onClick={() => onEdit(p)}>Edit</button>
                <button className="btn-danger" onClick={() => onDelete(p.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function SkillsTab() {
  return (
    <div className="admin-info-box glass">
      <p>Skills are currently hardcoded in the source. To make them editable, a database table would need to be added to Supabase.</p>
      <p className="admin-hint">Location: src/components/Skills.tsx</p>
    </div>
  )
}

function SocialsTab({ 
  socials, loading, onEdit, onDelete, onSave, saving, editingId, onCancelEdit, colorOptions 
}: any) {
  const [form, setForm] = useState<SocialFormData>({ name: '', handle: '', href: '', icon: 'link', color: '#63b3ed' })

  useEffect(() => {
    if (editingId) {
      const s = socials.find((x: SocialLink) => x.id === editingId)
      if (s) setForm(s)
    }
  }, [editingId, socials])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave(form)
    if (!editingId) {
      setForm({ name: '', handle: '', href: '', icon: 'link', color: '#63b3ed' })
    }
  }

  if (loading) return <div className="admin-loading">Loading...</div>

  return (
    <div>
      <form className="admin-form glass" onSubmit={handleSubmit}>
        <h3>{editingId ? 'Edit Social Link' : 'Add New Social Link'}</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Name</label>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Handle</label>
            <input value={form.handle} onChange={e => setForm({...form, handle: e.target.value})} required />
          </div>
          <div className="form-group full">
            <label>URL</label>
            <input value={form.href} onChange={e => setForm({...form, href: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Color</label>
            <div className="color-options">
              {colorOptions.map((c: string) => (
                <button type="button" key={c} className={`color-btn ${form.color === c ? 'selected' : ''}`}
                  style={{ background: c }} onClick={() => setForm({...form, color: c})} />
              ))}
            </div>
          </div>
        </div>
        <div className="form-actions">
          {editingId && <button type="button" className="btn-cancel" onClick={onCancelEdit}>Cancel</button>}
          <button type="submit" className="btn-save" disabled={saving}>{saving ? 'Saving...' : editingId ? 'Update Link' : 'Add Link'}</button>
        </div>
      </form>

      <div className="admin-list">
        {socials.length === 0 ? (
          <div className="empty-state">
            <p>No social links yet. Add your first link above.</p>
          </div>
        ) : (
          socials.map((s: SocialLink) => (
            <div key={s.id} className="admin-item glass">
              <div className="item-icon" style={{ color: s.color }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              </div>
              <div className="item-info">
                <h4>{s.name}</h4>
                <span>{s.handle}</span>
              </div>
              <div className="item-actions">
                <button onClick={() => onEdit(s)}>Edit</button>
                <button className="btn-danger" onClick={() => onDelete(s.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function SiteInfoTab() {
  return (
    <div className="admin-info-box glass">
      <p>Site info (hero, about, availability) is currently hardcoded in the components. To make it editable, a database table would need to be added to Supabase.</p>
      <p className="admin-hint">Location: src/components/Hero.tsx, About.tsx, Contact.tsx</p>
    </div>
  )
}
