'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, ServiceItem, ProjectItem } from '@/types/content';
import { siteContent, companyData } from '@/data/content';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  LayoutDashboard,
  Layers,
  FolderKanban,
  MessageSquare,
  Image as ImageIcon,
  PhoneCall,
  Settings,
  Sparkles,
  Save,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Globe,
  Lock,
  Unlock,
  Download,
  Upload,
  RefreshCw,
  Mail,
  Clock,
  Eye,
  Copy,
  Check,
  FileImage,
  UploadCloud,
  ChevronRight,
  Maximize2,
} from 'lucide-react';

interface AdminDashboardProps {
  initialLocale: Locale;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  services: string[];
  budget?: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'in_progress' | 'archived';
  notes?: string;
}

interface MediaItem {
  url: string;
  name: string;
  folder: 'images' | 'uploads';
  size: number;
  updatedAt: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ initialLocale }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab: 'overview' | 'media' | 'hero' | 'services' | 'projects' | 'inquiries' | 'contacts' | 'settings'
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [editingLang, setEditingLang] = useState<Locale>('en');

  // Working state for content and company data
  const [content, setContent] = useState(siteContent);
  const [company, setCompany] = useState(companyData);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Image Upload States
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [mediaFilter, setMediaFilter] = useState<'all' | 'uploads' | 'images'>('all');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [cacheBuster, setCacheBuster] = useState<number>(Date.now());
  const [previewModalUrl, setPreviewModalUrl] = useState<string | null>(null);

  const generalFileInputRef = useRef<HTMLInputElement | null>(null);

  // Load inquiries, media, and stored content on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem('mm_admin_auth');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
    }
    fetchData();
    fetchMedia();
  }, []);

  const fetchData = async () => {
    try {
      const [contentRes, inqRes] = await Promise.all([
        fetch('/api/admin/content'),
        fetch('/api/admin/inquiries'),
      ]);

      if (contentRes.ok) {
        const data = await contentRes.json();
        if (data.content) setContent(data.content);
        if (data.company) setCompany(data.company);
      }

      if (inqRes.ok) {
        const inqData = await inqRes.json();
        if (inqData.inquiries) setInquiries(inqData.inquiries);
      }
    } catch (e) {
      console.error('Failed to load dynamic store:', e);
    }
  };

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/admin/media');
      if (res.ok) {
        const data = await res.json();
        if (data.media) setMediaList(data.media);
      }
    } catch (e) {
      console.error('Failed to load media list:', e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'melon2026' || passcode === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('mm_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid passcode. Default passcode is: melon2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('mm_admin_auth');
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, company }),
      });

      if (res.ok) {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
    }
  };

  // Direct File Upload Handler
  const handleFileUpload = async (file: File, slot: string) => {
    if (!file) return;
    setUploadingSlot(slot);
    setUploadMessage(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('slot', slot);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setUploadMessage({
          type: 'success',
          text: `Image updated successfully (${data.fileName})! Website graphics reloaded.`,
        });
        setCacheBuster(Date.now());
        await fetchMedia();
        setTimeout(() => setUploadMessage(null), 4000);
      } else {
        setUploadMessage({
          type: 'error',
          text: data.error || 'Failed to upload image. Please try again.',
        });
      }
    } catch (err) {
      setUploadMessage({
        type: 'error',
        text: 'Network error while uploading image.',
      });
    } finally {
      setUploadingSlot(null);
    }
  };

  // Delete uploaded file from server
  const handleDeleteMedia = async (url: string) => {
    if (!confirm('Are you sure you want to delete this uploaded image from the server?')) return;
    try {
      const res = await fetch(`/api/admin/media?url=${encodeURIComponent(url)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setMediaList((prev) => prev.filter((item) => item.url !== url));
        setUploadMessage({ type: 'success', text: 'Image deleted from uploads.' });
        setTimeout(() => setUploadMessage(null), 3000);
      } else {
        const err = await res.json();
        alert(err.error || 'Cannot delete this file.');
      }
    } catch (e) {
      console.error('Delete media error:', e);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const updateInquiryState = async (id: string, newStatus: Inquiry['status']) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        );
      }
    } catch (e) {
      console.error('Error updating inquiry status:', e);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      }
    } catch (e) {
      console.error('Error deleting inquiry:', e);
    }
  };

  const exportBackupJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify({ content, company, inquiries }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `marketing_melon_cms_backup_${new Date().toISOString().split('T')[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#14171A] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#1C2128] border border-[#2D333B] rounded-3xl p-8 shadow-2xl text-white space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-[#1E6B27]/30 border border-[#1E6B27] text-[#80ED99] flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black">Marketing Melon CMS</h1>
            <p className="text-xs text-[#8C959F]">
              WordPress-style Control Panel for Agency Content, Media & 3D Graphics
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8C959F]">
                Admin Passcode
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#22272E] border border-[#373E47] text-white text-sm focus:border-[#FF3B53] focus:ring-1 focus:ring-[#FF3B53] outline-none"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              icon={<Unlock className="w-4 h-4" />}
            >
              Access Dashboard
            </Button>

            <div className="text-center">
              <Link
                href="/"
                className="text-xs text-[#8C959F] hover:text-white underline inline-flex items-center gap-1"
              >
                <span>Return to Public Website</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const currentLangContent = content[editingLang];
  const filteredMedia = mediaList.filter((item) => {
    if (mediaFilter === 'all') return true;
    return item.folder === mediaFilter;
  });

  return (
    <div className="min-h-screen bg-[#F0EFEA] flex flex-col font-sans text-[#14171A]">
      {/* GLOBAL TOAST MESSAGE */}
      {uploadMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border text-sm font-semibold animate-bounce ${
            uploadMessage.type === 'success'
              ? 'bg-[#1E6B27] border-[#80ED99] text-white'
              : 'bg-[#FF3B53] border-white text-white'
          }`}
        >
          {uploadMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-[#80ED99]" />
          ) : (
            <AlertCircle className="w-5 h-5 text-white" />
          )}
          <span>{uploadMessage.text}</span>
        </div>
      )}

      {/* IMAGE PREVIEW MODAL */}
      {previewModalUrl && (
        <div
          onClick={() => setPreviewModalUrl(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] bg-[#1C2128] border border-[#2D333B] p-4 rounded-3xl shadow-2xl flex flex-col items-center gap-4"
          >
            <div className="flex items-center justify-between w-full text-white px-2">
              <span className="text-xs font-mono truncate">{previewModalUrl}</span>
              <button
                onClick={() => setPreviewModalUrl(null)}
                className="text-xs px-2 py-1 rounded bg-[#2D333B] hover:bg-[#FF3B53]"
              >
                Close (ESC)
              </button>
            </div>
            <div className="relative w-full max-h-[70vh] flex items-center justify-center overflow-auto p-4 bg-[#14171A] rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${previewModalUrl}?v=${cacheBuster}`}
                alt="Preview"
                className="max-h-[60vh] w-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* TOP CMS BAR */}
      <header className="bg-[#14171A] text-white px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-[#2D333B] sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-black text-lg tracking-tight hover:opacity-90 transition-opacity"
          >
            <span className="w-3 h-3 rounded-full bg-[#FF3B53] animate-pulse" />
            <span>Marketing Melon CMS</span>
          </Link>
          <Badge variant="coral" size="sm">
            WordPress-Style Control Panel
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switcher for content fields */}
          <div className="bg-[#1C2128] border border-[#2D333B] p-1 rounded-xl flex items-center text-xs">
            <button
              onClick={() => setEditingLang('en')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                editingLang === 'en'
                  ? 'bg-[#FF3B53] text-white'
                  : 'text-[#8C959F] hover:text-white'
              }`}
            >
              English (EN)
            </button>
            <button
              onClick={() => setEditingLang('ar')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                editingLang === 'ar'
                  ? 'bg-[#1E6B27] text-white'
                  : 'text-[#8C959F] hover:text-white'
              }`}
            >
              العربية (AR)
            </button>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            variant="primary"
            size="sm"
            disabled={saveStatus === 'saving'}
            icon={
              saveStatus === 'saving' ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : saveStatus === 'saved' ? (
                <CheckCircle2 className="w-4 h-4 text-white" />
              ) : (
                <Save className="w-4 h-4" />
              )
            }
          >
            {saveStatus === 'saving'
              ? 'Saving Changes...'
              : saveStatus === 'saved'
              ? 'Published Live!'
              : 'Save & Publish'}
          </Button>

          <button
            onClick={handleLogout}
            className="text-xs text-[#8C959F] hover:text-rose-400 px-2 py-1 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* DASHBOARD LAYOUT */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-64 bg-[#1C2128] text-white p-4 border-r border-[#2D333B] shrink-0 space-y-6">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C959F] px-3 mb-2">
              Website Management
            </div>
            <nav className="space-y-1">
              {[
                { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
                { id: 'media', label: '📸 Change Images & Media', icon: ImageIcon, highlight: true },
                { id: 'hero', label: 'Hero & 3D Artwork', icon: Sparkles },
                { id: 'services', label: 'Services (5 Pillars)', icon: Layers },
                { id: 'projects', label: 'Projects & Case Studies', icon: FolderKanban },
                {
                  id: 'inquiries',
                  label: 'Leads & Inquiries',
                  icon: MessageSquare,
                  badge: inquiries.filter((i) => i.status === 'new').length,
                },
                { id: 'contacts', label: 'Regional Contacts & Social', icon: PhoneCall },
                { id: 'settings', label: 'Export / Backup CMS', icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[#FF3B53] text-white shadow-lg'
                        : item.highlight
                        ? 'text-[#80ED99] hover:bg-[#22272E]'
                        : 'text-[#8C959F] hover:text-white hover:bg-[#22272E]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-[#1E6B27] text-white text-[10px] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Links */}
          <div className="pt-4 border-t border-[#2D333B] space-y-2 text-xs text-[#8C959F]">
            <div className="px-3 font-bold uppercase tracking-wider text-[10px]">
              Live Previews
            </div>
            <Link
              href="/en"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#22272E] hover:text-white transition-colors"
            >
              <span>View English Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/ar"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#22272E] hover:text-white transition-colors"
            >
              <span>View Arabic Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-[#14171A]">Agency Control Center</h1>
                  <p className="text-sm text-[#586069] mt-1">
                    Manage real-time graphics, 3D mascots, bilingual copy, and prospective client inquiries.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setActiveTab('media')}
                    variant="primary"
                    size="sm"
                    icon={<ImageIcon className="w-4 h-4" />}
                  >
                    Change Images
                  </Button>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] shadow-sm space-y-2">
                  <div className="text-xs font-bold uppercase text-[#8C959F]">New Inquiries</div>
                  <div className="text-3xl font-black text-[#FF3B53]">
                    {inquiries.filter((i) => i.status === 'new').length}
                  </div>
                  <div className="text-xs text-[#586069] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#FF3B53]" />
                    <span>Real-time Form Submissions</span>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] shadow-sm space-y-2">
                  <div className="text-xs font-bold uppercase text-[#8C959F]">Active Service Pillars</div>
                  <div className="text-3xl font-black text-[#1E6B27]">5 Pillars</div>
                  <div className="text-xs text-[#586069]">Verified Agency Capabilities</div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] shadow-sm space-y-2">
                  <div className="text-xs font-bold uppercase text-[#8C959F]">Verified Case Studies</div>
                  <div className="text-3xl font-black text-[#14171A]">
                    {content.en.projects.length}
                  </div>
                  <div className="text-xs text-[#586069]">e.g. Al Eairy Residence</div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] shadow-sm space-y-2">
                  <div className="text-xs font-bold uppercase text-[#8C959F]">Graphics & Media Assets</div>
                  <div className="text-3xl font-black text-[#14171A]">
                    {mediaList.length} Files
                  </div>
                  <div className="text-xs text-[#586069]">Uploads & Brand Assets</div>
                </div>
              </div>

              {/* Quick Actions & Image Slots Highlights */}
              <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-[#14171A]">
                    Live Website Graphics Slots
                  </h3>
                  <button
                    onClick={() => setActiveTab('media')}
                    className="text-xs font-bold text-[#FF3B53] hover:underline flex items-center gap-1"
                  >
                    <span>Manage all images</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Mascot Slot */}
                  <div className="p-4 rounded-2xl bg-[#FAF8EF] border border-[#EBE8DE] text-center space-y-3">
                    <div className="text-xs font-bold text-[#14171A]">3D Hero Mascots</div>
                    <div className="h-24 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/images/mascots-3d-transparent.png?v=${cacheBuster}`}
                        alt="3D Mascots"
                        className="max-h-20 w-auto object-contain drop-shadow"
                      />
                    </div>
                    <button
                      onClick={() => setActiveTab('media')}
                      className="w-full py-1.5 px-3 rounded-lg bg-white border border-[#EBE8DE] text-xs font-bold text-[#14171A] hover:bg-[#FF3B53] hover:text-white transition-colors"
                    >
                      Change Mascot
                    </button>
                  </div>

                  {/* Banner Slot */}
                  <div className="p-4 rounded-2xl bg-[#FAF8EF] border border-[#EBE8DE] text-center space-y-3">
                    <div className="text-xs font-bold text-[#14171A]">Hero 3D Banner</div>
                    <div className="h-24 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/images/hero-3d-banner.png?v=${cacheBuster}`}
                        alt="Hero 3D Banner"
                        className="max-h-20 w-auto object-contain rounded"
                      />
                    </div>
                    <button
                      onClick={() => setActiveTab('media')}
                      className="w-full py-1.5 px-3 rounded-lg bg-white border border-[#EBE8DE] text-xs font-bold text-[#14171A] hover:bg-[#FF3B53] hover:text-white transition-colors"
                    >
                      Change Banner
                    </button>
                  </div>

                  {/* Logo Light */}
                  <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EBE8DE] text-center space-y-3">
                    <div className="text-xs font-bold text-[#14171A]">Logo (Light Canvas)</div>
                    <div className="h-24 flex items-center justify-center p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/images/logo-transparent.png?v=${cacheBuster}`}
                        alt="Logo Transparent"
                        className="max-h-12 w-auto object-contain"
                      />
                    </div>
                    <button
                      onClick={() => setActiveTab('media')}
                      className="w-full py-1.5 px-3 rounded-lg bg-white border border-[#EBE8DE] text-xs font-bold text-[#14171A] hover:bg-[#FF3B53] hover:text-white transition-colors"
                    >
                      Change Logo
                    </button>
                  </div>

                  {/* Logo Dark */}
                  <div className="p-4 rounded-2xl bg-[#0B1E19] border border-[#143D32] text-center space-y-3">
                    <div className="text-xs font-bold text-[#80ED99]">Logo (Dark Footer)</div>
                    <div className="h-24 flex items-center justify-center p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/images/logo-white.png?v=${cacheBuster}`}
                        alt="Logo White"
                        className="max-h-12 w-auto object-contain"
                      />
                    </div>
                    <button
                      onClick={() => setActiveTab('media')}
                      className="w-full py-1.5 px-3 rounded-lg bg-[#143D32] border border-[#215749] text-xs font-bold text-white hover:bg-[#FF3B53] transition-colors"
                    >
                      Change Dark Logo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DEDICATED MEDIA & IMAGE MANAGER */}
          {activeTab === 'media' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h1 className="text-3xl font-black text-[#14171A]">
                  Website Image & Graphic Controller
                </h1>
                <p className="text-sm text-[#586069] mt-1">
                  Upload new images, replace any core graphic across the site with 1 click, or browse the media library.
                </p>
              </div>

              {/* SECTION 1: CORE WEBSITE IMAGE SLOTS */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#14171A] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#FF3B53]" />
                    <span>Core Graphic Slots (Direct Overwrite & Instant Live Update)</span>
                  </h2>
                  <span className="text-xs text-[#586069]">
                    Replacing these slots updates the live website immediately
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Slot 1: 3D Hero Mascots */}
                  <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase text-[#14171A]">
                          1. 3D Hero Mascots
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1E6B27]/10 text-[#1E6B27] font-bold">
                          Live on Hero
                        </span>
                      </div>
                      <p className="text-xs text-[#586069]">
                        Isolated 3D watermelon characters for the interactive 3D hero stage.
                      </p>
                      <div className="relative h-44 rounded-2xl bg-[#FAF8EF] border border-[#EBE8DE] flex items-center justify-center p-3 group overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/images/mascots-3d-transparent.png?v=${cacheBuster}`}
                          alt="3D Mascots"
                          className="max-h-36 w-auto object-contain drop-shadow-md"
                        />
                        <button
                          onClick={() => setPreviewModalUrl('/images/mascots-3d-transparent.png')}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold gap-1 transition-opacity"
                        >
                          <Maximize2 className="w-4 h-4" /> View Full
                        </button>
                      </div>
                      <div className="text-[11px] font-mono text-[#8C959F] truncate">
                        /images/mascots-3d-transparent.png
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#EBE8DE]">
                      <label className="w-full cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#14171A] text-white text-xs font-bold hover:bg-[#FF3B53] transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>
                          {uploadingSlot === 'slot-mascots'
                            ? 'Uploading...'
                            : 'Upload & Replace Mascot'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, 'slot-mascots');
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Slot 2: 3D Hero Banner */}
                  <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase text-[#14171A]">
                          2. 3D Hero Cinematic Banner
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1E6B27]/10 text-[#1E6B27] font-bold">
                          Live on Hero
                        </span>
                      </div>
                      <p className="text-xs text-[#586069]">
                        Full widescreen cinematic 3D artwork displayed in banner mode.
                      </p>
                      <div className="relative h-44 rounded-2xl bg-[#FAF8EF] border border-[#EBE8DE] flex items-center justify-center p-3 group overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/images/hero-3d-banner.png?v=${cacheBuster}`}
                          alt="Hero 3D Banner"
                          className="max-h-36 w-full object-contain rounded"
                        />
                        <button
                          onClick={() => setPreviewModalUrl('/images/hero-3d-banner.png')}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold gap-1 transition-opacity"
                        >
                          <Maximize2 className="w-4 h-4" /> View Full
                        </button>
                      </div>
                      <div className="text-[11px] font-mono text-[#8C959F] truncate">
                        /images/hero-3d-banner.png
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#EBE8DE]">
                      <label className="w-full cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#14171A] text-white text-xs font-bold hover:bg-[#FF3B53] transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>
                          {uploadingSlot === 'slot-banner'
                            ? 'Uploading...'
                            : 'Upload & Replace Banner'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, 'slot-banner');
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Slot 3: Logo Light */}
                  <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase text-[#14171A]">
                          3. Official Logo (Light Canvas)
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1E6B27]/10 text-[#1E6B27] font-bold">
                          Navbar & Header
                        </span>
                      </div>
                      <p className="text-xs text-[#586069]">
                        Green typography & red slice logo for bright page backgrounds.
                      </p>
                      <div className="relative h-44 rounded-2xl bg-[#FAF9F5] border border-[#EBE8DE] flex items-center justify-center p-4 group overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/images/logo-transparent.png?v=${cacheBuster}`}
                          alt="Logo Transparent"
                          className="max-h-20 w-auto object-contain"
                        />
                        <button
                          onClick={() => setPreviewModalUrl('/images/logo-transparent.png')}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold gap-1 transition-opacity"
                        >
                          <Maximize2 className="w-4 h-4" /> View Full
                        </button>
                      </div>
                      <div className="text-[11px] font-mono text-[#8C959F] truncate">
                        /images/logo-transparent.png
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#EBE8DE]">
                      <label className="w-full cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#14171A] text-white text-xs font-bold hover:bg-[#FF3B53] transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>
                          {uploadingSlot === 'slot-logo-transparent'
                            ? 'Uploading...'
                            : 'Upload & Replace Logo'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, 'slot-logo-transparent');
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Slot 4: Logo Dark */}
                  <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase text-[#14171A]">
                          4. Official Logo (Dark Canvas)
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1E6B27]/10 text-[#1E6B27] font-bold">
                          Footer
                        </span>
                      </div>
                      <p className="text-xs text-[#586069]">
                        White typography version for dark green footer and contrast zones.
                      </p>
                      <div className="relative h-44 rounded-2xl bg-[#0B1E19] border border-[#143D32] flex items-center justify-center p-4 group overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/images/logo-white.png?v=${cacheBuster}`}
                          alt="Logo White"
                          className="max-h-20 w-auto object-contain"
                        />
                        <button
                          onClick={() => setPreviewModalUrl('/images/logo-white.png')}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold gap-1 transition-opacity"
                        >
                          <Maximize2 className="w-4 h-4" /> View Full
                        </button>
                      </div>
                      <div className="text-[11px] font-mono text-[#8C959F] truncate">
                        /images/logo-white.png
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#EBE8DE]">
                      <label className="w-full cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#14171A] text-white text-xs font-bold hover:bg-[#FF3B53] transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>
                          {uploadingSlot === 'slot-logo-white'
                            ? 'Uploading...'
                            : 'Upload & Replace Dark Logo'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, 'slot-logo-white');
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Slot 5: 3D Floating Emblem */}
                  <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase text-[#14171A]">
                          5. 3D Floating Melon Emblem
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1E6B27]/10 text-[#1E6B27] font-bold">
                          Hero & Badges
                        </span>
                      </div>
                      <p className="text-xs text-[#586069]">
                        3D Watermelon slice icon used in animated badges and accents.
                      </p>
                      <div className="relative h-44 rounded-2xl bg-[#FAF8EF] border border-[#EBE8DE] flex items-center justify-center p-4 group overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/images/emblem-3d.png?v=${cacheBuster}`}
                          alt="3D Emblem"
                          className="max-h-24 w-auto object-contain animate-bounce"
                        />
                        <button
                          onClick={() => setPreviewModalUrl('/images/emblem-3d.png')}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold gap-1 transition-opacity"
                        >
                          <Maximize2 className="w-4 h-4" /> View Full
                        </button>
                      </div>
                      <div className="text-[11px] font-mono text-[#8C959F] truncate">
                        /images/emblem-3d.png
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#EBE8DE]">
                      <label className="w-full cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#14171A] text-white text-xs font-bold hover:bg-[#FF3B53] transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>
                          {uploadingSlot === 'slot-emblem'
                            ? 'Uploading...'
                            : 'Upload & Replace Emblem'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, 'slot-emblem');
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: GENERAL MEDIA UPLOAD & GALLERY */}
              <div className="p-6 md:p-8 rounded-3xl bg-white border border-[#EBE8DE] shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black text-[#14171A] flex items-center gap-2">
                      <FileImage className="w-5 h-5 text-[#1E6B27]" />
                      <span>Media Library & Custom Uploads</span>
                    </h2>
                    <p className="text-xs text-[#586069] mt-0.5">
                      Upload case study photos, banners, team pictures, or campaign creatives.
                    </p>
                  </div>

                  {/* Upload Button */}
                  <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF3B53] text-white font-bold text-xs hover:bg-[#E0263E] cursor-pointer shadow-md transition-all">
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload New Image File</span>
                    <input
                      ref={generalFileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'general');
                      }}
                    />
                  </label>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center justify-between border-b border-[#EBE8DE] pb-3 text-xs">
                  <div className="flex items-center gap-2 font-bold">
                    <button
                      onClick={() => setMediaFilter('all')}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        mediaFilter === 'all'
                          ? 'bg-[#14171A] text-white'
                          : 'text-[#586069] hover:text-[#14171A]'
                      }`}
                    >
                      All Media ({mediaList.length})
                    </button>
                    <button
                      onClick={() => setMediaFilter('uploads')}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        mediaFilter === 'uploads'
                          ? 'bg-[#14171A] text-white'
                          : 'text-[#586069] hover:text-[#14171A]'
                      }`}
                    >
                      Custom Uploads ({mediaList.filter((m) => m.folder === 'uploads').length})
                    </button>
                    <button
                      onClick={() => setMediaFilter('images')}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        mediaFilter === 'images'
                          ? 'bg-[#14171A] text-white'
                          : 'text-[#586069] hover:text-[#14171A]'
                      }`}
                    >
                      Core System Presets ({mediaList.filter((m) => m.folder === 'images').length})
                    </button>
                  </div>

                  <button
                    onClick={fetchMedia}
                    className="text-[#586069] hover:text-[#14171A] flex items-center gap-1 font-semibold"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh</span>
                  </button>
                </div>

                {/* Media Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredMedia.map((item) => (
                    <div
                      key={item.url}
                      className="group p-3 rounded-2xl bg-[#FAF9F5] border border-[#EBE8DE] hover:border-[#FF3B53] flex flex-col justify-between transition-all space-y-2 shadow-xs"
                    >
                      {/* Image Thumbnail */}
                      <div
                        onClick={() => setPreviewModalUrl(item.url)}
                        className="relative h-28 w-full rounded-xl bg-white border border-[#EBE8DE] flex items-center justify-center overflow-hidden cursor-pointer p-1"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`${item.url}?v=${cacheBuster}`}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* File Info */}
                      <div className="space-y-1">
                        <div
                          title={item.name}
                          className="text-xs font-bold text-[#14171A] truncate"
                        >
                          {item.name}
                        </div>
                        <div className="text-[10px] text-[#8C959F] flex items-center justify-between">
                          <span>{(item.size / 1024).toFixed(1)} KB</span>
                          <span className="uppercase text-[9px] font-bold px-1.5 py-0.2 bg-[#EBE8DE] rounded">
                            {item.folder}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 border-t border-[#EBE8DE] flex items-center justify-between gap-1">
                        <button
                          onClick={() => copyToClipboard(item.url)}
                          className="flex-1 py-1 px-2 rounded bg-white border border-[#EBE8DE] text-[10px] font-bold text-[#586069] hover:text-[#14171A] hover:bg-slate-50 flex items-center justify-center gap-1"
                          title="Copy relative URL"
                        >
                          {copiedUrl === item.url ? (
                            <>
                              <Check className="w-3 h-3 text-[#1E6B27]" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy URL</span>
                            </>
                          )}
                        </button>

                        {item.folder === 'uploads' && (
                          <button
                            onClick={() => handleDeleteMedia(item.url)}
                            className="p-1 rounded bg-rose-50 text-rose-500 hover:bg-rose-600 hover:text-white transition-colors"
                            title="Delete file"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HERO & 3D ARTWORK */}
          {activeTab === 'hero' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-[#14171A]">
                    Hero Section & 3D Artwork Studio
                  </h2>
                  <p className="text-xs text-[#586069]">
                    Manage the 3D visual mascot stage, typography, and punchy value propositions.
                  </p>
                </div>
                <Badge variant="coral" size="sm">
                  {editingLang.toUpperCase()} Edition
                </Badge>
              </div>

              {/* Direct Image Replacement Widget */}
              <div className="p-6 rounded-3xl bg-[#FAF9F5] border border-[#EBE8DE] space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#14171A] flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#FF3B53]" />
                  <span>Quick 3D Hero Artwork Uploaders</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-2xl border border-[#EBE8DE] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/images/mascots-3d-transparent.png?v=${cacheBuster}`}
                        alt="3D Mascots"
                        className="w-12 h-12 object-contain"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#14171A]">3D Mascots Stage</div>
                        <div className="text-[10px] text-[#8C959F]">Transparent 3D render</div>
                      </div>
                    </div>
                    <label className="cursor-pointer px-3 py-1.5 bg-[#14171A] hover:bg-[#FF3B53] text-white text-xs font-bold rounded-lg transition-colors">
                      Change
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, 'slot-mascots');
                        }}
                      />
                    </label>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-[#EBE8DE] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/images/hero-3d-banner.png?v=${cacheBuster}`}
                        alt="Hero Banner"
                        className="w-12 h-12 object-contain rounded"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#14171A]">3D Hero Banner</div>
                        <div className="text-[10px] text-[#8C959F]">Cinematic landscape</div>
                      </div>
                    </div>
                    <label className="cursor-pointer px-3 py-1.5 bg-[#14171A] hover:bg-[#FF3B53] text-white text-xs font-bold rounded-lg transition-colors">
                      Change
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, 'slot-banner');
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Text Fields */}
              <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] space-y-4 shadow-sm">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-[#8C959F]">
                    Hero Eyebrow Badge
                  </label>
                  <input
                    type="text"
                    value={currentLangContent.hero.badge}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        [editingLang]: {
                          ...currentLangContent,
                          hero: { ...currentLangContent.hero, badge: e.target.value },
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EBE8DE] text-sm focus:border-[#FF3B53] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-[#8C959F]">
                    Official Tagline / Heading
                  </label>
                  <input
                    type="text"
                    value={currentLangContent.hero.tagline}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        [editingLang]: {
                          ...currentLangContent,
                          hero: { ...currentLangContent.hero, tagline: e.target.value },
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EBE8DE] text-sm font-bold focus:border-[#FF3B53] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-[#8C959F]">
                    Hero Subtitle & Positioning Copy
                  </label>
                  <textarea
                    rows={4}
                    value={currentLangContent.hero.subtitle}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        [editingLang]: {
                          ...currentLangContent,
                          hero: { ...currentLangContent.hero, subtitle: e.target.value },
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EBE8DE] text-sm leading-relaxed focus:border-[#FF3B53] outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-[#14171A]">5 Core Service Pillars</h2>
                  <p className="text-xs text-[#586069]">
                    Verified agency service offerings: Strategy, Social, Media Buying, Production/3D, Web Apps.
                  </p>
                </div>
                <Badge variant="coral" size="sm">
                  {editingLang.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-4">
                {currentLangContent.services.map((service, idx) => (
                  <div
                    key={service.id}
                    className="p-6 rounded-3xl bg-white border border-[#EBE8DE] space-y-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-[#FAF8EF] border border-[#EBE8DE] flex items-center justify-center text-xs font-bold text-[#1E6B27]">
                          0{idx + 1}
                        </span>
                        <h3 className="text-lg font-black text-[#14171A]">{service.title}</h3>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#FAF8EF] text-[#FF3B53] font-bold">
                        {service.highlightTag}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-[#8C959F]">
                          Service Title
                        </label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => {
                            const newServices = [...currentLangContent.services];
                            newServices[idx] = { ...service, title: e.target.value };
                            setContent({
                              ...content,
                              [editingLang]: { ...currentLangContent, services: newServices },
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#EBE8DE] text-sm font-bold focus:border-[#FF3B53] outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-[#8C959F]">
                          Highlight Badge
                        </label>
                        <input
                          type="text"
                          value={service.highlightTag}
                          onChange={(e) => {
                            const newServices = [...currentLangContent.services];
                            newServices[idx] = { ...service, highlightTag: e.target.value };
                            setContent({
                              ...content,
                              [editingLang]: { ...currentLangContent, services: newServices },
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#EBE8DE] text-sm focus:border-[#FF3B53] outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-[#8C959F]">
                        Summary Description
                      </label>
                      <textarea
                        rows={2}
                        value={service.shortDescription}
                        onChange={(e) => {
                          const newServices = [...currentLangContent.services];
                          newServices[idx] = { ...service, shortDescription: e.target.value };
                          setContent({
                            ...content,
                            [editingLang]: { ...currentLangContent, services: newServices },
                          });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#EBE8DE] text-sm focus:border-[#FF3B53] outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PROJECTS & CASE STUDIES */}
          {activeTab === 'projects' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-[#14171A]">
                    Projects & Case Studies Portfolio
                  </h2>
                  <p className="text-xs text-[#586069]">
                    Showcase client campaigns with verified deliverables and custom photography/graphics.
                  </p>
                </div>
                <Badge variant="coral" size="sm">
                  {editingLang.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-6">
                {currentLangContent.projects.map((project, pIdx) => (
                  <div
                    key={project.slug}
                    className="p-6 md:p-8 rounded-3xl bg-white border border-[#EBE8DE] space-y-6 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EBE8DE] pb-4">
                      <div>
                        <span className="text-xs font-mono uppercase text-[#FF3B53] font-bold">
                          {project.category} • {project.year}
                        </span>
                        <h3 className="text-xl font-black text-[#14171A]">{project.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-[#1E6B27]/10 text-[#1E6B27] text-xs font-bold">
                          Verified Case Study
                        </span>
                        <Link
                          href={`/${editingLang}/work/${project.slug}`}
                          target="_blank"
                          className="px-3 py-1 rounded-lg bg-[#FAF8EF] border border-[#EBE8DE] text-xs font-bold text-[#14171A] hover:bg-[#FF3B53] hover:text-white transition-colors inline-flex items-center gap-1"
                        >
                          <span>Live Page</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>

                    {/* Image Uploader for Project */}
                    <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EBE8DE] space-y-3">
                      <div className="text-xs font-bold uppercase text-[#14171A] flex items-center justify-between">
                        <span>Project Hero / Gallery Image</span>
                        <span className="text-[10px] text-[#586069]">
                          Upload a high-res photo for this case study
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#14171A] text-white text-xs font-bold hover:bg-[#FF3B53] transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Photo to Project</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(file, `project_${project.slug}`);
                            }}
                          />
                        </label>
                        <span className="text-xs text-[#8C959F]">
                          Images uploaded here are saved to the Media Library.
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-[#8C959F]">
                          Client Name
                        </label>
                        <input
                          type="text"
                          value={project.client}
                          onChange={(e) => {
                            const newProjects = [...currentLangContent.projects];
                            newProjects[pIdx] = { ...project, client: e.target.value };
                            setContent({
                              ...content,
                              [editingLang]: { ...currentLangContent, projects: newProjects },
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#EBE8DE] text-sm font-bold focus:border-[#FF3B53] outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-[#8C959F]">
                          Case Study Title
                        </label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => {
                            const newProjects = [...currentLangContent.projects];
                            newProjects[pIdx] = { ...project, title: e.target.value };
                            setContent({
                              ...content,
                              [editingLang]: { ...currentLangContent, projects: newProjects },
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#EBE8DE] text-sm font-bold focus:border-[#FF3B53] outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-[#8C959F]">
                        Executive Summary
                      </label>
                      <textarea
                        rows={2}
                        value={project.summary}
                        onChange={(e) => {
                          const newProjects = [...currentLangContent.projects];
                          newProjects[pIdx] = { ...project, summary: e.target.value };
                          setContent({
                            ...content,
                            [editingLang]: { ...currentLangContent, projects: newProjects },
                          });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#EBE8DE] text-sm focus:border-[#FF3B53] outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: LEADS & INQUIRIES CRM */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h2 className="text-2xl font-black text-[#14171A]">Leads & Inquiries CRM</h2>
                <p className="text-xs text-[#586069]">
                  Real-time contact submissions received from the website contact forms.
                </p>
              </div>

              {inquiries.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-[#EBE8DE] text-[#8C959F]">
                  <MessageSquare className="w-10 h-10 mx-auto mb-2 text-[#CBD5E1]" />
                  <p className="text-sm font-bold">No client inquiries received yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-6 rounded-3xl bg-white border border-[#EBE8DE] space-y-4 shadow-sm hover:border-[#FF3B53] transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EBE8DE] pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-black text-[#14171A]">{inq.name}</h3>
                            {inq.company && (
                              <span className="text-xs text-[#586069]">({inq.company})</span>
                            )}
                          </div>
                          <div className="text-xs text-[#8C959F] flex items-center gap-3 mt-0.5">
                            <span>{inq.email}</span>
                            {inq.phone && <span>• {inq.phone}</span>}
                            <span>• {new Date(inq.createdAt).toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Status Marker */}
                        <div className="flex items-center gap-2">
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              updateInquiryState(inq.id, e.target.value as Inquiry['status'])
                            }
                            className={`px-3 py-1 rounded-xl text-xs font-bold border outline-none cursor-pointer ${
                              inq.status === 'new'
                                ? 'bg-rose-50 border-rose-200 text-rose-700'
                                : inq.status === 'contacted'
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                : inq.status === 'in_progress'
                                ? 'bg-blue-50 border-blue-200 text-blue-700'
                                : 'bg-gray-100 border-gray-200 text-gray-700'
                            }`}
                          >
                            <option value="new">New Submission</option>
                            <option value="contacted">Contacted</option>
                            <option value="in_progress">In Discussion</option>
                            <option value="archived">Archived</option>
                          </select>

                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 text-[#8C959F] hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#FAF8EF] border border-[#EBE8DE] text-sm text-[#14171A] leading-relaxed">
                        “{inq.message}”
                      </div>

                      {inq.phone && (
                        <div className="flex items-center gap-2 pt-2">
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-[#1E6B27] text-white text-xs font-bold hover:bg-[#15541e] transition-colors inline-flex items-center gap-1.5"
                          >
                            <span>Respond on WhatsApp</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <a
                            href={`mailto:${inq.email}?subject=Regarding%20your%20inquiry%20to%20Marketing%20Melon%20Agency`}
                            className="px-3 py-1.5 rounded-xl bg-[#14171A] text-white text-xs font-bold hover:bg-[#2D333B] transition-colors inline-flex items-center gap-1.5"
                          >
                            <span>Send Email</span>
                            <Mail className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: REGIONAL CONTACTS & SOCIAL */}
          {activeTab === 'contacts' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-black text-[#14171A]">
                  Regional Contacts & Verified Profiles
                </h2>
                <p className="text-xs text-[#586069]">
                  Update phone numbers, WhatsApp dispatch endpoints, and official social accounts.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] space-y-4 shadow-sm">
                <h3 className="text-sm font-bold uppercase text-[#14171A]">Regional Phone Lines</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#8C959F]">Cairo, Egypt Office</label>
                    <input
                      type="text"
                      value={company.phones.cairo.display}
                      onChange={(e) =>
                        setCompany({
                          ...company,
                          phones: {
                            ...company.phones,
                            cairo: { ...company.phones.cairo, display: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-[#EBE8DE] text-sm font-mono focus:border-[#FF3B53] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#8C959F]">Saudi Arabia Office</label>
                    <input
                      type="text"
                      value={company.phones.saudi.display}
                      onChange={(e) =>
                        setCompany({
                          ...company,
                          phones: {
                            ...company.phones,
                            saudi: { ...company.phones.saudi, display: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-[#EBE8DE] text-sm font-mono focus:border-[#FF3B53] outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: SETTINGS & BACKUP */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-black text-[#14171A]">CMS Backup & JSON Export</h2>
                <p className="text-xs text-[#586069]">
                  Export a complete JSON snapshot of the agency dictionary and leads database.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#14171A]">Export Data Snapshot</h3>
                    <p className="text-xs text-[#586069]">
                      Download all bilingual text, inquiries, and config settings.
                    </p>
                  </div>
                  <Button
                    onClick={exportBackupJSON}
                    variant="primary"
                    size="sm"
                    icon={<Download className="w-4 h-4" />}
                  >
                    Download JSON Backup
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
