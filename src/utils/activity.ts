import { ActivityLog } from '../types';
import { storage } from './storage';

export const logActivity = (action: string, metadata?: Record<string, unknown>): void => {
  const log: ActivityLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    action,
    metadata,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
  };

  storage.saveActivityLog(log);
};

export const ACTIVITY_ACTIONS = {
  PAGE_LOAD: 'page_load',
  BUTTON_CLICK: 'button_click',
  FORM_OPEN: 'form_open',
  FORM_SUBMIT: 'form_submit',
  SECTION_VIEW: 'section_view',
  WHATSAPP_CLICK: 'whatsapp_click',
  DRESS_VIEW: 'dress_view',
};
