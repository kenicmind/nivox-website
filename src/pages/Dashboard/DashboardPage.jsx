import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BellRing,
  BookOpen,
  CalendarDays,
  Clock3,
  Cpu,
  Sparkles,
  Users,
  Zap,
  User,
  Phone,
  GraduationCap,
  Building,
  Edit3,
  X,
  Check,
  Activity,
  Award,
  ShieldCheck,
  TrendingUp,
  ChevronRight,
  Flame,
  Clock,
  Plus,
  Ticket,
} from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { auth, db } from '../../firebase/firebase';
import PageHeader from '../../app/components/layout/PageHeader';
import ErrorState from '../../app/components/common/ErrorState';
import SkeletonLoader from '../../components/design/feedback/SkeletonLoader';
import Button from '../../components/design/ui/Button';
import { GlassCard } from '../../components/design/ui/Card';
import Modal from '../../components/design/feedback/Modal';
import Input from '../../components/design/forms/Input';
import Select from '../../components/design/forms/Select';
import AutocompleteInput from '../../components/design/forms/AutocompleteInput';
import BookingModal from '../../components/booking/BookingModal';
import { getMockBookings } from '../../services/mockPaymentService';
import NotificationCenter from '../../components/notifications/NotificationCenter';
import { fetchUserNotifications, markNotificationAsRead } from '../../services/notificationService';
import { NIGERIAN_INSTITUTIONS, NIGERIAN_COURSES } from '../../data/nigerianTertiaryData';

// Lightweight, GPU-accelerated motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
};

// Optimized requestAnimationFrame Counter
const AnimatedCounter = React.memo(({ target = 0, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const end = typeof target === 'number' ? target : parseInt(target, 10);
    if (isNaN(end) || end === 0) {
      setCount(end || 0);
      return;
    }

    let startTime = null;
    const duration = 300;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(end * easeOut));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [target]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
});

// Dedicated Live Clock Component (Updates once per minute instead of 1000ms)
const LiveClock = React.memo(() => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return <span>{timeStr}</span>;
});

// Memoized Stat Card Component
const StatCard = React.memo(({ title, target, suffix = '', subtitle, icon: Icon, borderColor, bgGradient, glowColor, iconColor }) => (
  <motion.div
    whileHover={{ y: -3 }}
    transition={{ duration: 0.2 }}
    className={`relative overflow-hidden rounded-[24px] border ${borderColor} ${bgGradient} p-5 text-white shadow-lg backdrop-blur-xl ${glowColor}`}
  >
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FFE7A3]">{title}</span>
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconColor}`}>
        <Icon className="h-4 w-4" />
      </div>
    </div>
    <div className="mt-3 text-3xl font-black text-white sm:text-4xl">
      <AnimatedCounter target={target} suffix={suffix} />
    </div>
    <p className="mt-1.5 text-xs text-white/60">{subtitle}</p>
  </motion.div>
));

// Memoized Quick Action Card
const QuickActionCard = React.memo(({ action }) => {
  const Icon = action.icon;
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      onClick={action.action}
      className="group cursor-pointer rounded-[20px] border border-white/15 bg-white/10 p-4 shadow-md backdrop-blur-lg transition-colors duration-200 hover:border-[#FFD54A]/40 hover:bg-white/15"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFD54A]/15 text-[#FFD54A] transition-transform duration-200 group-hover:scale-105">
          <Icon className="h-4 w-4" />
        </div>
        <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-[#FFD54A] group-hover:translate-x-0.5 transition duration-200" />
      </div>
      <h4 className="mt-3 font-bold text-white text-sm group-hover:text-[#FFE7A3] transition-colors duration-150">{action.title}</h4>
      <p className="mt-1 text-xs text-white/60 leading-relaxed">{action.description}</p>
    </motion.div>
  );
});

// Dashboard Skeleton Loader
const DashboardSkeleton = () => (
  <div className="space-y-8 py-4">
    <div className="h-44 w-full rounded-[32px] border border-white/10 bg-white/10 p-6 animate-pulse" />
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-32 rounded-[24px] border border-white/10 bg-white/10 p-6 animate-pulse" />
      ))}
    </div>
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="h-72 rounded-[32px] border border-white/10 bg-white/10 p-6 animate-pulse" />
      <div className="h-72 rounded-[24px] border border-white/10 bg-white/10 p-6 animate-pulse" />
    </div>
  </div>
);

const notifications = [
  { title: 'Your workspace is confirmed', detail: 'Creator Studio • 10:00 AM', time: '10 min ago' },
  { title: 'New resource unlocked', detail: 'Figma + AI workflow kit', time: '1 hr ago' },
  { title: 'Partner event invite', detail: 'NIVOX + HP networking session', time: '3 hrs ago' },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeBookingsCount, setActiveBookingsCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [liveNotifications, setLiveNotifications] = useState([]);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    school: '',
    course: '',
    level: '',
  });

  const [showWelcome, setShowWelcome] = useState(() => {
    return sessionStorage.getItem('showWelcomeOverlay') === 'true';
  });

  const profileCompletion = useMemo(() => {
    if (!userProfile) return 0;
    const fields = ['fullName', 'phone', 'school', 'course', 'level'];
    const completed = fields.filter((f) => !!userProfile[f]?.trim()).length;
    return Math.round((completed / fields.length) * 100);
  }, [userProfile]);

  // Fetch Profile once on Auth Change
  const fetchProfile = useCallback(() => {
    setLoading(true);
    setError(null);

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        setError('No authenticated user found. Please log in.');
        return;
      }

      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userDocRef);

        // Fetch active bookings count for student
        try {
          const bQuery = query(
            collection(db, 'reservations'),
            where('uid', '==', currentUser.uid),
            where('status', 'in', ['approved', 'upcoming'])
          );
          const bSnap = await getDocs(bQuery);
          const firestoreKeys = new Set(
            bSnap.docs.map((booking) => booking.data().paymentReference || booking.id),
          );
          const mockCount = getMockBookings(currentUser.uid)
            .filter((booking) => ['approved', 'upcoming'].includes(booking.status))
            .filter((booking) => !firestoreKeys.has(booking.paymentReference))
            .length;
          setActiveBookingsCount(bSnap.docs.length + mockCount);

          const notifs = await fetchUserNotifications(currentUser.uid);
          setLiveNotifications(notifs);
        } catch (bErr) {
          console.error('Error fetching bookings/notifications count:', bErr);
        }

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserProfile(data);
          setFormData({
            fullName: data.fullName || '',
            phone: data.phone || '',
            school: data.school || '',
            course: data.course || '',
            level: data.level || '',
          });
        } else {
          const fallbackData = {
            fullName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Student',
            email: currentUser.email || '',
            phone: '',
            school: '',
            course: '',
            level: '',
            membership: 'Student',
            role: 'student',
          };
          setUserProfile(fallbackData);
          setFormData({
            fullName: fallbackData.fullName,
            phone: '',
            school: '',
            course: '',
            level: '',
          });
        }
      } catch (err) {
        console.error('Error fetching Firestore user profile:', err);
        setError('Unable to load profile data from server.');
        const fallbackData = {
          fullName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Student',
          email: currentUser.email || '',
          phone: '',
          school: '',
          course: '',
          level: '',
          membership: 'Student',
          role: 'student',
        };
        setUserProfile(fallbackData);
        setFormData({
          fullName: fallbackData.fullName,
          phone: '',
          school: '',
          course: '',
          level: '',
        });
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = fetchProfile();
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [fetchProfile]);

  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
        sessionStorage.removeItem('showWelcomeOverlay');
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    const currentUser = auth.currentUser;
    if (!currentUser) {
      toast.error('Session expired. Please sign in again.');
      return;
    }

    try {
      setIsSaving(true);
      const userDocRef = doc(db, 'users', currentUser.uid);

      const updatedFields = {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        school: formData.school.trim(),
        course: formData.course.trim(),
        level: formData.level.trim(),
        profileCompleted: true,
        updatedAt: serverTimestamp(),
      };

      await setDoc(userDocRef, updatedFields, { merge: true });
      if (auth.currentUser && formData.fullName.trim() !== auth.currentUser.displayName) {
        await updateProfile(auth.currentUser, { displayName: formData.fullName.trim() });
      }

      setUserProfile((prev) => ({
        ...prev,
        ...updatedFields,
      }));

      toast.success('Profile updated successfully!');
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('Error updating user profile in Firestore:', err);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Static greeting based on load time
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  // Formatted date string
  const formattedDate = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, []);

  const firstName = useMemo(() => {
    return userProfile?.fullName
      ? userProfile.fullName.trim().split(' ')[0]
      : 'Student';
  }, [userProfile?.fullName]);

  // Construct dynamic timeline items efficiently
  const activityItems = useMemo(() => {
    const items = [];

    if (userProfile?.createdAt) {
      let dateString = 'Recently';
      if (userProfile.createdAt?.toDate) {
        dateString = userProfile.createdAt.toDate().toLocaleDateString();
      } else if (userProfile.createdAt instanceof Date) {
        dateString = userProfile.createdAt.toLocaleDateString();
      }
      items.push({
        id: 'registration',
        title: 'Account Created',
        description: 'Joined NIVOX Student Innovation Network',
        time: dateString,
        icon: ShieldCheck,
        color: 'text-[#FFD54A] bg-[#FFD54A]/15',
      });
    }

    if (userProfile?.profileCompleted) {
      items.push({
        id: 'profile_updated',
        title: 'Student Profile Complete',
        description: `Verified enrolled at ${userProfile.school || 'University'} (${userProfile.course || 'Degree'})`,
        time: 'Active',
        icon: Award,
        color: 'text-emerald-400 bg-emerald-500/15',
      });
    } else {
      items.push({
        id: 'profile_pending',
        title: 'Complete Student Profile',
        description: 'Update institution & course to unlock studio bookings',
        time: 'Action Required',
        icon: Edit3,
        color: 'text-amber-400 bg-amber-500/15',
      });
    }

    items.push({
      id: 'session',
      title: 'Current Session Active',
      description: 'Authenticated via Firebase Security Gate',
      time: 'Just Now',
      icon: Flame,
      color: 'text-purple-300 bg-purple-500/15',
    });

    return items;
  }, [userProfile]);

  const quickActionsInteractive = useMemo(
    () => [
      {
        id: 'workspace',
        title: 'Book a Workspace',
        description: 'Reserve your next studio session',
        icon: Cpu,
        action: () => setIsBookingModalOpen(true),
      },
      {
        id: 'my-tickets',
        title: 'My Digital Tickets',
        description: 'View entry passes & verification QR',
        icon: Ticket,
        action: () => navigate('/tickets'),
      },
      {
        id: 'profile',
        title: 'Edit Profile',
        description: 'Update institution & academic details',
        icon: User,
        action: () => setIsEditModalOpen(true),
      },
      {
        id: 'resource',
        title: 'Access Resources',
        description: 'Open learning and creator tools',
        icon: BookOpen,
        action: () => navigate('/resources'),
      },
    ],
    [navigate]
  );

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error && !userProfile) {
    return (
      <ErrorState
        title="Account Error"
        message={error}
        onRetry={fetchProfile}
      />
    );
  }

  return (
    <>
      {/* Full-screen Welcome Overlay */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            onClick={() => {
              setShowWelcome(false);
              sessionStorage.removeItem('showWelcomeOverlay');
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#140726] px-6 py-12 cursor-pointer"
          >
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_center,rgba(255,213,74,0.25)_0%,transparent_70%)]" />
            <div className="absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#2B0A5A]/60 blur-3xl" />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative z-10 flex max-w-lg flex-col items-center rounded-3xl border border-white/15 bg-white/10 p-8 sm:p-12 text-center shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
            >
              <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFD54A]/15 text-[#FFD54A] shadow-[0_0_40px_rgba(255,213,74,0.3)]">
                <img
                  src="/images/logo.png"
                  alt="NIVOX Logo"
                  className="h-16 w-16 rounded-full object-cover"
                />
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD54A]/25 bg-[#FFD54A]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#FFE7A3]">
                <Sparkles className="h-3.5 w-3.5 text-[#FFD54A]" />
                NIVOX Member Access
              </div>

              <h1 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Welcome back, {firstName}.
              </h1>

              <p className="mt-3 text-lg font-medium leading-relaxed text-white/80">
                Your innovation space is ready.
              </p>

              <div className="mt-8 h-1 w-32 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.3, ease: 'easeInOut' }}
                  className="h-full rounded-full bg-[#FFD54A] shadow-[0_0_12px_#FFD54A]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conditionally Rendered Edit Profile Modal */}
      {isEditModalOpen && (
        <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFD54A]/15 text-[#FFD54A]">
                <Edit3 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Edit Student Profile</h3>
                <p className="text-xs text-white/60">Update your account details and academic background</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSaveProfile} className="mt-6 space-y-4">
            <Input
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />

            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="e.g. +234 801 234 5678"
            />

            <AutocompleteInput
              label="School / Institution"
              name="school"
              value={formData.school}
              onChange={handleInputChange}
              options={NIGERIAN_INSTITUTIONS}
              placeholder="Search or enter institution..."
            />

            <AutocompleteInput
              label="Course / Major"
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              options={NIGERIAN_COURSES}
              placeholder="Search or enter course..."
            />

            <Select
              label="Academic Level"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
            >
              <option value="" className="bg-[#140726] text-white">Select Academic Level</option>
              <option value="100 Level" className="bg-[#140726] text-white">100 Level</option>
              <option value="200 Level" className="bg-[#140726] text-white">200 Level</option>
              <option value="300 Level" className="bg-[#140726] text-white">300 Level</option>
              <option value="400 Level" className="bg-[#140726] text-white">400 Level</option>
              <option value="500 Level" className="bg-[#140726] text-white">500 Level</option>
              <option value="Postgraduate" className="bg-[#140726] text-white">Postgraduate</option>
              <option value="Other" className="bg-[#140726] text-white">Other</option>
            </Select>

            <div className="mt-6 flex items-center justify-end gap-3 pt-2 border-t border-white/10">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsEditModalOpen(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isSaving}
              >
                {isSaving ? 'Saving Updates...' : 'Save Profile'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Main Dashboard Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10"
      >
        {error && (
          <motion.div variants={itemVariants} className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-200">
            {error}
          </motion.div>
        )}

        {/* Hero Section */}
        <motion.section
          variants={itemVariants}
          className="relative overflow-hidden rounded-[32px] border border-white/15 bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.18),transparent_35%),linear-gradient(135deg,rgba(43,10,90,0.85)_0%,rgba(20,7,38,0.95)_100%)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8 lg:p-10"
        >
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#FFD54A]/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between relative z-10">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD54A]/25 bg-[#FFD54A]/10 px-3.5 py-1.5 text-xs font-semibold text-[#FFE7A3]">
                  <Sparkles className="h-3.5 w-3.5 text-[#FFD54A]" />
                  {userProfile?.role === 'admin' ? 'Admin Portal' : 'Student Portal'}
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
                  Online • Connected
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-[#FFE7A3]">
                  <Zap className="h-3.5 w-3.5 text-[#FFD54A]" />
                  {userProfile?.membership || 'Student'} Member
                </div>
              </div>

              <h1 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                {greeting}, {firstName}.
              </h1>

              <p className="mt-3 text-base leading-7 text-white/80 sm:text-lg">
                Your NIVOX workspace is active. Connect, innovate, and build your next breakthrough today.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-white/60">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1 border border-white/10">
                  <CalendarDays className="h-3.5 w-3.5 text-[#FFD54A]" />
                  {formattedDate}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1 border border-white/10">
                  <Clock className="h-3.5 w-3.5 text-[#FFD54A]" />
                  <LiveClock />
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <Button variant="primary" onClick={() => setIsEditModalOpen(true)} className="gap-2 shadow-[0_12px_35px_rgba(255,213,74,0.25)]">
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="secondary" onClick={() => navigate('/bookings')}>
                View Calendar
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Optimized Dashboard Statistic Cards */}
        <motion.div variants={itemVariants} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Bookings"
            target={activeBookingsCount}
            subtitle="Workspace seats reserved"
            icon={Cpu}
            borderColor="border-[#FFD54A]/25"
            bgGradient="bg-[linear-gradient(135deg,rgba(255,213,74,0.12),rgba(255,255,255,0.04))]"
            glowColor="shadow-[0_16px_45px_rgba(255,213,74,0.12)]"
            iconColor="bg-[#FFD54A]/15 text-[#FFD54A]"
          />

          <StatCard
            title="Innovation Points"
            target={1250}
            subtitle="NIVOX community XP"
            icon={Award}
            borderColor="border-purple-500/25"
            bgGradient="bg-[linear-gradient(135deg,rgba(167,139,250,0.12),rgba(255,255,255,0.04))]"
            glowColor="shadow-[0_16px_45px_rgba(167,139,250,0.12)]"
            iconColor="bg-purple-500/15 text-purple-300"
          />

          <StatCard
            title="Focus Hours"
            target={48}
            suffix=" hrs"
            subtitle="Logged this month"
            icon={Flame}
            borderColor="border-emerald-500/25"
            bgGradient="bg-[linear-gradient(135deg,rgba(52,211,153,0.12),rgba(255,255,255,0.04))]"
            glowColor="shadow-[0_16px_45px_rgba(52,211,153,0.12)]"
            iconColor="bg-emerald-500/15 text-emerald-300"
          />

          <StatCard
            title="Events Attended"
            target={12}
            subtitle="Workshops & labs"
            icon={CalendarDays}
            borderColor="border-amber-500/25"
            bgGradient="bg-[linear-gradient(135deg,rgba(251,191,36,0.12),rgba(255,255,255,0.04))]"
            glowColor="shadow-[0_16px_45px_rgba(251,191,36,0.12)]"
            iconColor="bg-amber-500/15 text-amber-300"
          />
        </motion.div>

        {/* Profile Summary & Membership Tier */}
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <motion.div variants={itemVariants}>
            <GlassCard className="h-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFD54A]/15 text-[#FFD54A]">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FFE7A3]">Student Details</p>
                      <span className="rounded-full bg-[#FFD54A]/15 px-2 py-0.5 text-[10px] font-extrabold text-[#FFD54A] border border-[#FFD54A]/30">
                        {profileCompletion}% Complete
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Profile Overview</h3>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsEditModalOpen(true)}>
                  Edit
                </Button>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 rounded-[24px] border border-white/10 bg-[#140726]/50 p-5 text-sm">
                <div>
                  <span className="text-xs text-white/50 uppercase tracking-wider">Institution</span>
                  <p className="mt-1 font-semibold text-white">{userProfile?.school || 'Not specified'}</p>
                </div>
                <div>
                  <span className="text-xs text-white/50 uppercase tracking-wider">Course / Major</span>
                  <p className="mt-1 font-semibold text-white">{userProfile?.course || 'Not specified'}</p>
                </div>
                <div>
                  <span className="text-xs text-white/50 uppercase tracking-wider">Academic Level</span>
                  <p className="mt-1 font-semibold text-[#FFE7A3]">{userProfile?.level || 'Not specified'}</p>
                </div>
                <div>
                  <span className="text-xs text-white/50 uppercase tracking-wider">Phone</span>
                  <p className="mt-1 font-semibold text-white">{userProfile?.phone || 'Not specified'}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GlassCard className="h-full">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFD54A]/15 text-[#FFD54A]">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FFE7A3]">Membership Tier</p>
                  <h3 className="text-xl font-semibold text-white">{userProfile?.membership || 'Student'} Plan</h3>
                </div>
              </div>
              <div className="mt-5 rounded-[24px] border border-white/10 bg-[#140726]/50 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-white/60">Status</span>
                  <span className="rounded-full bg-[#FFD54A]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#FFD54A]">Active</span>
                </div>
                <p className="mt-4 text-3xl font-black text-white">{userProfile?.membership === 'Student' ? '₦3,500' : 'Member Pass'}</p>
                <p className="mt-2 text-xs leading-5 text-white/60">Access to workstations, studios, high-speed WiFi and community events</p>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Quick Actions Grid */}
        <motion.section variants={itemVariants}>
          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FFE7A3]">Quick Actions</p>
                <h3 className="mt-1 text-2xl font-semibold text-white">Accelerate your progress</h3>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickActionsInteractive.map((action) => (
                <QuickActionCard key={action.id} action={action} />
              ))}
            </div>
          </GlassCard>
        </motion.section>

        {/* Timeline & Notifications */}
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <motion.section variants={itemVariants}>
            <GlassCard className="h-full">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FFE7A3]">Recent Activity</p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">Your NIVOX Timeline</h3>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70">
                  <Activity className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {activityItems.length > 0 ? (
                  activityItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        className="relative flex items-start gap-4 rounded-[20px] border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:bg-white/10"
                      >
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${item.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-semibold text-white text-sm">{item.title}</p>
                            <span className="text-[11px] font-medium text-white/50">{item.time}</span>
                          </div>
                          <p className="mt-1 text-xs text-white/65 leading-5">{item.description}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="rounded-[20px] border border-white/10 bg-white/5 p-6 text-center text-white/60">
                    No recent activity recorded yet.
                  </div>
                )}
              </div>
            </GlassCard>
          </motion.section>

          <motion.section variants={itemVariants}>
            <GlassCard className="h-full">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FFE7A3]">Live Updates</p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">Notifications & Hub</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsNotificationCenterOpen(true)}>
                  View Center
                </Button>
              </div>

              <div className="mt-6 space-y-3">
                {liveNotifications.length > 0 ? (
                  liveNotifications.slice(0, 4).map((item) => (
                    <div key={item.id || item.title} className="flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/10 p-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFD54A]/15 text-[#FFD54A]">
                        <BellRing className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-white text-sm">{item.title}</p>
                          <span className="text-[10px] text-white/50">{item.time || 'Just now'}</span>
                        </div>
                        <p className="mt-0.5 text-xs text-white/60">{item.detail || item.message}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[20px] border border-white/10 bg-white/5 p-6 text-center text-xs text-white/60">
                    No new hub notifications recorded yet.
                  </div>
                )}
              </div>
            </GlassCard>
          </motion.section>
        </div>
      </motion.div>

      {/* Booking Modal Component */}
      <BookingModal
        open={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingSuccess={() => setActiveBookingsCount((prev) => prev + 1)}
      />

      {/* Notification Center Popover */}
      <NotificationCenter
        open={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
      />
    </>
  );
};

export default DashboardPage;
