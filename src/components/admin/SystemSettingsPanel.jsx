import React, { useState, useEffect } from 'react';
import { Settings, ShieldCheck, Wrench, RefreshCw, CheckCircle2, AlertTriangle, Save, ScrollText } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchSystemSettings, saveSystemSettings, logAdminAuditAction, fetchAdminAuditLogs } from '../../services/systemService';
import Button from '../design/ui/Button';

const SystemSettingsPanel = ({ userEmail }) => {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    pricing: 300,
    duration: '2 Hours',
    learningZoneCapacity: 12,
    computerLabCapacity: 8,
    creatorStudioCapacity: 4,
    innovationLoungeCapacity: 2,
  });
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadSettingsAndLogs = async () => {
    try {
      setLoading(true);
      const data = await fetchSystemSettings();
      setSettings(data);
      const logs = await fetchAdminAuditLogs();
      setAuditLogs(logs);
    } catch (err) {
      console.error('Error loading system settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettingsAndLogs();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await saveSystemSettings(settings);
      await logAdminAuditAction({
        adminEmail: userEmail || 'Super Admin',
        action: 'Updated System Settings & Pricing',
        target: 'Global Settings',
        details: `Maintenance: ${settings.maintenanceMode ? 'ENABLED' : 'DISABLED'}, Price: ₦${settings.pricing}`,
      });
      toast.success('System settings & pricing updated in Firestore!');
      await loadSettingsAndLogs();
    } catch (err) {
      console.error('Error updating settings:', err);
      toast.error('Failed to save system settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-8 text-center text-xs text-white/50 animate-pulse">Loading system control panel...</div>;
  }

  return (
    <div className="space-y-8 text-xs text-white">
      <form onSubmit={handleSave} className="space-y-6">
        {/* Maintenance Mode Toggle */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${settings.maintenanceMode ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Maintenance Mode</h4>
              <p className="text-white/60">When enabled, restricts student reservations during platform updates</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSettings((s) => ({ ...s, maintenanceMode: !s.maintenanceMode }))}
            className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
              settings.maintenanceMode
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            }`}
          >
            {settings.maintenanceMode ? 'ENABLED (Restricted)' : 'DISABLED (Live)'}
          </button>
        </div>

        {/* Pricing & Duration Config */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
            <h4 className="font-bold text-white text-sm">Session Rate & Duration</h4>
            <div>
              <label className="block text-white/60 mb-1 font-semibold">Standard Session Rate (NGN)</label>
              <input
                type="number"
                value={settings.pricing}
                onChange={(e) => setSettings((s) => ({ ...s, pricing: Number(e.target.value) }))}
                className="w-full rounded-xl border border-white/20 bg-[#140726] p-2.5 text-xs text-white focus:border-[#FFD54A] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white/60 mb-1 font-semibold">Default Slot Duration</label>
              <input
                type="text"
                value={settings.duration}
                onChange={(e) => setSettings((s) => ({ ...s, duration: e.target.value }))}
                className="w-full rounded-xl border border-white/20 bg-[#140726] p-2.5 text-xs text-white focus:border-[#FFD54A] focus:outline-none"
              />
            </div>
          </div>

          {/* Role-Based Permissions Matrix */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
            <h4 className="font-bold text-white text-sm">Role-Based Access Matrix</h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between"><span className="text-white/60">Super Admin</span><span className="font-bold text-[#FFD54A]">Full Control (All Permissions)</span></div>
              <div className="flex justify-between"><span className="text-white/60">Hub Manager</span><span className="font-semibold text-white">Capacity & Bookings</span></div>
              <div className="flex justify-between"><span className="text-white/60">Receptionist</span><span className="font-semibold text-white">QR Check-in & Status</span></div>
              <div className="flex justify-between"><span className="text-white/60">Content Manager</span><span className="font-semibold text-white">Resources & Events</span></div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving} variant="primary" className="gap-2 shadow-lg">
            <Save className="h-4 w-4" /> {saving ? 'Saving Config...' : 'Save System Settings'}
          </Button>
        </div>
      </form>

      {/* Admin Audit Logs Feed */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <ScrollText className="h-4 w-4 text-[#FFD54A]" />
            <h4 className="font-bold text-white text-sm">Admin Audit Activity Logs</h4>
          </div>
          <span className="text-[10px] text-white/50">{auditLogs.length} logged actions</span>
        </div>

        <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
          {auditLogs.length > 0 ? (
            auditLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3 text-[11px]">
                <div>
                  <span className="font-bold text-white">{log.adminEmail}</span>
                  <p className="text-white/60 mt-0.5">{log.action}: {log.details}</p>
                </div>
                <span className="font-mono text-[10px] text-white/40">{log.target}</span>
              </div>
            ))
          ) : (
            <div className="py-4 text-center text-white/50">No audit logs recorded yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsPanel;
