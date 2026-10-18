import { siteContent, companyData } from './content';
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import type { CompanyInfo } from '@/types/content';

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  services: string[];
  budget?: string;
  message: string;
  location?: string;
  workLocation?: string;
  source?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'in_progress' | 'archived';
  notes?: string;
}

type StoredContent = { content: typeof siteContent; company: CompanyInfo };
const storageDir = process.env.CMS_DATA_DIR || path.join(process.cwd(), '.data');
const storageFile = path.join(storageDir, 'content.json');
function readStore(): StoredContent {
  if (!existsSync(storageFile)) return structuredClone({ content: siteContent, company: companyData });
  const stored = JSON.parse(readFileSync(storageFile, 'utf8')) as StoredContent;
  return {
    ...stored,
    company: {
      ...stored.company,
      socialLinks: { ...companyData.socialLinks, ...stored.company.socialLinks },
    },
  };
}
function writeJson(file: string, value: unknown) {
  mkdirSync(storageDir, { recursive: true });
  const temporary = `${file}.${randomUUID()}.tmp`;
  writeFileSync(temporary, JSON.stringify(value, null, 2));
  renameSync(temporary, file);
}
function writeStore(value: StoredContent) { writeJson(storageFile, value); }

// Leads are kept on disk next to the content so they survive restarts and deploys.
const inquiriesFile = path.join(storageDir, 'inquiries.json');
function readInquiries(): InquiryRecord[] {
  if (!existsSync(inquiriesFile)) return [];
  return JSON.parse(readFileSync(inquiriesFile, 'utf8')) as InquiryRecord[];
}

export function getDynamicContent(): typeof siteContent { return readStore().content; }
export function getDynamicCompanyData(): CompanyInfo { return readStore().company; }
export function saveWebsite(content?: typeof siteContent, company?: CompanyInfo) {
  const previous = readStore();
  const next = { content: content || previous.content, company: company || previous.company };
  writeStore(next);
  return next;
}

export function getInquiries() {
  return readInquiries();
}

export function addInquiry(inquiry: Omit<InquiryRecord, 'id' | 'createdAt' | 'status'>) {
  const newRecord: InquiryRecord = {
    ...inquiry,
    id: `inq-${Date.now().toString(36)}-${randomUUID().slice(0, 6)}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  writeJson(inquiriesFile, [newRecord, ...readInquiries()]);
  return newRecord;
}

export function updateInquiryStatus(id: string, status: InquiryRecord['status'], notes?: string) {
  const all = readInquiries();
  const item = all.find((i) => i.id === id);
  if (!item) return null;
  item.status = status;
  if (notes !== undefined) item.notes = notes;
  writeJson(inquiriesFile, all);
  return item;
}

export function deleteInquiry(id: string) {
  writeJson(inquiriesFile, readInquiries().filter((i) => i.id !== id));
  return true;
}
