import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { CheckCircle, Bell, X } from 'lucide-react';

const API_BASE = import.meta.env?.VITE_API_URL || 
  (import.meta.env?.DEV ? 'http://localhost:5000/api' : 'https://theglobalenterprisesserver.onrender.com/api');
const STORAGE_KEYS = {
  INQUIRIES: 'global_inquiries_cache',
  TOKEN: 'global_admin_token',
  USER: 'global_admin_user',
};

const InquiryContext = createContext(null);

function playNotificationChime() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now);
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.4);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1174.66, now + 0.12);
    gain2.gain.setValueAtTime(0.25, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.6);
  } catch {
    // Audio context may be restricted by browser autoplay policies
  }
}

export function InquiryProvider({ children }) {
  const [inquiries, setInquiries] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEYS.TOKEN) || '');
  const [toastNotification, setToastNotification] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminLoginOpen, setAdminLoginOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: 'meeting',
    title: '',
    subtitle: '',
    service: '',
    metadata: {}
  });

  const openModal = useCallback((config = {}) => {
    if (!config || config.nativeEvent || config._reactName || typeof config !== 'object') {
      config = { type: 'meeting' };
    }
    setModalConfig({
      isOpen: true,
      type: config.type || 'meeting',
      title: config.title || '',
      subtitle: config.subtitle || '',
      service: config.service || '',
      metadata: config.metadata && typeof config.metadata === 'object' ? config.metadata : {}
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const openAdminLogin = useCallback(() => setAdminLoginOpen(true), []);
  const closeAdminLogin = useCallback(() => setAdminLoginOpen(false), []);

  const isLoggedIn = Boolean(adminUser && token);

  const logout = useCallback(() => {
    setToken('');
    setAdminUser(null);
    setInquiries([]);
    setUnreadCount(0);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
  }, []);

  const syncInquiriesState = useCallback((data) => {
    if (!Array.isArray(data)) return;
    setInquiries(data);
    setUnreadCount(data.filter((item) => !item.read).length);
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(data));
    } catch {
      // Storage quota exception safe handling
    }
  }, []);

  const fetchInquiries = useCallback(async () => {
    // Only fetch customer inquiries when authorized as admin
    if (!token) {
      setInquiries([]);
      setUnreadCount(0);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/inquiries`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.status === 401 || res.status === 403) {
        logout();
        return;
      }

      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          syncInquiriesState(json.data);
          return;
        }
      }
    } catch {
      // Network failure, attempt cache if authenticated
      try {
        const cached = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
        if (cached && token) {
          syncInquiriesState(JSON.parse(cached));
        }
      } catch {
        // Fallback catch
      }
    }
  }, [token, logout, syncInquiriesState]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchInquiries();
      const interval = setInterval(fetchInquiries, 8000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn, fetchInquiries]);

  const showToast = useCallback((toast, duration = 6000) => {
    const id = Date.now();
    setToastNotification({ id, ...toast });
    setTimeout(() => {
      setToastNotification((current) => (current?.id === id ? null : current));
    }, duration);
  }, []);

  const submitInquiry = async (formData) => {
    setIsLoading(true);
    let createdInquiry = null;

    try {
      const res = await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (res.ok && json.success && json.data) {
        createdInquiry = json.data;
      } else {
        throw new Error(json.message || 'Failed to submit inquiry.');
      }
    } catch (err) {
      setIsLoading(false);
      showToast({
        type: 'user',
        title: 'Submission Notice',
        message: err.message || 'Unable to submit at this moment. Please check network connection.',
      });
      return null;
    }

    const userTitle = 
      createdInquiry.type === 'meeting' ? 'Consultation Reserved' :
      createdInquiry.type === 'quote' ? 'Quotation Request Received' :
      createdInquiry.type === 'general' ? 'Partnership Request Received' : 'Inquiry Received Securely';

    showToast({
      type: 'user',
      title: userTitle,
      message: `Thank you ${createdInquiry.name}! Our team will contact you at ${createdInquiry.phone}.`,
    });

    if (isLoggedIn) {
      if (soundEnabled) {
        playNotificationChime();
      }

      setInquiries((prev) => [createdInquiry, ...prev]);
      setUnreadCount((prev) => prev + 1);

      const adminToastTitle = 
        createdInquiry.type === 'meeting' ? '📅 New Meeting Scheduled' :
        createdInquiry.type === 'quote' ? '💰 New Quotation Request' :
        createdInquiry.type === 'general' ? '📬 New General Contact' : '💡 New Service Inquiry';

      showToast({
        type: 'admin',
        title: adminToastTitle,
        name: createdInquiry.name,
        phone: createdInquiry.phone,
        service: createdInquiry.service,
        time: 'Just now',
      });
    }

    setIsLoading(false);
    return createdInquiry;
  };

  const login = async (adminId, password) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId, password }),
      });

      const json = await res.json();

      if (res.ok && json.success && json.token) {
        setToken(json.token);
        setAdminUser(json.admin);
        localStorage.setItem(STORAGE_KEYS.TOKEN, json.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(json.admin));

        setIsLoading(false);
        return { success: true };
      }

      setIsLoading(false);
      return { success: false, message: json.message || 'Invalid credentials.' };
    } catch {
      setIsLoading(false);
      return { success: false, message: 'Authentication server unavailable. Please try again later.' };
    }
  };

  const requestOTP = async (destination) => {
    if (!token) {
      return { success: false, message: 'Admin authentication required to request verification code.' };
    }

    try {
      const res = await fetch(`${API_BASE}/admin/send-otp`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ destination }),
      });
      return await res.json();
    } catch {
      return { success: false, message: 'Failed to request verification code from server.' };
    }
  };

  const changePassword = async (payload) => {
    if (!token) {
      return { success: false, message: 'Admin authentication required.' };
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/change-password`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      setIsLoading(false);
      return json;
    } catch {
      setIsLoading(false);
      return { success: false, message: 'Failed to update password. Ensure backend API is operational.' };
    }
  };

  const updateInquiryStatus = async (id, status) => {
    if (!token) return;

    setInquiries((prev) => {
      const updated = prev.map((inq) => (inq.id === id ? { ...inq, status } : inq));
      return updated;
    });

    try {
      await fetch(`${API_BASE}/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
      });
    } catch {
      // Offline fallback safe
    }
  };

  const updateInquiryNotes = async (id, notes) => {
    if (!token) return;

    setInquiries((prev) => {
      const updated = prev.map((inq) => (inq.id === id ? { ...inq, notes } : inq));
      return updated;
    });

    try {
      await fetch(`${API_BASE}/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ notes }),
      });
    } catch {
      // Offline fallback safe
    }
  };

  const markAsRead = async (id) => {
    if (!token) return;

    setInquiries((prev) => {
      const updated = prev.map((inq) => (inq.id === id ? { ...inq, read: true } : inq));
      setUnreadCount(updated.filter((item) => !item.read).length);
      try {
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    try {
      await fetch(`${API_BASE}/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ read: true }),
      });
    } catch {
      // Offline fallback safe
    }
  };

  const markAllAsRead = async () => {
    if (!token) return;

    setInquiries((prev) => {
      const updated = prev.map((inq) => ({ ...inq, read: true }));
      setUnreadCount(0);
      try {
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    try {
      await fetch(`${API_BASE}/inquiries/mark-all-read`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
    } catch {
      // Offline fallback safe
    }
  };

  const deleteInquiry = async (id) => {
    if (!token) return;

    setInquiries((prev) => {
      const updated = prev.filter((inq) => inq.id !== id);
      setUnreadCount(updated.filter((item) => !item.read).length);
      return updated;
    });

    try {
      await fetch(`${API_BASE}/inquiries/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch {
      // Offline fallback safe
    }
  };

  const bulkDeleteInquiries = async (ids) => {
    if (!token || !Array.isArray(ids) || ids.length === 0) return;

    setInquiries((prev) => {
      const updated = prev.filter((inq) => !ids.includes(inq.id));
      setUnreadCount(updated.filter((item) => !item.read).length);
      return updated;
    });

    try {
      await fetch(`${API_BASE}/inquiries/bulk-delete`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ids }),
      });
    } catch {
      // Offline fallback safe
    }
  };

  const contextValue = useMemo(
    () => ({
      inquiries,
      unreadCount,
      adminUser,
      isLoggedIn,
      isLoading,
      toastNotification,
      soundEnabled,
      setSoundEnabled,
      isAdminLoginOpen,
      openAdminLogin,
      closeAdminLogin,
      modalConfig,
      openModal,
      closeModal,
      login,
      logout,
      submitInquiry,
      updateInquiryStatus,
      updateInquiryNotes,
      markAsRead,
      markAllAsRead,
      deleteInquiry,
      bulkDeleteInquiries,
      requestOTP,
      changePassword,
      playChime: playNotificationChime,
    }),
    [
      inquiries,
      unreadCount,
      adminUser,
      isLoggedIn,
      isLoading,
      toastNotification,
      soundEnabled,
      isAdminLoginOpen,
      openAdminLogin,
      closeAdminLogin,
      modalConfig,
      openModal,
      closeModal,
      logout,
    ]
  );

  return (
    <InquiryContext.Provider value={contextValue}>
      {children}

      {toastNotification && (
        <div className="fixed bottom-6 right-6 z-[9999] max-w-md w-full transition-all duration-300">
          <div className="bg-[#180930]/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-4 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex items-start justify-between gap-3.5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5 shadow-sm">
                {toastNotification.type === 'user' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Bell className="w-5 h-5" />
                )}
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-amber-300 tracking-wide">
                  {toastNotification.title}
                </div>
                {toastNotification.message ? (
                  <p className="text-xs text-gray-200 leading-relaxed font-normal">
                    {toastNotification.message}
                  </p>
                ) : (
                  <div className="text-xs text-gray-200">
                    <p className="font-medium text-white">
                      {toastNotification.name} ({toastNotification.phone})
                    </p>
                    {toastNotification.service && (
                      <p className="text-gray-400 truncate max-w-[220px]">
                        {toastNotification.service}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setToastNotification(null)}
              className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
}
