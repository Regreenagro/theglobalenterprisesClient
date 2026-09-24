import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import { useInquiry } from '../context/InquiryContext';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MessageSquare, 
  Search, 
  Volume2, 
  VolumeX, 
  Bell, 
  LogOut, 
  Send, 
  Clock, 
  AlertCircle, 
  AlertTriangle,
  RotateCcw,
  Trash2, 
  FileText, 
  ChevronRight,
  BarChart3,
  KeyRound,
  Shield,
  X,
  Eye,
  MapPin,
  Building2,
  Copy,
  Check,
  Calendar,
  HelpCircle,
  Calculator,
  Users,
  Sparkles
} from 'lucide-react';

export default function AdminPage() {
  const navigate = useNavigate();
  const { 
    inquiries, 
    trashedInquiries = [],
    unreadCount, 
    adminUser, 
    isLoggedIn, 
    logout, 
    updateInquiryStatus, 
    updateInquiryNotes, 
    markAsRead, 
    markAllAsRead,
    deleteInquiry,
    restoreInquiry,
    permanentDeleteInquiry,
    clearBin,
    bulkDeleteInquiries,
    bulkRestoreInquiries,
    bulkPermanentDeleteInquiries,
    showToast,
    soundEnabled,
    setSoundEnabled,
    playChime,
    requestOTP,
    changePassword
  } = useInquiry();

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    description: '',
    confirmLabel: '',
    confirmColor: 'red',
    iconType: 'trash',
    onConfirm: null
  });

  const [activeTab, setActiveTab] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [customReplyMessage, setCustomReplyMessage] = useState('');
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);
  const [copiedField, setCopiedField] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [highlightedInquiryId, setHighlightedInquiryId] = useState(null);
  const notificationRef = useRef(null);

  const replyTemplates = [
    {
      title: 'Initial Acknowledgement',
      text: (inq) => `Hello ${inq.name}, thank you for reaching out to Global Enterprises regarding your inquiry for ${inq.service}. We have received your details and our senior engineering team will contact you shortly.`
    },
    {
      title: 'Schedule Technical Audit',
      text: (inq) => `Dear ${inq.name}, regarding your ${inq.service} project at ${inq.location}, we would like to schedule a 30-minute technical site audit. Please let us know your preferred date and time.`
    },
    {
      title: 'Send Commercial BOQ Quotation',
      text: (inq) => `Hello ${inq.name}, your preliminary turnkey proposal for ${inq.service} is ready. We have customized the specifications for ${inq.company}. Shall we email the official document to ${inq.email}?`
    }
  ];

  // Close notifications dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setIsNotificationsOpen(false);
      }
    };
    if (isNotificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationsOpen]);

  const handleCopyText = (text, fieldName) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleOpenDetails = (inq) => {
    setSelectedInquiry({ ...inq, read: true });
    setEditingNotes(inq.notes || '');
    setCustomReplyMessage(replyTemplates[0].text(inq));
    if (!inq.read) {
      markAsRead(inq.id);
    }
  };

  const handleNotificationItemClick = (inq) => {
    setIsNotificationsOpen(false);
    
    // Switch filter tabs if current tab filters out this item
    if (activeTab !== 'ALL' && ((activeTab === 'NEW' && inq.status !== 'New') || (activeTab === 'IN_PROGRESS' && inq.status !== 'In Progress') || (activeTab === 'CLOSED' && inq.status !== 'Closed'))) {
      setActiveTab('ALL');
    }
    if (typeFilter !== 'ALL' && typeFilter !== (inq.type || 'inquiry')) {
      setTypeFilter('ALL');
    }

    // Open lead details and mark read
    handleOpenDetails(inq);

    // Scroll to the card on the board and flash a highlight
    setTimeout(() => {
      const el = document.getElementById(`inquiry-card-${inq.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlightedInquiryId(inq.id);
        setTimeout(() => setHighlightedInquiryId(null), 3000);
      }
    }, 150);
  };

  const toggleSelectLead = (id) => {
    setSelectedLeadIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (selectedLeadIds.length === 0) return;
    if (activeTab === 'BIN') {
      setConfirmModal({
        isOpen: true,
        title: `Permanently Erase ${selectedLeadIds.length} Lead(s)?`,
        description: `This will permanently delete ${selectedLeadIds.length} selected lead(s) from the database. This action cannot be reversed.`,
        confirmLabel: `Erase (${selectedLeadIds.length}) Permanently`,
        confirmColor: 'red',
        iconType: 'permanent',
        onConfirm: () => {
          bulkPermanentDeleteInquiries(selectedLeadIds);
          setSelectedLeadIds([]);
          if (showToast) {
            showToast({
              type: 'user',
              title: 'Permanently Erased',
              message: `${selectedLeadIds.length} lead(s) permanently erased.`
            });
          }
        }
      });
    } else {
      setConfirmModal({
        isOpen: true,
        title: `Move ${selectedLeadIds.length} Lead(s) to Recycle Bin?`,
        description: `Are you sure you want to move ${selectedLeadIds.length} selected lead(s) to the Recycle Bin? You can recover them anytime.`,
        confirmLabel: `Move (${selectedLeadIds.length}) to Bin`,
        confirmColor: 'amber',
        iconType: 'trash',
        onConfirm: () => {
          bulkDeleteInquiries(selectedLeadIds);
          setSelectedLeadIds([]);
          if (showToast) {
            showToast({
              type: 'user',
              title: 'Moved to Recycle Bin',
              message: `${selectedLeadIds.length} lead(s) moved to Recycle Bin.`
            });
          }
        }
      });
    }
  };

  const handleBulkRestore = () => {
    if (selectedLeadIds.length === 0) return;
    bulkRestoreInquiries(selectedLeadIds);
    if (showToast) {
      showToast({
        type: 'user',
        title: 'Leads Recovered',
        message: `${selectedLeadIds.length} lead(s) restored to active pipeline.`
      });
    }
    setSelectedLeadIds([]);
  };

  const promptDeleteLead = (inq) => {
    setConfirmModal({
      isOpen: true,
      title: 'Move Lead to Recycle Bin?',
      description: `Are you sure you want to move lead "${inq.name}" (${inq.company || 'Enterprise Client'}) to the Recycle Bin? You can easily recover it anytime.`,
      confirmLabel: 'Move to Bin',
      confirmColor: 'amber',
      iconType: 'trash',
      onConfirm: () => {
        deleteInquiry(inq.id);
        if (selectedInquiry?.id === inq.id) setSelectedInquiry(null);
        if (showToast) {
          showToast({
            type: 'user',
            title: 'Moved to Recycle Bin',
            message: `Lead "${inq.name}" was moved to Recycle Bin.`
          });
        }
      }
    });
  };

  const handleRestoreLead = (inq) => {
    restoreInquiry(inq.id);
    if (selectedInquiry?.id === inq.id) {
      setSelectedInquiry(prev => ({ ...prev, isDeleted: false, deletedAt: null }));
    }
    if (showToast) {
      showToast({
        type: 'user',
        title: 'Lead Recovered',
        message: `Lead "${inq.name}" has been restored to active pipeline.`
      });
    }
  };

  const promptPermanentDeleteLead = (inq) => {
    setConfirmModal({
      isOpen: true,
      title: 'Permanently Erase Lead?',
      description: `Lead "${inq.name}" will be permanently removed from the database. This action CANNOT be undone.`,
      confirmLabel: 'Delete Permanently',
      confirmColor: 'red',
      iconType: 'permanent',
      onConfirm: () => {
        permanentDeleteInquiry(inq.id);
        if (selectedInquiry?.id === inq.id) setSelectedInquiry(null);
        if (showToast) {
          showToast({
            type: 'user',
            title: 'Permanently Erased',
            message: `Lead "${inq.name}" was permanently erased.`
          });
        }
      }
    });
  };

  const promptClearBin = () => {
    if (trashedInquiries.length === 0) return;
    setConfirmModal({
      isOpen: true,
      title: 'Empty Entire Recycle Bin?',
      description: `Are you sure you want to permanently erase all ${trashedInquiries.length} leads in the Recycle Bin? This action is permanent and cannot be undone.`,
      confirmLabel: `Empty Bin (${trashedInquiries.length})`,
      confirmColor: 'red',
      iconType: 'clearBin',
      onConfirm: () => {
        clearBin();
        setSelectedLeadIds([]);
        if (showToast) {
          showToast({
            type: 'user',
            title: 'Recycle Bin Emptied',
            message: 'All trashed leads were permanently removed.'
          });
        }
      }
    });
  };

  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [secTab, setSecTab] = useState('old_pass');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [otpDestination, setOtpDestination] = useState('9899933768');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [secMessage, setSecMessage] = useState(null);

  const openWhatsApp = (phone, text) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const formattedPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${formattedPhone}?text=${encodedText}`, '_blank');
  };

  const openEmailCompose = (email, inq, customText = '') => {
    if (!email || email === 'N/A') return;
    const cleanEmail = email.trim();
    const subject = `Regarding your inquiry for ${inq?.service || 'Turnkey Infrastructure Solutions'} - Global Enterprises`;
    const body = customText || (inq ? replyTemplates[0].text(inq) : '');
    
    // Direct Gmail Web Compose URL with 'to', 'su' (subject), and 'body'
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(cleanEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    const win = window.open(gmailUrl, '_blank');
    if (!win) {
      window.location.href = `mailto:${encodeURIComponent(cleanEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  };

  const handleSendOTP = async () => {
    setSecMessage(null);
    const res = await requestOTP(otpDestination);
    if (res.success) {
      setSecMessage({
        type: 'success',
        text: res.message || '6-digit verification code dispatched to registered contact.'
      });
    } else {
      setSecMessage({ type: 'error', text: res.message || 'Failed to dispatch verification code.' });
    }
  };

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    setSecMessage(null);

    if (newPass !== confirmPass) {
      setSecMessage({ type: 'error', text: 'New password and Confirm password do not match!' });
      return;
    }

    if (newPass.length < 4) {
      setSecMessage({ type: 'error', text: 'New password must be at least 4 characters long.' });
      return;
    }

    let payload = {};
    if (secTab === 'old_pass') {
      payload = { mode: 'old_password', oldPassword: oldPass, newPassword: newPass };
    } else {
      payload = { mode: 'otp', otpCode: enteredOtp, newPassword: newPass };
    }

    const res = await changePassword(payload);
    if (res.success) {
      setSecMessage({ type: 'success', text: res.message });
      setOldPass('');
      setNewPass('');
      setConfirmPass('');
      setEnteredOtp('');
      setTimeout(() => {
        setIsSecurityModalOpen(false);
        setSecMessage(null);
      }, 2500);
    } else {
      setSecMessage({ type: 'error', text: res.message });
    }
  };

  const meetingsCount = inquiries.filter(i => (i.type || 'inquiry') === 'meeting').length;
  const serviceInquiriesCount = inquiries.filter(i => (i.type || 'inquiry') === 'inquiry').length;
  const quotesCount = inquiries.filter(i => i.type === 'quote').length;
  const generalCount = inquiries.filter(i => i.type === 'general').length;

  const sourceList = activeTab === 'BIN' ? trashedInquiries : inquiries;

  const filteredInquiries = sourceList.filter(inq => {
    const inqType = inq.type || 'inquiry';
    const matchesType = 
      typeFilter === 'ALL' ? true :
      typeFilter === inqType;

    const matchesTab = 
      activeTab === 'BIN' ? true :
      activeTab === 'ALL' ? true :
      activeTab === 'NEW' ? inq.status === 'New' :
      activeTab === 'IN_PROGRESS' ? inq.status === 'In Progress' :
      activeTab === 'CONTACTED' ? inq.status === 'Contacted' :
      activeTab === 'CLOSED' ? inq.status === 'Closed' : true;

    const matchesSearch = 
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.includes(searchQuery) ||
      inq.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.location && inq.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inq.meetingDate && inq.meetingDate.includes(searchQuery)) ||
      (inq.estimatedArea && inq.estimatedArea.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesType && matchesTab && matchesSearch;
  });

  const newLeadsCount = inquiries.filter(i => i.status === 'New').length;
  const inProgressCount = inquiries.filter(i => i.status === 'In Progress').length;
  const closedCount = inquiries.filter(i => i.status === 'Closed').length;

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0d041a] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Responsive Dashboard Header */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 pb-6 border-b border-white/10 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-400 uppercase tracking-wider sm:tracking-widest">
                DYNAMIC CENTRAL CRM BOARD &bull; LIVE DATABASE ACTIVE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading text-white">
              INQUIRIES &amp; <span className="text-gold-gradient">LEADS CRM</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {selectedLeadIds.length > 0 && activeTab === 'BIN' && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={handleBulkRestore}
                  className="p-2 sm:p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold transition-all flex items-center gap-1.5 sm:gap-2 text-xs shadow-lg cursor-pointer"
                  title="Recover Selected Leads"
                >
                  <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Recover ({selectedLeadIds.length})</span>
                </button>

                <button
                  type="button"
                  onClick={handleBulkDelete}
                  className="p-2 sm:p-2.5 rounded-xl bg-red-700 hover:bg-red-600 text-white font-extrabold transition-all flex items-center gap-1.5 sm:gap-2 text-xs shadow-lg cursor-pointer"
                  title="Erase Selected Leads Permanently"
                >
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Erase ({selectedLeadIds.length})</span>
                </button>
              </div>
            )}

            {selectedLeadIds.length > 0 && activeTab !== 'BIN' && (
              <button
                type="button"
                onClick={handleBulkDelete}
                className="p-2 sm:p-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold transition-all flex items-center gap-1.5 sm:gap-2 text-xs shadow-lg cursor-pointer animate-pulse"
                title="Move Selected Leads to Recycle Bin"
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Move to Bin ({selectedLeadIds.length})</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setSelectedLeadIds([]);
                setActiveTab(activeTab === 'BIN' ? 'ALL' : 'BIN');
              }}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all flex items-center gap-1.5 sm:gap-2 text-xs font-bold cursor-pointer ${
                activeTab === 'BIN'
                  ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30 ring-2 ring-red-400/40'
                  : 'bg-red-950/40 border-red-500/30 text-red-300 hover:bg-red-950/70'
              }`}
              title="View Recycle Bin"
            >
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 shrink-0" />
              <span>Bin ({trashedInquiries.length})</span>
            </button>

            <button
              onClick={() => setIsSecurityModalOpen(true)}
              className="p-2 sm:p-2.5 rounded-xl bg-[#2b1250] border border-amber-400/60 text-amber-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-md"
              title="Change Password & Security Settings"
            >
              <KeyRound className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
              <span>Password</span>
            </button>

            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playChime();
              }}
              title={soundEnabled ? 'Audio Chime Enabled' : 'Audio Chime Muted'}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all flex items-center gap-1.5 sm:gap-2 text-xs font-bold cursor-pointer ${
                soundEnabled 
                  ? 'bg-amber-400/20 border-amber-400 text-amber-300' 
                  : 'bg-white/5 border-white/10 text-gray-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />}
              <span>{soundEnabled ? 'Chime ON' : 'Muted'}</span>
            </button>

            <div className="relative" ref={notificationRef}>
              <button
                type="button"
                onClick={() => setIsNotificationsOpen(prev => !prev)}
                className={`relative p-2 sm:p-2.5 rounded-xl border transition-all flex items-center justify-center cursor-pointer shadow-md ${
                  isNotificationsOpen 
                    ? 'bg-amber-400/25 border-amber-400 text-amber-300 ring-2 ring-amber-400/30' 
                    : 'bg-white/5 border-white/10 hover:border-amber-400/60 text-amber-400 hover:bg-white/10'
                }`}
                title="Notifications & Unread Inquiries"
                aria-label="Toggle notifications menu"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-500 text-white font-bold text-[9px] sm:text-[10px] flex items-center justify-center shadow-lg animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Menu */}
              {isNotificationsOpen && (
                <>
                  {/* Mobile Backdrop */}
                  <div 
                    onClick={() => setIsNotificationsOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[95] sm:hidden animate-fadeIn" 
                  />

                  <div className="fixed inset-x-4 top-24 max-w-sm mx-auto sm:absolute sm:inset-x-auto sm:top-full sm:mt-2.5 sm:left-0 sm:right-auto xl:left-auto xl:right-0 sm:w-[360px] max-w-[calc(100vw-2rem)] bg-[#17082e] border border-amber-400/50 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] z-[100] backdrop-blur-2xl overflow-hidden animate-fadeIn">
                  {/* Header */}
                  <div className="p-3.5 sm:p-4 bg-[#1b0833] border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
                        <Bell className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white font-heading">
                          Inquiry Notifications
                        </div>
                        <div className="text-[10px] text-amber-300 font-mono">
                          {unreadCount > 0 ? `${unreadCount} unread action required` : 'All inquiries up to date'}
                        </div>
                      </div>
                    </div>

                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAllAsRead();
                        }}
                        className="text-[10px] font-bold text-amber-400 hover:text-amber-200 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 px-2 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer shrink-0"
                        title="Mark all leads as read"
                      >
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Mark All Read</span>
                      </button>
                    )}
                  </div>

                  {/* List of Notifications */}
                  <div className="max-h-[340px] overflow-y-auto divide-y divide-white/5 no-scrollbar">
                    {unreadCount > 0 ? (
                      inquiries.filter(i => !i.read).map((inq) => (
                        <div
                          key={inq.id}
                          onClick={() => handleNotificationItemClick(inq)}
                          className="p-3 sm:p-3.5 hover:bg-amber-400/10 transition-colors cursor-pointer flex items-start gap-3 group relative bg-amber-400/[0.04]"
                        >
                          <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0 shadow-[0_0_8px_#f59e0b] animate-pulse"></span>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className="text-xs font-extrabold text-white group-hover:text-amber-300 transition-colors truncate">
                                {inq.name}
                              </span>
                              <span className="text-[9px] font-mono text-gray-400 shrink-0">
                                {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 text-[10px] text-amber-300 font-semibold mb-1">
                              <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono uppercase font-bold ${
                                inq.type === 'meeting' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                                inq.type === 'quote' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' :
                                inq.type === 'general' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                                'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              }`}>
                                {inq.type === 'meeting' ? 'MEETING' : inq.type === 'quote' ? 'QUOTE' : 'INQUIRY'}
                              </span>
                              <span className="truncate text-gray-200">{inq.service}</span>
                            </div>

                            <p className="text-[11px] text-gray-300 line-clamp-1">
                              {inq.message || inq.company || inq.phone}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-2.5">
                          <Check className="w-5 h-5" />
                        </div>
                        <div className="text-xs font-bold text-white mb-0.5">
                          No Unread Notifications
                        </div>
                        <p className="text-[11px] text-gray-400 max-w-[220px] mx-auto leading-relaxed">
                          All client inquiries and consultation bookings are currently reviewed.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-2.5 bg-[#120722] border-t border-white/10 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setIsNotificationsOpen(false);
                        setActiveTab('ALL');
                        setTypeFilter('ALL');
                        const el = document.getElementById('admin-leads-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center justify-center gap-1 w-full py-1 cursor-pointer transition-colors"
                    >
                      <span>View All Pipeline Leads ({inquiries.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </>
            )}
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-2 bg-[#1b0833] border border-white/15 px-2.5 sm:px-3 py-1.5 rounded-xl shadow-md w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-400/15 border border-amber-400/40 text-amber-400 flex items-center justify-center shrink-0">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">{adminUser.name || 'Super Admin'}</div>
                  <div className="text-[9px] sm:text-[10px] text-amber-400 font-mono leading-tight">{adminUser.role || 'Super Admin'}</div>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  navigate('/admin/login', { replace: true });
                }}
                className="ml-auto sm:ml-1 p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-red-950/70 border border-red-500/50 text-red-300 hover:bg-red-900 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer shrink-0"
                title="Logout Admin Session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="text-[11px]">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards Grid - 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">
          <div className="glass-card p-3.5 sm:p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-[#1d0b38] to-[#120722]">
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-xs font-mono text-[#a895be] uppercase truncate">TOTAL LEADS</span>
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-heading">{inquiries.length}</div>
            <div className="text-[10px] sm:text-[11px] text-emerald-400 mt-1 font-semibold truncate">Real Submissions</div>
          </div>

          <div 
            onClick={() => {
              setActiveTab('NEW');
              const el = document.getElementById('admin-leads-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="glass-card p-3.5 sm:p-5 rounded-2xl border border-amber-400/40 bg-gradient-to-br from-[#29104f] to-[#16082b] cursor-pointer hover:border-amber-400 hover:scale-[1.02] transition-all group shadow-md"
            title="Click to view all Unread Leads"
          >
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-xs font-mono text-amber-300 uppercase font-bold group-hover:text-amber-200">UNREAD</span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 animate-ping"></span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 font-heading">{unreadCount}</div>
            <div className="text-[10px] sm:text-[11px] text-amber-400 mt-1 font-semibold truncate flex items-center gap-1">
              <span>Action Required</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          <div className="glass-card p-3.5 sm:p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-[#1d0b38] to-[#120722]">
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-xs font-mono text-[#a895be] uppercase truncate">IN PROGRESS</span>
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 shrink-0" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-heading">{inProgressCount}</div>
            <div className="text-[10px] sm:text-[11px] text-purple-300 mt-1 font-semibold truncate">Under Evaluation</div>
          </div>

          <div className="glass-card p-3.5 sm:p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-[#1d0b38] to-[#120722]">
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-xs font-mono text-[#a895be] uppercase truncate">CLOSED</span>
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-heading">{closedCount}</div>
            <div className="text-[10px] sm:text-[11px] text-[#c4b5fd] mt-1 truncate">Completed Turnkey</div>
          </div>
        </div>

        {/* Query Type Filter Bar - Scrollable & Compact on mobile */}
        <div className="glass-card p-3 sm:p-4 rounded-2xl border border-white/10 mb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full no-scrollbar">
            <span className="text-[10px] sm:text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider shrink-0 mr-1">
              CATEGORY:
            </span>
            {[
              { shortLabel: 'ALL', fullLabel: 'ALL SUBMISSIONS', key: 'ALL', count: inquiries.length, icon: FileText },
              { shortLabel: 'MEETINGS', fullLabel: 'STRATEGY MEETINGS', key: 'meeting', count: meetingsCount, icon: Calendar },
              { shortLabel: 'QUOTES', fullLabel: 'QUOTES & ESTIMATOR', key: 'quote', count: quotesCount, icon: Calculator },
              { shortLabel: 'INQUIRIES', fullLabel: 'SERVICE INQUIRIES', key: 'inquiry', count: serviceInquiriesCount, icon: HelpCircle },
              { shortLabel: 'NETWORK', fullLabel: 'CORPORATE NETWORK', key: 'general', count: generalCount, icon: Users }
            ].map(typeTab => (
              <button
                key={typeTab.key}
                type="button"
                onClick={() => setTypeFilter(typeTab.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer ${
                  typeFilter === typeTab.key
                    ? 'bg-amber-400 text-[#120722] shadow-lg shadow-amber-400/20 font-black'
                    : 'bg-white/5 border border-white/10 text-[#d1c4e9] hover:bg-white/10 hover:text-white'
                }`}
              >
                <typeTab.icon className={`w-3.5 h-3.5 shrink-0 ${typeFilter === typeTab.key ? 'text-[#120722]' : 'text-amber-400'}`} />
                <span className="sm:hidden">{typeTab.shortLabel}</span>
                <span className="hidden sm:inline">{typeTab.fullLabel}</span>
                <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                  typeFilter === typeTab.key ? 'bg-[#120722] text-amber-300' : 'bg-white/10 text-white'
                }`}>
                  {typeTab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Status Tabs and Search - Responsive stack on mobile */}
        <div className="glass-card p-3 sm:p-4 rounded-2xl border border-white/10 mb-6 sm:mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto no-scrollbar">
            <span className="text-[10px] sm:text-[11px] font-mono text-[#a895be] font-bold uppercase tracking-wider shrink-0 mr-1">
              STATUS:
            </span>
            {[
              { label: 'ALL LEADS', key: 'ALL', count: inquiries.length },
              { label: 'NEW', key: 'NEW', count: newLeadsCount },
              { label: 'IN PROGRESS', key: 'IN_PROGRESS', count: inProgressCount },
              { label: 'CLOSED', key: 'CLOSED', count: closedCount },
              { label: 'RECYCLE BIN', key: 'BIN', count: trashedInquiries.length, isBin: true }
            ].map(tab => (
              <button
                key={tab.key}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.currentTarget.blur();
                  setSelectedLeadIds([]);
                  const currentY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
                  setActiveTab(tab.key);
                  window.scrollTo({ top: currentY, behavior: 'instant' });
                  requestAnimationFrame(() => {
                    window.scrollTo({ top: currentY, behavior: 'instant' });
                  });
                }}
                className={`relative px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer ${
                  activeTab === tab.key
                    ? tab.isBin
                      ? 'text-white bg-red-600 font-black shadow-lg shadow-red-600/30 z-10'
                      : 'text-[#120722] font-black z-10'
                    : tab.isBin
                    ? 'bg-red-950/40 border border-red-500/30 text-red-300 hover:bg-red-950/70'
                    : 'bg-white/5 border border-white/10 text-[#d1c4e9] hover:bg-white/10'
                }`}
              >
                {activeTab === tab.key && !tab.isBin && (
                  <motion.div
                    layoutId="activeAdminLeadTabPill"
                    className="absolute inset-0 bg-amber-400 rounded-xl shadow-lg pointer-events-none"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 32
                    }}
                  />
                )}
                {tab.isBin && <Trash2 className="w-3.5 h-3.5 shrink-0 text-red-400" />}
                <span className="relative z-10">{tab.label}</span>
                <span className={`relative z-10 px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                  activeTab === tab.key 
                    ? (tab.isBin ? 'bg-black/40 text-white' : 'bg-[#120722] text-amber-300')
                    : (tab.isBin ? 'bg-red-500/20 text-red-300' : 'bg-white/10 text-white')
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72 lg:w-80 shrink-0">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Name, Phone, Service, Area..."
              className="w-full bg-[#16082b] border border-white/15 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div id="admin-leads-section" className="space-y-6">
          {activeTab === 'BIN' && (
            <div className="glass-card p-4 sm:p-5 rounded-2xl border border-red-500/30 bg-red-950/20 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Recycle Bin ({trashedInquiries.length} Deleted Queries)</span>
                  </h3>
                  <p className="text-xs text-[#d1c4e9]">
                    Deleted queries are held here safely. You can recover any query or clear the bin anytime.
                  </p>
                </div>
              </div>

              {trashedInquiries.length > 0 && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={promptClearBin}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs flex items-center gap-1.5 shadow-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Entire Bin</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {filteredInquiries.length === 0 ? (
            activeTab === 'BIN' ? (
              <div className="glass-card p-14 text-center rounded-3xl border border-white/10 bg-[#16082b]">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Recycle Bin is Empty</h3>
                <p className="text-xs sm:text-sm text-[#d1c4e9] max-w-md mx-auto leading-relaxed mb-5">
                  No deleted queries in the Recycle Bin. If any inquiry is deleted by mistake, it will be stored here safely.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('ALL')}
                  className="btn-gold px-5 py-2 rounded-xl text-xs font-bold"
                >
                  Return to Active Leads
                </button>
              </div>
            ) : (
              <div className="glass-card p-14 text-center rounded-3xl border border-amber-400/30 bg-[#16082b]">
                <FileText className="w-14 h-14 text-amber-400/40 mx-auto mb-4 animate-bounce" />
                <h3 className="text-xl font-bold text-white mb-2">No Leads Received Yet</h3>
                <p className="text-xs sm:text-sm text-[#d1c4e9] max-w-md mx-auto leading-relaxed">
                  {searchQuery
                    ? `No leads found matching "${searchQuery}". Try searching with different keywords.`
                    : 'Your CRM database is 100% dynamic! Any form submission or meeting booked on the website will automatically pop up here with live sound notifications.'}
                </p>
              </div>
            )
          ) : (
            filteredInquiries.map((inq) => (
              <div
                key={inq.id}
                id={`inquiry-card-${inq.id}`}
                onClick={() => handleOpenDetails(inq)}
                className={`glass-card p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl border transition-all relative overflow-hidden group cursor-pointer ${
                  highlightedInquiryId === inq.id
                    ? 'ring-4 ring-amber-400 border-amber-300 shadow-[0_0_50px_rgba(245,158,11,0.6)] scale-[1.015]'
                    : inq.isDeleted
                    ? 'border-red-500/30 bg-[#1a0822] opacity-90'
                    : !inq.read 
                    ? 'border-amber-400/70 bg-gradient-to-r from-[#260e47] via-[#1a0833] to-[#1a0833] shadow-[0_0_30px_rgba(245,158,11,0.2)]' 
                    : 'border-white/10 hover:border-amber-400/50 bg-[#16082b]'
                }`}
              >
                {inq.isDeleted ? (
                  <div className="absolute top-0 left-0 bg-red-600 text-white text-[9px] font-black px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-br-xl font-mono uppercase tracking-widest flex items-center gap-1">
                    <Trash2 className="w-2.5 h-2.5" />
                    <span>IN RECYCLE BIN {inq.deletedAt ? `• ${new Date(inq.deletedAt).toLocaleDateString()}` : ''}</span>
                  </div>
                ) : !inq.read && (
                  <div className="absolute top-0 left-0 bg-amber-400 text-[#120722] text-[9px] font-black px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-br-xl font-mono uppercase tracking-widest">
                    NEW UNREAD INQUIRY
                  </div>
                )}

                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 sm:gap-6 pt-2">
                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <label 
                        onClick={(e) => e.stopPropagation()} 
                        className="flex items-center gap-1.5 sm:gap-2 cursor-pointer bg-white/5 border border-white/10 px-2 sm:px-2.5 py-1 rounded-lg hover:bg-white/10"
                      >
                        <input
                          type="checkbox"
                          checked={selectedLeadIds.includes(inq.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleSelectLead(inq.id);
                          }}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 accent-amber-400 cursor-pointer rounded"
                        />
                        <span className="text-[10px] sm:text-[11px] font-mono font-bold text-amber-300">Select</span>
                      </label>

                      <span className="text-[11px] sm:text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 sm:px-2.5 py-1 rounded-lg border border-amber-400/30">
                        {inq.id}
                      </span>

                      {/* Query Category Badge */}
                      <span className={`text-[11px] sm:text-xs font-mono font-bold px-2 sm:px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                        (inq.type === 'meeting') ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40' :
                        (inq.type === 'quote') ? 'bg-amber-400/15 text-amber-300 border-amber-400/40' :
                        (inq.type === 'general') ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40' :
                        'bg-purple-500/15 text-purple-300 border-purple-500/40'
                      }`}>
                        {inq.type === 'meeting' && <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                        {inq.type === 'quote' && <Calculator className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                        {inq.type === 'general' && <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        {(!inq.type || inq.type === 'inquiry') && <HelpCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
                        <span>
                          {inq.type === 'meeting' ? 'STRATEGY MEETING' :
                           inq.type === 'quote' ? (inq.metadata?.fromEstimator ? 'ESTIMATOR QUOTE' : 'QUOTATION') :
                           inq.type === 'general' ? 'CORPORATE LEAD' : 'SERVICE INQUIRY'}
                        </span>
                      </span>

                      <span className="text-[11px] sm:text-xs text-[#a895be] font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400 shrink-0" />
                        <span>{new Date(inq.createdAt).toLocaleString()}</span>
                      </span>
                      
                      <div onClick={(e) => e.stopPropagation()} className="ml-auto sm:ml-0">
                        <select
                          value={inq.status}
                          onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                          className={`text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full border cursor-pointer focus:outline-none ${
                            inq.status === 'New' ? 'bg-red-500/20 text-red-300 border-red-500/50' :
                            inq.status === 'In Progress' ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' :
                            inq.status === 'Contacted' ? 'bg-purple-500/20 text-purple-300 border-purple-500/50' :
                            'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                          }`}
                        >
                          <option value="New" className="bg-[#120722] text-white">🔴 New</option>
                          <option value="In Progress" className="bg-[#120722] text-white">🟡 In Progress</option>
                          <option value="Contacted" className="bg-[#120722] text-white">🟣 Contacted</option>
                          <option value="Closed" className="bg-[#120722] text-white">🟢 Closed</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold font-heading text-white flex flex-wrap items-center gap-2 group-hover:text-amber-300 transition-colors">
                        <span>{inq.name}</span>
                        {inq.company && <span className="text-xs font-semibold text-amber-300">({inq.company})</span>}
                      </h3>
                      <div className="text-xs font-bold text-amber-400 mt-1 uppercase tracking-wider">
                        Required Service: {inq.service}
                      </div>
                    </div>

                    {/* Specialized Lead Parameters depending on category */}
                    {inq.type === 'meeting' && (inq.meetingDate || inq.timeSlot || inq.meetingMode) && (
                      <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-cyan-200">
                        {inq.meetingDate && (
                          <div className="flex items-center gap-1.5 font-semibold">
                            <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>Date: <span className="text-white font-mono font-bold">{inq.meetingDate}</span></span>
                          </div>
                        )}
                        {inq.timeSlot && (
                          <div className="flex items-center gap-1.5 font-semibold">
                            <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>Slot: <span className="text-white font-mono font-bold">{inq.timeSlot}</span></span>
                          </div>
                        )}
                        {inq.meetingMode && (
                          <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[11px] font-semibold">
                            Mode: {inq.meetingMode}
                          </span>
                        )}
                      </div>
                    )}

                    {inq.type === 'quote' && (inq.estimatedArea || inq.timeline || inq.metadata?.fromEstimator) && (
                      <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-amber-200">
                        {inq.metadata?.fromEstimator && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-400 text-[#120722] text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                            <Sparkles className="w-3 h-3" />
                            <span>ESTIMATOR GENERATED</span>
                          </span>
                        )}
                        {inq.estimatedArea && (
                          <div className="flex items-center gap-1.5 font-semibold">
                            <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>Floor Area: <span className="text-white font-mono font-bold">{inq.estimatedArea}</span></span>
                          </div>
                        )}
                        {inq.timeline && (
                          <div className="flex items-center gap-1.5 font-semibold">
                            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>Timeline: <span className="text-white font-bold">{inq.timeline}</span></span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#d1c4e9]">
                      <div className="flex items-center gap-1.5 font-mono font-semibold text-white bg-white/5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-white/10">
                        <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{inq.phone}</span>
                      </div>

                      {inq.email && (
                        <div className="flex items-center gap-1.5 font-mono text-[#d1c4e9] bg-white/5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-white/10 max-w-full truncate">
                          <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span className="truncate">{inq.email}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 text-amber-300 bg-amber-400/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-amber-400/30 font-bold">
                        <span>Budget: {inq.budget}</span>
                      </div>

                      {inq.facilityType && (
                        <div className="flex items-center gap-1.5 text-purple-300 bg-purple-500/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-purple-500/30 font-medium">
                          <Building2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>Facility: {inq.facilityType}</span>
                        </div>
                      )}

                      {inq.engagementType && (
                        <div className="flex items-center gap-1.5 text-emerald-300 bg-emerald-500/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-emerald-500/30 font-medium">
                          <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Engagement: {inq.engagementType}</span>
                        </div>
                      )}

                      {inq.location && (
                        <div className="flex items-center gap-1.5 text-purple-300 bg-purple-500/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-purple-500/30 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>{inq.location}</span>
                        </div>
                      )}
                    </div>

                    <div className="p-3 sm:p-3.5 rounded-2xl bg-[#100422] border border-white/5 text-xs text-[#d1c4e9] leading-relaxed">
                      <span className="font-bold text-white block mb-0.5">Inquiry Details &amp; Requirements:</span>
                      <span className="line-clamp-3">{inq.message}</span>
                    </div>

                    {inq.notes && (
                      <div className="p-2.5 sm:p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs text-purple-200">
                        <span className="font-bold text-amber-300 block mb-0.5">Admin Internal Notes:</span>
                        <span>{inq.notes}</span>
                      </div>
                    )}
                  </div>

                  <div 
                    onClick={(e) => e.stopPropagation()} 
                    className="flex flex-col gap-2 shrink-0 lg:w-60 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6"
                  >
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider font-mono">
                      DIRECT ACTIONS
                    </span>

                    <button
                      onClick={() => handleOpenDetails(inq)}
                      className="w-full btn-gold text-[#120722] font-black text-xs py-2.5 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Full Details</span>
                    </button>

                    {/* Quick 2-column action grid on mobile, single-column on desktop */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                      <button
                        onClick={() => openWhatsApp(inq.phone, replyTemplates[0].text(inq))}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-2.5 sm:px-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer truncate"
                      >
                        <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">WhatsApp</span>
                      </button>

                      <a
                        href={`tel:${inq.phone}`}
                        className="w-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2 px-2.5 sm:px-3 rounded-xl transition-all border border-white/15 flex items-center justify-center gap-1.5 truncate"
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">Call</span>
                      </a>

                      {inq.email && inq.email !== 'N/A' && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEmailCompose(inq.email, inq);
                          }}
                          className="w-full bg-white/5 hover:bg-white/15 text-white font-medium text-xs py-2 px-2.5 sm:px-3 rounded-xl transition-all border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer truncate col-span-2 sm:col-span-1 lg:col-span-1"
                          title={`Open Gmail Compose (To: ${inq.email})`}
                        >
                          <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span className="truncate">Gmail</span>
                        </button>
                      )}
                    </div>

                    {activeTab === 'BIN' ? (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10 w-full">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRestoreLead(inq);
                          }}
                          className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
                          title="Restore lead to active pipeline"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Recover</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            promptPermanentDeleteLead(inq);
                          }}
                          className="py-1.5 px-2.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 hover:text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                          title="Erase permanently from database"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Erase</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          promptDeleteLead(inq);
                        }}
                        className="text-red-400 hover:text-red-300 text-[11px] font-semibold flex items-center justify-center gap-1 mt-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Move to Bin</span>
                      </button>
                    )}
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {isSecurityModalOpen && typeof document !== 'undefined' && createPortal(
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsSecurityModalOpen(false);
          }}
          className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
        >
          <div className="glass-card max-w-lg w-full p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-amber-400/60 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2.5">
                <KeyRound className="w-6 h-6 text-amber-400" />
                <h3 className="text-xl font-bold font-heading text-white">
                  CHANGE ADMIN PASSWORD
                </h3>
              </div>
              <button
                onClick={() => setIsSecurityModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center font-bold hover:bg-white/20 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-6 p-1 rounded-xl bg-[#120626] border border-white/10">
              <button
                onClick={() => setSecTab('old_pass')}
                className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  secTab === 'old_pass' ? 'bg-amber-400 text-[#120722]' : 'text-gray-300 hover:text-white'
                }`}
              >
                Via Old Password
              </button>
              <button
                onClick={() => setSecTab('otp')}
                className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  secTab === 'otp' ? 'bg-amber-400 text-[#120722]' : 'text-gray-300 hover:text-white'
                }`}
              >
                Via Email / Mobile OTP
              </button>
            </div>

            {secMessage && (
              <div className={`mb-5 p-3 rounded-xl border text-xs flex items-center gap-2 ${
                secMessage.type === 'success' 
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300' 
                  : 'bg-red-950/80 border-red-500/50 text-red-300'
              }`}>
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{secMessage.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
              {secTab === 'old_pass' && (
                <div>
                  <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-1.5">
                    Current Old Password
                  </label>
                  <input
                    type="password"
                    required
                    value={oldPass}
                    onChange={(e) => setOldPass(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full bg-[#16082b] border border-white/20 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}

              {secTab === 'otp' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-1.5">
                      Registered Email or Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={otpDestination}
                        onChange={(e) => setOtpDestination(e.target.value)}
                        placeholder="e.g. 9899933768 or admin@theglobal.com"
                        className="flex-1 bg-[#16082b] border border-white/20 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        className="btn-gold px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 cursor-pointer"
                      >
                        Send OTP
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-1.5">
                      Enter 6-Digit OTP Code
                    </label>
                    <input
                      type="text"
                      required
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value)}
                      placeholder="e.g. 849201"
                      className="w-full bg-[#16082b] border border-white/20 rounded-xl py-2.5 px-3.5 text-xs text-white font-mono font-bold tracking-widest focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-1.5">
                  New Admin Password
                </label>
                <input
                  type="password"
                  required
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Enter new strong password"
                  className="w-full bg-[#16082b] border border-white/20 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full bg-[#16082b] border border-white/20 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-gold py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Shield className="w-4 h-4" />
                <span>Save New Password &amp; Update Security</span>
              </button>
            </form>

          </div>
        </div>,
        document.body
      )}

      {selectedInquiry && typeof document !== 'undefined' && createPortal(
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedInquiry(null);
          }}
          className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
        >
          <div className="glass-card max-w-3xl w-full rounded-2xl sm:rounded-3xl border border-amber-400/60 shadow-2xl bg-[#17082e] flex flex-col max-h-[92vh] sm:max-h-[88vh] overflow-hidden my-auto">
            
            {/* Pinned Responsive Header */}
            <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shrink-0 bg-[#17082e]">
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between sm:justify-start gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-lg border border-amber-400/30">
                      {selectedInquiry.id}
                    </span>

                    {/* Query Category Tag in Modal Header */}
                    <span className={`text-[11px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-lg border flex items-center gap-1.5 ${
                      (selectedInquiry.type === 'meeting') ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40' :
                      (selectedInquiry.type === 'quote') ? 'bg-amber-400/15 text-amber-300 border-amber-400/40' :
                      (selectedInquiry.type === 'general') ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40' :
                      'bg-purple-500/15 text-purple-300 border-purple-500/40'
                    }`}>
                      {selectedInquiry.type === 'meeting' && <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                      {selectedInquiry.type === 'quote' && <Calculator className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                      {selectedInquiry.type === 'general' && <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                      {(!selectedInquiry.type || selectedInquiry.type === 'inquiry') && <HelpCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
                      <span>
                        {selectedInquiry.type === 'meeting' ? 'STRATEGY MEETING' :
                         selectedInquiry.type === 'quote' ? (selectedInquiry.metadata?.fromEstimator ? 'BUDGET ESTIMATOR QUOTE' : 'ITEMIZED QUOTATION') :
                         selectedInquiry.type === 'general' ? 'CORPORATE / PARTNER' : 'SERVICE INQUIRY'}
                      </span>
                    </span>

                    {selectedInquiry.isDeleted && (
                      <span className="text-[11px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-lg border bg-red-600/20 text-red-300 border-red-500/40 flex items-center gap-1">
                        <Trash2 className="w-3 h-3 text-red-400" />
                        <span>IN RECYCLE BIN</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="sm:hidden p-1.5 rounded-xl bg-white/10 text-white hover:bg-amber-400 hover:text-[#10061e] transition-colors cursor-pointer shrink-0"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-lg sm:text-2xl font-black font-heading text-white flex flex-wrap items-baseline gap-2">
                  <span>{selectedInquiry.name}</span>
                  {selectedInquiry.company && (
                    <span className="text-xs sm:text-sm font-semibold text-amber-300">
                      ({selectedInquiry.company})
                    </span>
                  )}
                </h3>

                <span className="text-[11px] sm:text-xs text-[#a895be] font-mono flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-gray-400 shrink-0" />
                  <span>{new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    updateInquiryStatus(selectedInquiry.id, newStatus);
                    setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
                  }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border cursor-pointer focus:outline-none flex-1 sm:flex-initial ${
                    selectedInquiry.status === 'New' ? 'bg-red-500/20 text-red-300 border-red-500/50' :
                    selectedInquiry.status === 'In Progress' ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' :
                    selectedInquiry.status === 'Contacted' ? 'bg-purple-500/20 text-purple-300 border-purple-500/50' :
                    'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  }`}
                >
                  <option value="New" className="bg-[#120722] text-white">🔴 Status: New</option>
                  <option value="In Progress" className="bg-[#120722] text-white">🟡 Status: In Progress</option>
                  <option value="Contacted" className="bg-[#120722] text-white">🟣 Status: Contacted</option>
                  <option value="Closed" className="bg-[#120722] text-white">🟢 Status: Closed</option>
                </select>

                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="hidden sm:flex p-2 rounded-xl bg-white/10 text-white hover:bg-amber-400 hover:text-[#10061e] transition-colors cursor-pointer shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Details Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 sm:space-y-6">
              
              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                <div className="p-3 sm:p-3.5 rounded-2xl bg-[#110524] border border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-medium">Contact Phone</span>
                      <span className="text-xs sm:text-sm font-mono font-bold text-white truncate block">{selectedInquiry.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleCopyText(selectedInquiry.phone, 'phone')}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors text-xs flex items-center gap-1"
                      title="Copy Phone Number"
                    >
                      {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className="p-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-[#120722] transition-colors"
                      title="Direct Call"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-2xl bg-[#110524] border border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-medium">Email Address</span>
                      <span className="text-xs sm:text-sm font-mono text-[#d1c4e9] truncate block">
                        {selectedInquiry.email || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {selectedInquiry.email && selectedInquiry.email !== 'N/A' && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleCopyText(selectedInquiry.email, 'email')}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors text-xs flex items-center gap-1"
                        title="Copy Email"
                      >
                        {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => openEmailCompose(selectedInquiry.email, selectedInquiry, customReplyMessage)}
                        className="p-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500 text-purple-300 hover:text-white transition-colors cursor-pointer"
                        title={`Open Gmail Compose (To: ${selectedInquiry.email})`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Requirement & Service Box */}
              <div className="p-4 rounded-2xl bg-[#110524] border border-amber-400/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider font-mono">
                      PRIMARY REQUIRED SERVICE:
                    </span>
                    <div className="text-sm font-extrabold text-white mt-0.5">
                      {selectedInquiry.service}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    {selectedInquiry.budget && (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold">
                        Budget: {selectedInquiry.budget}
                      </span>
                    )}
                    {selectedInquiry.location && (
                      <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-purple-400" />
                        <span>{selectedInquiry.location}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Specialized Query Parameters Callout */}
                {selectedInquiry.type === 'meeting' && (selectedInquiry.meetingDate || selectedInquiry.timeSlot || selectedInquiry.meetingMode) && (
                  <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 space-y-1.5 text-xs text-cyan-200">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                      SCHEDULED MEETING SPECIFICATIONS:
                    </span>
                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      {selectedInquiry.meetingDate && (
                        <div className="flex items-center gap-1.5 font-bold">
                          <Calendar className="w-4 h-4 text-cyan-400" />
                          <span>Consultation Date: <span className="text-white font-mono">{selectedInquiry.meetingDate}</span></span>
                        </div>
                      )}
                      {selectedInquiry.timeSlot && (
                        <div className="flex items-center gap-1.5 font-bold">
                          <Clock className="w-4 h-4 text-cyan-400" />
                          <span>Time Slot: <span className="text-white font-mono">{selectedInquiry.timeSlot}</span></span>
                        </div>
                      )}
                      {selectedInquiry.meetingMode && (
                        <div className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-xs font-semibold">
                          Mode: {selectedInquiry.meetingMode}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedInquiry.type === 'quote' && (
                  <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-1.5 text-xs text-amber-200">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                        TURNKEY QUOTE SPECIFICATIONS:
                      </span>
                      {selectedInquiry.metadata?.fromEstimator && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-400 text-[#120722] text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>INSTANT ESTIMATOR SUBMISSION</span>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      {selectedInquiry.estimatedArea && (
                        <div className="flex items-center gap-1.5 font-bold">
                          <Building2 className="w-4 h-4 text-amber-400" />
                          <span>Estimated Area: <span className="text-white font-mono">{selectedInquiry.estimatedArea}</span></span>
                        </div>
                      )}
                      {selectedInquiry.timeline && (
                        <div className="flex items-center gap-1.5 font-bold">
                          <Clock className="w-4 h-4 text-amber-400" />
                          <span>Execution Timeline: <span className="text-white">{selectedInquiry.timeline}</span></span>
                        </div>
                      )}
                      {selectedInquiry.budget && selectedInquiry.budget !== 'Undisclosed' && (
                        <div className="flex items-center gap-1.5 font-bold text-amber-300">
                          <span>Target Budget: <span className="text-white font-mono">{selectedInquiry.budget}</span></span>
                        </div>
                      )}
                    </div>

                    {selectedInquiry.metadata?.scopeNotes && (
                      <div className="text-[11px] text-amber-300/90 font-mono mt-1 pt-1 border-t border-amber-500/20">
                        {selectedInquiry.metadata.scopeNotes}
                      </div>
                    )}
                  </div>
                )}

                {(selectedInquiry.facilityType || selectedInquiry.engagementType) && (
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    {selectedInquiry.facilityType && (
                      <div className="flex items-center gap-1.5 text-purple-300 bg-purple-500/10 px-3 py-1.5 rounded-xl border border-purple-500/30 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-purple-400" />
                        <span>Facility Type: <span className="text-white font-semibold">{selectedInquiry.facilityType}</span></span>
                      </div>
                    )}
                    {selectedInquiry.engagementType && (
                      <div className="flex items-center gap-1.5 text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30 font-medium">
                        <Users className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Engagement Nature: <span className="text-white font-semibold">{selectedInquiry.engagementType}</span></span>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-gray-200">
                      Full Requirement / Message:
                    </span>
                    <button
                      onClick={() => handleCopyText(selectedInquiry.message, 'message')}
                      className="text-[11px] text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedField === 'message' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedField === 'message' ? 'Copied!' : 'Copy Text'}</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-[#d1c4e9] leading-relaxed p-3 rounded-xl bg-[#0b0318] border border-white/5 whitespace-pre-wrap select-text font-normal">
                    {selectedInquiry.message}
                  </p>
                </div>
              </div>

              {/* Internal Office Notes */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Internal Private Notes (Office Tracking):
                </label>
                <textarea
                  rows={2}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Add internal notes on site audits, Quotation sent, BOQ estimates, follow-ups..."
                  className="w-full bg-[#110524] border border-white/20 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <button
                  onClick={() => {
                    updateInquiryNotes(selectedInquiry.id, editingNotes);
                    setSelectedInquiry(prev => ({ ...prev, notes: editingNotes }));
                    handleCopyText(editingNotes, 'notes_saved');
                  }}
                  className="btn-glass px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:border-amber-400 cursor-pointer text-amber-300"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{copiedField === 'notes_saved' ? 'Notes Saved Successfully!' : 'Save Notes'}</span>
                </button>
              </div>

              {/* Quick WhatsApp / SMS Dispatcher */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <label className="block text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Instant WhatsApp Follow-Up:</span>
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {replyTemplates.map((tmpl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCustomReplyMessage(tmpl.text(selectedInquiry))}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-amber-400/20 border border-white/10 hover:border-amber-400 text-left text-xs font-semibold text-white transition-all cursor-pointer"
                    >
                      {tmpl.title}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={3}
                  value={customReplyMessage}
                  onChange={(e) => setCustomReplyMessage(e.target.value)}
                  className="w-full bg-[#110524] border border-white/20 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                />

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={() => openWhatsApp(selectedInquiry.phone, customReplyMessage)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send on WhatsApp ({selectedInquiry.phone})</span>
                  </button>

                  {selectedInquiry.email && selectedInquiry.email !== 'N/A' && (
                    <button
                      type="button"
                      onClick={() => openEmailCompose(selectedInquiry.email, selectedInquiry, customReplyMessage)}
                      className="sm:w-auto px-5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                      title={`Open Gmail Compose with prefilled draft to ${selectedInquiry.email}`}
                    >
                      <Mail className="w-4 h-4" />
                      <span>Compose in Gmail</span>
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Pinned Footer */}
            <div className="p-4 sm:p-6 pt-3 sm:pt-4 border-t border-white/10 bg-[#120524]/95 backdrop-blur-md flex items-center justify-between gap-4 shrink-0">
              {selectedInquiry.isDeleted ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleRestoreLead(selectedInquiry);
                      setSelectedInquiry(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Recover Lead</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      promptPermanentDeleteLead(selectedInquiry);
                    }}
                    className="text-red-400 hover:text-red-300 text-xs font-semibold flex items-center gap-1 cursor-pointer px-2 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Erase Permanently</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    promptDeleteLead(selectedInquiry);
                  }}
                  className="text-red-400 hover:text-red-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Move to Bin</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="btn-gold px-6 py-2.5 rounded-xl text-xs font-black cursor-pointer shadow-lg"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* THEMED CONFIRMATION MODAL POPUP */}
      {confirmModal.isOpen && typeof document !== 'undefined' && createPortal(
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setConfirmModal(prev => ({ ...prev, isOpen: false }));
          }}
          className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
        >
          <div className="relative w-full max-w-md glass-card rounded-3xl border border-amber-400/40 bg-[#180933] shadow-[0_0_50px_rgba(245,158,11,0.2)] p-6 sm:p-7 text-center overflow-hidden my-auto animate-scaleUp">
            {/* Ambient background glows */}
            <div className={`absolute -top-12 -left-12 w-36 h-36 rounded-full blur-3xl pointer-events-none ${
              confirmModal.confirmColor === 'red' ? 'bg-red-500/20' :
              confirmModal.confirmColor === 'emerald' ? 'bg-emerald-500/20' : 'bg-amber-400/20'
            }`} />
            <div className={`absolute -bottom-12 -right-12 w-36 h-36 rounded-full blur-3xl pointer-events-none ${
              confirmModal.confirmColor === 'red' ? 'bg-red-500/15' : 'bg-amber-400/15'
            }`} />

            {/* Icon Badge */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 border shadow-lg relative z-10 ${
              confirmModal.iconType === 'trash'
                ? 'bg-amber-400/15 border-amber-400/30 text-amber-400 shadow-amber-400/10'
                : confirmModal.iconType === 'restore'
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-emerald-500/10'
                : 'bg-red-500/15 border-red-500/30 text-red-400 shadow-red-500/10'
            }`}>
              {confirmModal.iconType === 'trash' && <Trash2 className="w-7 h-7" />}
              {confirmModal.iconType === 'restore' && <RotateCcw className="w-7 h-7" />}
              {(confirmModal.iconType === 'permanent' || confirmModal.iconType === 'clearBin') && (
                <AlertTriangle className="w-7 h-7" />
              )}
            </div>

            {/* Title & Description */}
            <h3 className="text-lg sm:text-xl font-black font-heading text-white mb-2 relative z-10">
              {confirmModal.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#d1c4e9] leading-relaxed mb-6 relative z-10">
              {confirmModal.description}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 relative z-10">
              <button
                type="button"
                onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  const action = confirmModal.onConfirm;
                  setConfirmModal(prev => ({ ...prev, isOpen: false }));
                  if (typeof action === 'function') action();
                }}
                className={`flex-1 py-2.5 px-4 rounded-xl font-black text-xs shadow-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  confirmModal.confirmColor === 'red'
                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30'
                    : confirmModal.confirmColor === 'emerald'
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                    : 'bg-amber-400 hover:bg-amber-300 text-[#120722] shadow-amber-400/30'
                }`}
              >
                {confirmModal.confirmColor === 'red' ? (
                  <Trash2 className="w-3.5 h-3.5" />
                ) : confirmModal.confirmColor === 'emerald' ? (
                  <RotateCcw className="w-3.5 h-3.5" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                <span>{confirmModal.confirmLabel || 'Confirm'}</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
