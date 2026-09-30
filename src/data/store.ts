import { siteContent, companyData } from './content';

export interface InquiryRecord {
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

// In-memory runtime stores with defaults
let dynamicContent = {
  en: JSON.parse(JSON.stringify(siteContent.en)),
  ar: JSON.parse(JSON.stringify(siteContent.ar)),
};

let dynamicCompanyData = JSON.parse(JSON.stringify(companyData));

let inquiries: InquiryRecord[] = [
  {
    id: 'inq-001',
    name: 'Al Eairy Hospitality Group',
    email: 'mgmt@aleairy.com',
    phone: '+966 50 123 4567',
    company: 'Al Eairy Residence',
    services: ['production-motion', 'social-media', 'paid-ads'],
    budget: '$7,500 - $15,000 / Scale & Production',
    message: 'We need interior and drone videography along with digital marketing campaigns for our new residence branches in Saudi Arabia.',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: 'contacted',
    notes: 'Verified client project recorded in agency portfolio.',
  },
  {
    id: 'inq-002',
    name: 'Kareem Mansour',
    email: 'kareem@cairocreatives.eg',
    phone: '+20 100 987 6543',
    company: 'Cairo Urban Developments',
    services: ['strategy-marketing', 'web-development'],
    budget: '$3,000 - $7,500 / Mid-tier Growth',
    message: 'Looking for full brand strategy and bilingual Next.js web platform with 3D product visualizers.',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'new',
  },
];

export function getDynamicContent() {
  return dynamicContent;
}

export function updateDynamicContent(newContent: typeof dynamicContent) {
  dynamicContent = JSON.parse(JSON.stringify(newContent));
  return dynamicContent;
}

export function getDynamicCompanyData() {
  return dynamicCompanyData;
}

export function updateDynamicCompanyData(newData: typeof dynamicCompanyData) {
  dynamicCompanyData = JSON.parse(JSON.stringify(newData));
  return dynamicCompanyData;
}

export function getInquiries() {
  return inquiries;
}

export function addInquiry(inquiry: Omit<InquiryRecord, 'id' | 'createdAt' | 'status'>) {
  const newRecord: InquiryRecord = {
    ...inquiry,
    id: `inq-${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  inquiries.unshift(newRecord);
  return newRecord;
}

export function updateInquiryStatus(id: string, status: InquiryRecord['status'], notes?: string) {
  const item = inquiries.find((i) => i.id === id);
  if (item) {
    item.status = status;
    if (notes !== undefined) item.notes = notes;
    return item;
  }
  return null;
}

export function deleteInquiry(id: string) {
  inquiries = inquiries.filter((i) => i.id !== id);
  return true;
}
