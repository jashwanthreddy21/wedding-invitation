import { useState, useEffect, FormEvent } from 'react';
import { RSVP } from '../types';
import { Users, MapPin, CheckCircle, XCircle, Search, Download, Trash2, Shield, CalendarDays } from 'lucide-react';

interface HostDashboardProps {
  onRSVPUpdateTrigger?: number; // state value from parent to trigger lists reload
}

export default function HostDashboard({ 
  onRSVPUpdateTrigger = 0
}: HostDashboardProps) {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Suffix/offset to show passcode guidelines
  const SYSTEM_KEY = "Chinnu0107"; // simple preset passcode to avoid complete lockouts

  useEffect(() => {
    loadRSVPs();
  }, [onRSVPUpdateTrigger]);

  const loadRSVPs = () => {
    const listRaw = localStorage.getItem('wedding_rsvps');
    if (listRaw) {
      try {
        setRsvps(JSON.parse(listRaw));
      } catch {
        setRsvps([]);
      }
    }
  };

  const handleVerify = (e: FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toLowerCase() === SYSTEM_KEY.toLowerCase()) {
      setIsAuthenticated(true);
      setErrorMsg('');
      loadRSVPs();
    } else {
      setErrorMsg('Invalid passcode! Please try again.');
    }
  };

  const handleDelete = (id: string) => {
    const filtered = rsvps.filter(item => item.id !== id);
    localStorage.setItem('wedding_rsvps', JSON.stringify(filtered));
    setRsvps(filtered);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all RSVP data? This cannot be undone.')) {
      localStorage.setItem('wedding_rsvps', JSON.stringify([]));
      setRsvps([]);
    }
  };

  // Analytics
  const stats = {
    total: rsvps.length,
    attending: rsvps.filter(r => r.attending === 'yes').length,
    declined: rsvps.filter(r => r.attending === 'no').length,
  };

  // Filtering
  const filteredRsvps = rsvps.filter(item => 
    item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.village || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.message || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // CSV Export
  const handleExportCSV = () => {
    if (rsvps.length === 0) {
      alert('No RSVP data available to export.');
      return;
    }

    const headers = ['ID', 'Full Name', 'Village', 'Attending', 'Message', 'Submitted At'];
    const rows = rsvps.map(item => [
      item.id,
      `"${item.fullName.replace(/"/g, '""')}"`,
      `"${(item.village || '').replace(/"/g, '""')}"`,
      item.attending === 'yes' ? 'Yes' : 'No',
      `"${(item.message || '').replace(/"/g, '""')}"`,
      item.submittedAt
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Wedding_RSVPs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="host-dashboard-block" className="mt-12 mb-6 px-4">
      <div className="border border-dashed border-[#D4AF37]/40 rounded-2xl bg-[#FCF8F2] p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#aa771c]" />
            <h4 className="font-display text-[#4A0404] text-sm uppercase font-semibold tracking-wider">
              Wedding Host Dashboard
            </h4>
          </div>
          
          <button 
            id="toggle-dashboard-active"
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs bg-[#4A0404] text-[#D4AF37] px-3 py-1.5 rounded-full hover:bg-[#8B0000] transition-colors cursor-pointer font-sans"
          >
            {isOpen ? 'Close Dashboard' : 'View Dashboard'}
          </button>
        </div>

        {isOpen && (
          <div className="mt-5 border-t border-stone-200 pt-5">
            {!isAuthenticated ? (
              <form id="dashboard-protect-form" onSubmit={handleVerify} className="space-y-3">
                <p className="text-xs text-stone-500">
                  Please verify your passcode to view submitted guest RSVPs and greeting messages.
                </p>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2">
                    <input
                      id="dashboard-passcode"
                      type="password"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Enter passcode"
                      className="flex-1 text-xs border border-stone-300 rounded-lg px-3 py-2 bg-white text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#aa771c]"
                    />
                    <button
                      id="dashboard-verify-btn"
                      type="submit"
                      className="text-xs font-semibold bg-gradient-to-r from-[#aa771c] to-[#bf953f] text-white px-4 py-2 rounded-lg cursor-pointer hover:brightness-105"
                    >
                      Verify
                    </button>
                  </div>
                  {errorMsg && (
                    <p className="text-[11px] text-red-600 mt-1">{errorMsg}</p>
                  )}
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                {/* Stats Counters Grid */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200/50 flex flex-col items-center">
                    <Users className="w-4 h-4 text-amber-600" />
                    <span className="font-display font-bold text-lg text-amber-800 mt-1">{stats.total}</span>
                    <span className="text-[9px] text-stone-500 uppercase tracking-wider">Total RSVPs</span>
                  </div>
                  
                  <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200/50 flex flex-col items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="font-display font-bold text-lg text-emerald-800 mt-1">{stats.attending}</span>
                    <span className="text-[9px] text-stone-500 uppercase tracking-wider">Confirmed</span>
                  </div>

                  <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-200/50 flex flex-col items-center">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span className="font-display font-bold text-lg text-rose-800 mt-1">{stats.declined}</span>
                    <span className="text-[9px] text-stone-500 uppercase tracking-wider">Declined</span>
                  </div>
                </div>

                {/* Dashboard Controls toolbar */}
                <div className="flex flex-col sm:flex-row gap-2 justify-between items-stretch sm:items-center">
                  {/* Search box */}
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-2.5 flex items-center text-stone-400">
                      <Search className="w-3.5 h-3.5" />
                    </span>
                    <input
                      id="dashboard-search"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search guests or messages..."
                      className="w-full text-xs border border-stone-200 rounded-lg pl-8 pr-3 py-1.5 bg-white text-stone-800 focus:outline-none"
                    />
                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-2 justify-end">
                    <button
                      id="dashboard-export-btn"
                      onClick={handleExportCSV}
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-lg hover:bg-amber-200 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Export
                    </button>
                    {rsvps.length > 0 && (
                      <button
                        id="dashboard-clear-all"
                        onClick={handleClearAll}
                        className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-red-50 text-red-600 border border-red-200 px-2 py-1.5 rounded-lg hover:bg-red-100 cursor-pointer"
                      >
                        Reset All
                      </button>
                    )}
                  </div>
                </div>

                {/* RSVPs Tables List */}
                <div className="border border-stone-200 rounded-xl bg-white max-h-60 overflow-y-auto shadow-inner">
                  {filteredRsvps.length === 0 ? (
                    <div className="p-8 text-center text-xs text-stone-400">
                      No matching RSVP records found.
                    </div>
                  ) : (
                    <div className="divide-y divide-stone-100">
                      {filteredRsvps.map((rsvp) => (
                        <div key={rsvp.id} className="p-3 hover:bg-stone-50 transition-colors text-xs flex flex-col gap-1 relative group">
                          <div className="flex items-start justify-between">
                            <div className="flex flex-col">
                              <span className="font-semibold text-stone-800 inline-flex items-center gap-1.5">
                                {rsvp.fullName}
                                {rsvp.attending === 'yes' ? (
                                  <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded-full font-sans">
                                    Attending
                                  </span>
                                ) : (
                                  <span className="bg-rose-100 text-rose-800 text-[9px] px-1.5 py-0.5 rounded-full font-sans">
                                    Declined
                                  </span>
                                )}
                              </span>
                              <span className="text-[10px] text-stone-500 inline-flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-stone-400" /> {rsvp.village}
                              </span>
                            </div>

                            <button
                              id={`delete-rsvp-${rsvp.id}`}
                              onClick={() => handleDelete(rsvp.id)}
                              className="text-stone-300 hover:text-red-600 cursor-pointer p-1 rounded-md hover:bg-stone-100"
                              title="Delete Submission"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {rsvp.message && (
                            <div className="bg-stone-50 border-l-2 border-amber-300 rounded p-2 mt-1 italic text-stone-600 text-[11px] text-left">
                              "{rsvp.message}"
                            </div>
                          )}
                          <span className="text-[9px] text-stone-400 text-right font-mono mt-1 flex items-center justify-end gap-1">
                            <CalendarDays className="w-2.5 h-2.5" /> {new Date(rsvp.submittedAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>


              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
