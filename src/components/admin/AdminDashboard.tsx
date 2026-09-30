'use client';

import React, { useState, useEffect } from 'react';
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

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ initialLocale }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab: 'overview' | 'hero' | 'services' | 'projects' | 'inquiries' | 'media' | 'contacts' | 'settings'
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [editingLang, setEditingLang] = useState<Locale>('en');

  // Working state for content and company data
  const [content, setContent] = useState(siteContent);
  const [company, setCompany] = useState(companyData);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Load inquiries and stored content on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem('mm_admin_auth');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
    }
    fetchData();
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
              WordPress-style Control Panel for Agency Content & 3D Graphics
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
                placeholder="Enter passcode (default: melon2026)"
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

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#14171A] flex flex-col">
      {/* Top Admin Navigation Bar (WordPress Bar style) */}
      <header className="bg-[#14171A] text-white px-4 sm:px-8 py-3 border-b border-[#2D333B] flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF3B53] animate-pulse" />
            <span className="font-extrabold text-sm tracking-tight text-white">
              Melon<span className="text-[#FF3B53]">CMS</span>
            </span>
          </div>

          <span className="text-white/30">|</span>

          <Link
            href={`/${editingLang}`}
            target="_blank"
            className="text-xs text-[#8C959F] hover:text-white flex items-center gap-1 font-semibold"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Global Action Toolbar */}
        <div className="flex items-center gap-3">
          {/* Editing Language Selector */}
          <div className="flex items-center bg-[#22272E] rounded-xl p-1 border border-[#373E47]">
            <button
              type="button"
              onClick={() => setEditingLang('en')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                editingLang === 'en'
                  ? 'bg-[#FF3B53] text-white'
                  : 'text-[#8C959F] hover:text-white'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setEditingLang('ar')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                editingLang === 'ar'
                  ? 'bg-[#FF3B53] text-white'
                  : 'text-[#8C959F] hover:text-white'
              }`}
            >
              العربية
            </button>
          </div>

          {/* Save All Button */}
          <Button
            onClick={handleSave}
            variant="primary"
            size="sm"
            disabled={saveStatus === 'saving'}
            icon={
              saveStatus === 'saved' ? (
                <CheckCircle2 className="w-4 h-4 text-[#80ED99]" />
              ) : saveStatus === 'saving' ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )
            }
          >
            {saveStatus === 'saving'
              ? 'Saving...'
              : saveStatus === 'saved'
              ? 'Saved to Live!'
              : 'Save Changes'}
          </Button>

          {/* Export JSON Backup */}
          <button
            type="button"
            onClick={exportBackupJSON}
            title="Export Full Website JSON Backup"
            className="p-2 rounded-xl bg-[#22272E] text-[#8C959F] hover:text-white border border-[#373E47]"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="text-xs text-[#8C959F] hover:text-rose-400 font-semibold px-2"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Admin Dashboard Container */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left WordPress-Style Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-white border-r border-[#EBE8DE] p-4 flex flex-col justify-between shrink-0">
          <nav className="space-y-1.5" aria-label="Dashboard Tabs">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#14171A] text-white shadow-xs'
                  : 'text-[#586069] hover:bg-[#FAF9F5] hover:text-[#14171A]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#FF3B53]" />
              <span>Dashboard Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'hero'
                  ? 'bg-[#14171A] text-white shadow-xs'
                  : 'text-[#586069] hover:bg-[#FAF9F5] hover:text-[#14171A]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#1E6B27]" />
              <span>Hero & 3D Artwork</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'services'
                  ? 'bg-[#14171A] text-white shadow-xs'
                  : 'text-[#586069] hover:bg-[#FAF9F5] hover:text-[#14171A]'
              }`}
            >
              <Layers className="w-4 h-4 text-[#FF3B53]" />
              <span>Services (5 Pillars)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'projects'
                  ? 'bg-[#14171A] text-white shadow-xs'
                  : 'text-[#586069] hover:bg-[#FAF9F5] hover:text-[#14171A]'
              }`}
            >
              <FolderKanban className="w-4 h-4 text-[#1E6B27]" />
              <span>Projects & Case Studies</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'inquiries'
                  ? 'bg-[#14171A] text-white shadow-xs'
                  : 'text-[#586069] hover:bg-[#FAF9F5] hover:text-[#14171A]'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-[#FF3B53]" />
                <span>Leads & Inquiries</span>
              </div>
              {inquiries.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#FF3B53] text-white text-[10px]">
                  {inquiries.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'media'
                  ? 'bg-[#14171A] text-white shadow-xs'
                  : 'text-[#586069] hover:bg-[#FAF9F5] hover:text-[#14171A]'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-[#1E6B27]" />
              <span>Brand Graphics & 3D</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('contacts')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'contacts'
                  ? 'bg-[#14171A] text-white shadow-xs'
                  : 'text-[#586069] hover:bg-[#FAF9F5] hover:text-[#14171A]'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-[#FF3B53]" />
              <span>Regional Contacts & Social</span>
            </button>
          </nav>

          {/* Sidebar Footer Info */}
          <div className="pt-6 border-t border-[#EBE8DE] space-y-2 text-[11px] text-[#8C959F]">
            <div className="font-semibold text-[#14171A]">Marketing Melon v2.0</div>
            <div>Full CMS Control Enabled</div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h2 className="text-2xl font-black text-[#14171A]">
                  Welcome to Marketing Melon Control Center
                </h2>
                <p className="text-xs sm:text-sm text-[#586069] mt-1">
                  Manage live website graphics, 3D artwork, service matrices, case studies, and client inquiries in real-time.
                </p>
              </div>

              {/* Quick KPI Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] shadow-sm space-y-2 card-3d">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#8C959F]">
                    Total Services
                  </div>
                  <div className="text-3xl font-black text-[#1E6B27]">
                    {currentLangContent.services.length}
                  </div>
                  <div className="text-xs text-[#586069]">Active verified pillars</div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] shadow-sm space-y-2 card-3d">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#8C959F]">
                    Case Studies
                  </div>
                  <div className="text-3xl font-black text-[#FF3B53]">
                    {currentLangContent.projects.length}
                  </div>
                  <div className="text-xs text-[#586069]">Verified client showcases</div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] shadow-sm space-y-2 card-3d">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#8C959F]">
                    Captured Inquiries
                  </div>
                  <div className="text-3xl font-black text-[#14171A]">
                    {inquiries.length}
                  </div>
                  <div className="text-xs text-[#10B981] font-semibold">Live in CRM</div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] shadow-sm space-y-2 card-3d">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#8C959F]">
                    Languages Active
                  </div>
                  <div className="text-3xl font-black text-[#1E6B27]">
                    2 (EN / AR)
                  </div>
                  <div className="text-xs text-[#586069]">Full RTL/LTR supported</div>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] space-y-4">
                <h3 className="text-base font-bold text-[#14171A]">Quick Management Shortcuts</h3>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => setActiveTab('hero')} variant="outline" size="sm">
                    Edit Hero & Tagline
                  </Button>
                  <Button onClick={() => setActiveTab('services')} variant="outline" size="sm">
                    Manage 5 Services
                  </Button>
                  <Button onClick={() => setActiveTab('projects')} variant="outline" size="sm">
                    Add / Edit Case Study
                  </Button>
                  <Button onClick={() => setActiveTab('inquiries')} variant="primary" size="sm">
                    View Inquiries ({inquiries.length})
                  </Button>
                  <Button onClick={() => setActiveTab('media')} variant="secondary" size="sm">
                    Manage 3D Brand Media
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO & 3D ARTWORK */}
          {activeTab === 'hero' && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-[#14171A]">
                    Hero Section & Tagline Editor ({editingLang.toUpperCase()})
                  </h2>
                  <p className="text-xs text-[#586069]">
                    Modify the primary headline, tagline, supporting copy, and 3D badge copy.
                  </p>
                </div>
                <Badge variant="coral">Editing {editingLang.toUpperCase()}</Badge>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE8DE] space-y-5 shadow-sm">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-[#14171A]">
                    Tagline (Main Headline)
                  </label>
                  <input
                    type="text"
                    value={content[editingLang].hero.tagline}
                    onChange={(e) => {
                      const val = e.target.value;
                      setContent((prev) => ({
                        ...prev,
                        [editingLang]: {
                          ...prev[editingLang],
                          hero: { ...prev[editingLang].hero, tagline: val },
                        },
                      }));
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] text-sm font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-[#14171A]">
                    Hero Badge Text
                  </label>
                  <input
                    type="text"
                    value={content[editingLang].hero.badge}
                    onChange={(e) => {
                      const val = e.target.value;
                      setContent((prev) => ({
                        ...prev,
                        [editingLang]: {
                          ...prev[editingLang],
                          hero: { ...prev[editingLang].hero, badge: val },
                        },
                      }));
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-[#14171A]">
                    Supporting Subtitle
                  </label>
                  <textarea
                    rows={3}
                    value={content[editingLang].hero.subtitle}
                    onChange={(e) => {
                      const val = e.target.value;
                      setContent((prev) => ({
                        ...prev,
                        [editingLang]: {
                          ...prev[editingLang],
                          hero: { ...prev[editingLang].hero, subtitle: val },
                        },
                      }));
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] text-sm leading-relaxed"
                  />
                </div>

                {/* 3 Metric Stats */}
                <div className="pt-4 border-t border-[#EBE8DE] space-y-4">
                  <div className="text-xs font-bold uppercase text-[#14171A]">
                    3 Hero Highlights & Stats
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {content[editingLang].hero.stats.map((st, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EBE8DE] space-y-2">
                        <input
                          type="text"
                          value={st.value}
                          onChange={(e) => {
                            const newStats = [...content[editingLang].hero.stats];
                            newStats[idx].value = e.target.value;
                            setContent((prev) => ({
                              ...prev,
                              [editingLang]: {
                                ...prev[editingLang],
                                hero: { ...prev[editingLang].hero, stats: newStats },
                              },
                            }));
                          }}
                          placeholder="Value (e.g. 5 Core)"
                          className="w-full font-black text-sm text-[#1E6B27] bg-white px-2.5 py-1.5 rounded-lg border border-[#EBE8DE]"
                        />
                        <input
                          type="text"
                          value={st.label}
                          onChange={(e) => {
                            const newStats = [...content[editingLang].hero.stats];
                            newStats[idx].label = e.target.value;
                            setContent((prev) => ({
                              ...prev,
                              [editingLang]: {
                                ...prev[editingLang],
                                hero: { ...prev[editingLang].hero, stats: newStats },
                              },
                            }));
                          }}
                          placeholder="Label (e.g. Regional Focus)"
                          className="w-full text-xs text-[#586069] bg-white px-2.5 py-1.5 rounded-lg border border-[#EBE8DE]"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Button onClick={handleSave} variant="primary" size="md">
                    Save Hero Changes
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-[#14171A]">
                    Service Pillars Manager ({editingLang.toUpperCase()})
                  </h2>
                  <p className="text-xs text-[#586069]">
                    Edit service descriptions, scope points, and deliverables.
                  </p>
                </div>
                <Badge variant="emerald">{content[editingLang].services.length} Services</Badge>
              </div>

              <div className="space-y-6">
                {content[editingLang].services.map((srv, idx) => (
                  <div
                    key={srv.id}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE8DE] space-y-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-[#FFF0F2] text-[#FF3B53] font-bold flex items-center justify-center text-xs">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={srv.title}
                          onChange={(e) => {
                            const newServices = [...content[editingLang].services];
                            newServices[idx].title = e.target.value;
                            setContent((prev) => ({
                              ...prev,
                              [editingLang]: {
                                ...prev[editingLang],
                                services: newServices,
                              },
                            }));
                          }}
                          className="font-bold text-lg text-[#14171A] bg-[#FAF9F5] px-3 py-1.5 rounded-xl border border-[#EBE8DE]"
                        />
                      </div>

                      <input
                        type="text"
                        value={srv.highlightTag}
                        onChange={(e) => {
                          const newServices = [...content[editingLang].services];
                          newServices[idx].highlightTag = e.target.value;
                          setContent((prev) => ({
                            ...prev,
                            [editingLang]: {
                              ...prev[editingLang],
                              services: newServices,
                            },
                          }));
                        }}
                        className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EBF7F3] text-[#1E6B27] border border-[#1E6B27]/30 text-end"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#8C959F] uppercase">
                        Short Description
                      </label>
                      <textarea
                        rows={2}
                        value={srv.shortDescription}
                        onChange={(e) => {
                          const newServices = [...content[editingLang].services];
                          newServices[idx].shortDescription = e.target.value;
                          setContent((prev) => ({
                            ...prev,
                            [editingLang]: {
                              ...prev[editingLang],
                              services: newServices,
                            },
                          }));
                        }}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] text-xs leading-relaxed"
                      />
                    </div>

                    {/* Scope Items */}
                    <div className="space-y-2 pt-2 border-t border-[#EBE8DE]">
                      <label className="text-xs font-bold text-[#8C959F] uppercase">
                        Scope Points (Comma Separated)
                      </label>
                      <input
                        type="text"
                        value={srv.scope.join(', ')}
                        onChange={(e) => {
                          const newServices = [...content[editingLang].services];
                          newServices[idx].scope = e.target.value
                            .split(',')
                            .map((s) => s.trim())
                            .filter(Boolean);
                          setContent((prev) => ({
                            ...prev,
                            [editingLang]: {
                              ...prev[editingLang],
                              services: newServices,
                            },
                          }));
                        }}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] text-xs font-mono"
                      />
                    </div>
                  </div>
                ))}

                <Button onClick={handleSave} variant="primary" size="md">
                  Save All Services
                </Button>
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-[#14171A]">
                    Case Studies & Portfolio ({editingLang.toUpperCase()})
                  </h2>
                  <p className="text-xs text-[#586069]">
                    Manage client showcases, verified scopes, and case story narratives.
                  </p>
                </div>
                <Badge variant="coral">{content[editingLang].projects.length} Showcases</Badge>
              </div>

              <div className="space-y-6">
                {content[editingLang].projects.map((proj, idx) => (
                  <div
                    key={proj.slug}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE8DE] space-y-4 shadow-sm"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#8C959F] uppercase">
                          Project Title
                        </label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => {
                            const newProjects = [...content[editingLang].projects];
                            newProjects[idx].title = e.target.value;
                            setContent((prev) => ({
                              ...prev,
                              [editingLang]: { ...prev[editingLang], projects: newProjects },
                            }));
                          }}
                          className="w-full font-bold text-base text-[#14171A] bg-[#FAF9F5] px-3.5 py-2 rounded-xl border border-[#EBE8DE]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#8C959F] uppercase">
                          Client Name
                        </label>
                        <input
                          type="text"
                          value={proj.client}
                          onChange={(e) => {
                            const newProjects = [...content[editingLang].projects];
                            newProjects[idx].client = e.target.value;
                            setContent((prev) => ({
                              ...prev,
                              [editingLang]: { ...prev[editingLang], projects: newProjects },
                            }));
                          }}
                          className="w-full text-sm font-semibold text-[#14171A] bg-[#FAF9F5] px-3.5 py-2 rounded-xl border border-[#EBE8DE]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#8C959F] uppercase">
                        Summary
                      </label>
                      <textarea
                        rows={2}
                        value={proj.summary}
                        onChange={(e) => {
                          const newProjects = [...content[editingLang].projects];
                          newProjects[idx].summary = e.target.value;
                          setContent((prev) => ({
                            ...prev,
                            [editingLang]: { ...prev[editingLang], projects: newProjects },
                          }));
                        }}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] text-xs leading-relaxed"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#8C959F] uppercase">
                        Full Case Story
                      </label>
                      <textarea
                        rows={4}
                        value={proj.fullStory}
                        onChange={(e) => {
                          const newProjects = [...content[editingLang].projects];
                          newProjects[idx].fullStory = e.target.value;
                          setContent((prev) => ({
                            ...prev,
                            [editingLang]: { ...prev[editingLang], projects: newProjects },
                          }));
                        }}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] text-xs leading-relaxed"
                      />
                    </div>
                  </div>
                ))}

                <Button onClick={handleSave} variant="primary" size="md">
                  Save Case Studies
                </Button>
              </div>
            </div>
          )}

          {/* TAB 5: LEADS & INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-[#14171A]">
                    Lead Inquiries CRM
                  </h2>
                  <p className="text-xs text-[#586069]">
                    All incoming project submissions recorded from the website contact form.
                  </p>
                </div>
                <Button onClick={fetchData} variant="outline" size="sm" icon={<RefreshCw className="w-4 h-4" />}>
                  Refresh Leads
                </Button>
              </div>

              {inquiries.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-white border border-[#EBE8DE]">
                  <MessageSquare className="w-10 h-10 text-[#8C959F] mx-auto mb-3" />
                  <div className="font-bold text-base">No Inquiries Captured Yet</div>
                  <div className="text-xs text-[#586069]">New submissions will appear here live.</div>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-6 rounded-3xl bg-white border border-[#EBE8DE] shadow-sm space-y-4 hover:border-[#FF3B53]/30 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EBE8DE] pb-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-3 h-3 rounded-full ${
                              inq.status === 'new'
                                ? 'bg-[#FF3B53]'
                                : inq.status === 'contacted'
                                ? 'bg-[#10B981]'
                                : 'bg-[#8C959F]'
                            }`}
                          />
                          <div>
                            <span className="font-black text-base text-[#14171A]">{inq.name}</span>
                            {inq.company && (
                              <span className="text-xs text-[#586069] ms-2 font-semibold">
                                ({inq.company})
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              updateInquiryState(inq.id, e.target.value as Inquiry['status'])
                            }
                            className="text-xs font-bold px-3 py-1.5 rounded-xl border border-[#EBE8DE] bg-[#FAF9F5]"
                          >
                            <option value="new">New Lead</option>
                            <option value="contacted">Contacted</option>
                            <option value="in_progress">In Progress</option>
                            <option value="archived">Archived</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 rounded-lg text-[#8C959F] hover:text-rose-600 hover:bg-rose-50"
                            title="Delete inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-[#8C959F] font-bold block mb-0.5">Email:</span>
                          <a href={`mailto:${inq.email}`} className="text-[#1E6B27] font-semibold hover:underline">
                            {inq.email}
                          </a>
                        </div>

                        {inq.phone && (
                          <div>
                            <span className="text-[#8C959F] font-bold block mb-0.5">Phone / WhatsApp:</span>
                            <a
                              href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#10B981] font-semibold hover:underline font-mono"
                            >
                              {inq.phone}
                            </a>
                          </div>
                        )}

                        {inq.budget && (
                          <div>
                            <span className="text-[#8C959F] font-bold block mb-0.5">Budget Tier:</span>
                            <span className="font-semibold text-[#14171A]">{inq.budget}</span>
                          </div>
                        )}
                      </div>

                      {inq.services && inq.services.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {inq.services.map((s, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 rounded-md bg-[#FAF9F5] border border-[#EBE8DE] text-[11px] font-semibold text-[#586069]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EBE8DE] text-xs text-[#3E454F] leading-relaxed whitespace-pre-wrap">
                        {inq.message}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#8C959F] pt-2">
                        <span>Captured: {new Date(inq.createdAt).toLocaleString()}</span>
                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${inq.email}?subject=Regarding%20your%20Marketing%20Melon%20Project%20Inquiry`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#FF3B53] hover:underline"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Reply via Email</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: BRAND & 3D GRAPHICS */}
          {activeTab === 'media' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h2 className="text-2xl font-black text-[#14171A]">
                  Brand Graphics & 3D Artwork Library
                </h2>
                <p className="text-xs text-[#586069]">
                  Inspect and preview the official brand assets integrated across the website.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hero 3D Banner */}
                <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] space-y-3 shadow-sm">
                  <div className="text-xs font-bold uppercase text-[#14171A]">
                    Hero 3D Mascots Banner
                  </div>
                  <div className="relative h-44 rounded-2xl bg-[#FAF8EF] overflow-hidden border border-[#EBE8DE] flex items-center justify-center">
                    <Image
                      src="/images/hero-3d-banner.png"
                      alt="Hero 3D Banner"
                      width={400}
                      height={180}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-[11px] text-[#8C959F] font-mono">
                    /images/hero-3d-banner.png (1024x449)
                  </div>
                </div>

                {/* 3D Transparent Mascots */}
                <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] space-y-3 shadow-sm">
                  <div className="text-xs font-bold uppercase text-[#14171A]">
                    3D Ninja Mascots Cutout
                  </div>
                  <div className="relative h-44 rounded-2xl bg-[#FAF8EF] overflow-hidden border border-[#EBE8DE] flex items-center justify-center p-2">
                    <Image
                      src="/images/mascots-3d-transparent.png"
                      alt="3D Mascots Transparent"
                      width={200}
                      height={200}
                      className="h-full w-auto object-contain drop-shadow-md"
                    />
                  </div>
                  <div className="text-[11px] text-[#8C959F] font-mono">
                    /images/mascots-3d-transparent.png (Alpha PNG)
                  </div>
                </div>

                {/* Brand Logo Transparent */}
                <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] space-y-3 shadow-sm">
                  <div className="text-xs font-bold uppercase text-[#14171A]">
                    Official Logo (Light Canvas)
                  </div>
                  <div className="relative h-32 rounded-2xl bg-[#FAF9F5] overflow-hidden border border-[#EBE8DE] flex items-center justify-center p-4">
                    <Image
                      src="/images/logo-transparent.png"
                      alt="Logo Transparent"
                      width={240}
                      height={80}
                      className="w-auto h-full object-contain"
                    />
                  </div>
                  <div className="text-[11px] text-[#8C959F] font-mono">
                    /images/logo-transparent.png (Green typography & red watermelon 'o')
                  </div>
                </div>

                {/* Brand Logo White */}
                <div className="p-6 rounded-3xl bg-white border border-[#EBE8DE] space-y-3 shadow-sm">
                  <div className="text-xs font-bold uppercase text-[#14171A]">
                    Official Logo (Dark Footer Canvas)
                  </div>
                  <div className="relative h-32 rounded-2xl bg-[#0B1E19] overflow-hidden border border-[#143D32] flex items-center justify-center p-4">
                    <Image
                      src="/images/logo-white.png"
                      alt="Logo White"
                      width={240}
                      height={80}
                      className="w-auto h-full object-contain"
                    />
                  </div>
                  <div className="text-[11px] text-[#8C959F] font-mono">
                    /images/logo-white.png (White typography & red watermelon 'o')
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: REGIONAL CONTACTS & SOCIAL */}
          {activeTab === 'contacts' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-black text-[#14171A]">
                  Regional Channels & Social Profiles
                </h2>
                <p className="text-xs text-[#586069]">
                  Update Cairo phone, Saudi phone, primary emails, and official social links.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE8DE] space-y-5 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#14171A] uppercase">
                      Primary Contact Email
                    </label>
                    <input
                      type="email"
                      value={company.emails.primary}
                      onChange={(e) =>
                        setCompany((prev) => ({
                          ...prev,
                          emails: { ...prev.emails, primary: e.target.value },
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] text-sm font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#14171A] uppercase">
                      Secondary Contact Email
                    </label>
                    <input
                      type="email"
                      value={company.emails.secondary}
                      onChange={(e) =>
                        setCompany((prev) => ({
                          ...prev,
                          emails: { ...prev.emails, secondary: e.target.value },
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] text-sm font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 border-t border-[#EBE8DE]">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#14171A] uppercase">
                      Cairo Phone & WhatsApp (Display)
                    </label>
                    <input
                      type="text"
                      value={company.phones.cairo.display}
                      onChange={(e) =>
                        setCompany((prev) => ({
                          ...prev,
                          phones: {
                            ...prev.phones,
                            cairo: { ...prev.phones.cairo, display: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] text-sm font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#14171A] uppercase">
                      Saudi Arabia Phone & WhatsApp (Display)
                    </label>
                    <input
                      type="text"
                      value={company.phones.saudi.display}
                      onChange={(e) =>
                        setCompany((prev) => ({
                          ...prev,
                          phones: {
                            ...prev.phones,
                            saudi: { ...prev.phones.saudi, display: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] text-sm font-mono"
                    />
                  </div>
                </div>

                {/* Social Profiles */}
                <div className="space-y-3 pt-3 border-t border-[#EBE8DE]">
                  <div className="text-xs font-bold uppercase text-[#14171A]">
                    Official Social Profiles
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#8C959F]">LinkedIn URL</label>
                      <input
                        type="url"
                        value={company.socialLinks.linkedin}
                        onChange={(e) =>
                          setCompany((prev) => ({
                            ...prev,
                            socialLinks: { ...prev.socialLinks, linkedin: e.target.value },
                          }))
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#8C959F]">Behance URL</label>
                      <input
                        type="url"
                        value={company.socialLinks.behance}
                        onChange={(e) =>
                          setCompany((prev) => ({
                            ...prev,
                            socialLinks: { ...prev.socialLinks, behance: e.target.value },
                          }))
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#8C959F]">Instagram URL</label>
                      <input
                        type="url"
                        value={company.socialLinks.instagram}
                        onChange={(e) =>
                          setCompany((prev) => ({
                            ...prev,
                            socialLinks: { ...prev.socialLinks, instagram: e.target.value },
                          }))
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-[#8C959F]">Facebook URL</label>
                      <input
                        type="url"
                        value={company.socialLinks.facebook}
                        onChange={(e) =>
                          setCompany((prev) => ({
                            ...prev,
                            socialLinks: { ...prev.socialLinks, facebook: e.target.value },
                          }))
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button onClick={handleSave} variant="primary" size="md">
                    Save Regional & Social Info
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
