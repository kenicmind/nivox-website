import { doc, getDoc, setDoc, addDoc, collection, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';

/**
 * Platform System Settings & Audit Logging Service
 * Manages maintenance mode, pricing, capacities, and admin audit trails in Firestore
 */

export const DEFAULT_SETTINGS = {
  maintenanceMode: false,
  pricing: 300,
  pricingFormatted: '₦300',
  duration: '2 Hours',
  learningZoneCapacity: 12,
  computerLabCapacity: 8,
  creatorStudioCapacity: 4,
  innovationLoungeCapacity: 2,
};

export const fetchSystemSettings = async () => {
  try {
    const docRef = doc(db, 'settings', 'global');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { ...DEFAULT_SETTINGS, ...snap.data() };
    }
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error fetching system settings:', error);
    return DEFAULT_SETTINGS;
  }
};

export const saveSystemSettings = async (settings) => {
  try {
    const docRef = doc(db, 'settings', 'global');
    const payload = {
      ...settings,
      updatedAt: serverTimestamp(),
    };
    await setDoc(docRef, payload, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving system settings:', error);
    throw error;
  }
};

export const logAdminAuditAction = async ({ adminEmail, action, target, details }) => {
  try {
    await addDoc(collection(db, 'audit_logs'), {
      adminEmail: adminEmail || 'Admin',
      action,
      target: target || 'System',
      details: details || '',
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error recording admin audit log:', error);
  }
};

export const fetchAdminAuditLogs = async () => {
  try {
    const q = query(collection(db, 'audit_logs'), orderBy('timestamp', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return [];
  }
};
