// ─── Student Profile ─────────────────────────────────────

export const STUDENT = {
  id: 'stu-001',
  name: 'Arjun Sharma',
  grade: '10',
  section: 'A',
  rollNo: '1024',
  avatar: null,
  email: 'arjun.sharma@school.edu',
  role: 'student' as const,
};

// ─── Hero Stats ──────────────────────────────────────────

export const HERO_STATS = {
  attendance: { value: 87.5, label: 'Attendance', change: '+2.3%', trend: 'up' as const },
  grade: { value: 'A-', label: 'Current Grade', change: 'GPA 3.7', trend: 'neutral' as const },
  pendingHomework: { value: 4, label: 'Pending Homework', change: '2 due today', trend: 'down' as const },
  upcomingExams: { value: 3, label: 'Upcoming Exams', change: 'Next: Math (Fri)', trend: 'neutral' as const },
};

// ─── Attendance Heatmap (last 24 weeks) ──────────────────

export type DayStatus = 'present' | 'absent' | 'late' | 'holiday' | 'future';

export interface HeatmapDay {
  date: string;   // YYYY-MM-DD
  status: DayStatus;
}

// Deterministic pseudo-random from a string seed (avoids hydration mismatch)
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function generateHeatmapData(): HeatmapDay[] {
  const days: HeatmapDay[] = [];
  const now = new Date();
  // Floor to midnight UTC so server & client agree on "today"
  const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  const startDate = new Date(today);
  startDate.setUTCDate(startDate.getUTCDate() - 168); // 24 weeks back

  for (let d = new Date(startDate); d <= today; d.setUTCDate(d.getUTCDate() + 1)) {
    const dayOfWeek = d.getUTCDay(); // 0=Sun
    const dateStr = d.toISOString().slice(0, 10);

    // Sunday = holiday
    if (dayOfWeek === 0) {
      days.push({ date: dateStr, status: 'holiday' });
      continue;
    }

    // Deterministic pseudo-random from date string (weighted toward present)
    const rand = (hashCode(dateStr) % 10000) / 10000;
    if (rand < 0.82) {
      days.push({ date: dateStr, status: 'present' });
    } else if (rand < 0.92) {
      days.push({ date: dateStr, status: 'absent' });
    } else {
      days.push({ date: dateStr, status: 'late' });
    }
  }

  return days;
}

export const ATTENDANCE_HEATMAP = generateHeatmapData();

// ─── Subject-wise Marks ──────────────────────────────────

export interface SubjectMark {
  subject: string;
  score: number;
  maxScore: number;
  color: string;
  icon: string; // emoji
}

export const SUBJECT_MARKS: SubjectMark[] = [
  { subject: 'Mathematics', score: 88, maxScore: 100, color: '#0F6CBD', icon: '📐' },
  { subject: 'Science', score: 76, maxScore: 100, color: '#107C10', icon: '🔬' },
  { subject: 'English', score: 92, maxScore: 100, color: '#8A3707', icon: '📖' },
  { subject: 'History', score: 68, maxScore: 100, color: '#C50F1F', icon: '🏛️' },
  { subject: 'Computer Science', score: 95, maxScore: 100, color: '#115EA3', icon: '💻' },
  { subject: 'Physical Education', score: 80, maxScore: 100, color: '#038387', icon: '⚽' },
];

// ─── Daily Performance ───────────────────────────────────

export interface DailySummary {
  date: string;
  classesAttended: number;
  totalClasses: number;
  homeworkCompleted: number;
  totalHomework: number;
  teacherNote: string | null;
}

export const DAILY_SUMMARY: DailySummary = {
  date: new Date().toISOString().slice(0, 10),
  classesAttended: 5,
  totalClasses: 6,
  homeworkCompleted: 2,
  totalHomework: 3,
  teacherNote: 'Great participation in science lab today! Keep up the good work.',
};

// ─── Homework ────────────────────────────────────────────

export type HomeworkStatus = 'pending' | 'submitted' | 'graded' | 'overdue';
export type HomeworkPriority = 'high' | 'medium' | 'low';

export interface HomeworkItem {
  id: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string; // YYYY-MM-DD
  priority: HomeworkPriority;
  status: HomeworkStatus;
  grade?: string;
}

export const HOMEWORK_LIST: HomeworkItem[] = [
  {
    id: 'hw-1',
    subject: 'Mathematics',
    title: 'Quadratic Equations Worksheet',
    description: 'Complete exercises 4.1 to 4.5 from Chapter 4.',
    dueDate: '2026-07-01',
    priority: 'high',
    status: 'pending',
  },
  {
    id: 'hw-2',
    subject: 'Science',
    title: 'Lab Report: Chemical Reactions',
    description: 'Write a detailed lab report on the neutralization reaction experiment.',
    dueDate: '2026-07-03',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 'hw-3',
    subject: 'English',
    title: 'Essay: My Role Model',
    description: 'Write a 500-word essay on a person who inspires you.',
    dueDate: '2026-07-02',
    priority: 'medium',
    status: 'submitted',
  },
  {
    id: 'hw-4',
    subject: 'History',
    title: 'Timeline: Indian Independence',
    description: 'Create a visual timeline of key events from 1857 to 1947.',
    dueDate: '2026-06-29',
    priority: 'high',
    status: 'overdue',
  },
  {
    id: 'hw-5',
    subject: 'Computer Science',
    title: 'Python Functions Practice',
    description: 'Solve 10 function-based problems on HackerRank.',
    dueDate: '2026-07-05',
    priority: 'low',
    status: 'pending',
  },
  {
    id: 'hw-6',
    subject: 'Mathematics',
    title: 'Trigonometry Problem Set',
    description: 'Complete problems 1-15 from the trigonometry chapter.',
    dueDate: '2026-06-28',
    priority: 'medium',
    status: 'graded',
    grade: 'A',
  },
];

// ─── Period Timetable ────────────────────────────────────

export interface Period {
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

export interface DaySchedule {
  day: string;
  periods: Period[];
}

export const TIMETABLE: DaySchedule[] = [
  {
    day: 'Monday',
    periods: [
      { time: '08:00 - 08:50', subject: 'Mathematics', teacher: 'Mr. Gupta', room: '201' },
      { time: '08:50 - 09:40', subject: 'English', teacher: 'Ms. D\'Souza', room: '105' },
      { time: '09:40 - 10:30', subject: 'Science', teacher: 'Dr. Patel', room: 'Lab-1' },
      { time: '10:30 - 10:50', subject: 'Break', teacher: '', room: '' },
      { time: '10:50 - 11:40', subject: 'History', teacher: 'Ms. Khan', room: '302' },
      { time: '11:40 - 12:30', subject: 'Computer Science', teacher: 'Mr. Rao', room: 'Lab-2' },
    ],
  },
  {
    day: 'Tuesday',
    periods: [
      { time: '08:00 - 08:50', subject: 'Science', teacher: 'Dr. Patel', room: 'Lab-1' },
      { time: '08:50 - 09:40', subject: 'Mathematics', teacher: 'Mr. Gupta', room: '201' },
      { time: '09:40 - 10:30', subject: 'Physical Education', teacher: 'Mr. Singh', room: 'Ground' },
      { time: '10:30 - 10:50', subject: 'Break', teacher: '', room: '' },
      { time: '10:50 - 11:40', subject: 'English', teacher: 'Ms. D\'Souza', room: '105' },
      { time: '11:40 - 12:30', subject: 'History', teacher: 'Ms. Khan', room: '302' },
    ],
  },
  {
    day: 'Wednesday',
    periods: [
      { time: '08:00 - 08:50', subject: 'Computer Science', teacher: 'Mr. Rao', room: 'Lab-2' },
      { time: '08:50 - 09:40', subject: 'History', teacher: 'Ms. Khan', room: '302' },
      { time: '09:40 - 10:30', subject: 'Mathematics', teacher: 'Mr. Gupta', room: '201' },
      { time: '10:30 - 10:50', subject: 'Break', teacher: '', room: '' },
      { time: '10:50 - 11:40', subject: 'Science', teacher: 'Dr. Patel', room: 'Lab-1' },
      { time: '11:40 - 12:30', subject: 'English', teacher: 'Ms. D\'Souza', room: '105' },
    ],
  },
  {
    day: 'Thursday',
    periods: [
      { time: '08:00 - 08:50', subject: 'English', teacher: 'Ms. D\'Souza', room: '105' },
      { time: '08:50 - 09:40', subject: 'Physical Education', teacher: 'Mr. Singh', room: 'Ground' },
      { time: '09:40 - 10:30', subject: 'Computer Science', teacher: 'Mr. Rao', room: 'Lab-2' },
      { time: '10:30 - 10:50', subject: 'Break', teacher: '', room: '' },
      { time: '10:50 - 11:40', subject: 'Mathematics', teacher: 'Mr. Gupta', room: '201' },
      { time: '11:40 - 12:30', subject: 'Science', teacher: 'Dr. Patel', room: 'Lab-1' },
    ],
  },
  {
    day: 'Friday',
    periods: [
      { time: '08:00 - 08:50', subject: 'History', teacher: 'Ms. Khan', room: '302' },
      { time: '08:50 - 09:40', subject: 'Computer Science', teacher: 'Mr. Rao', room: 'Lab-2' },
      { time: '09:40 - 10:30', subject: 'English', teacher: 'Ms. D\'Souza', room: '105' },
      { time: '10:30 - 10:50', subject: 'Break', teacher: '', room: '' },
      { time: '10:50 - 11:40', subject: 'Mathematics', teacher: 'Mr. Gupta', room: '201' },
      { time: '11:40 - 12:30', subject: 'Science', teacher: 'Dr. Patel', room: 'Lab-1' },
    ],
  },
  {
    day: 'Saturday',
    periods: [
      { time: '08:00 - 08:50', subject: 'Physical Education', teacher: 'Mr. Singh', room: 'Ground' },
      { time: '08:50 - 09:40', subject: 'Art & Craft', teacher: 'Ms. Mehta', room: 'Art Room' },
      { time: '09:40 - 10:30', subject: 'Music', teacher: 'Mr. Das', room: 'Music Room' },
      { time: '10:30 - 10:50', subject: 'Break', teacher: '', room: '' },
      { time: '10:50 - 11:40', subject: 'Library', teacher: 'Ms. Iyer', room: 'Library' },
      { time: '11:40 - 12:30', subject: 'Club Activity', teacher: 'Various', room: 'Auditorium' },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// ─── Community Data ───────────────────────────────────────
// ═══════════════════════════════════════════════════════════

// ─── Community Post ──────────────────────────────────────

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string | null;
    role: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
}

const NOW = new Date();

function minutesAgo(m: number): string {
  const d = new Date(NOW.getTime() - m * 60 * 1000);
  return d.toISOString();
}

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: { name: 'Priya Patel', avatar: null, role: 'Student • Grade 10' },
    content:
      'Just aced the Math quiz on Quadratic Equations! 📐✨ All those late-night practice sessions paid off. Thanks to Mr. Gupta for the amazing review session yesterday!',
    timestamp: minutesAgo(12),
    likes: 24,
    comments: 5,
    shares: 2,
    isLiked: true,
    isSaved: false,
  },
  {
    id: 'post-2',
    author: { name: 'Rahul Verma', avatar: null, role: 'Student • Grade 10' },
    content:
      'Anyone else struggling with the Chemistry lab report? The titration calculations are driving me crazy 😅. Study group at the library after school — who\'s in?',
    timestamp: minutesAgo(45),
    likes: 18,
    comments: 12,
    shares: 1,
    isLiked: false,
    isSaved: true,
  },
  {
    id: 'post-3',
    author: { name: 'Ms. D\'Souza', avatar: null, role: 'English Teacher' },
    content:
      '📚 Reminder: Essay submissions for "My Role Model" are due this Friday. Please ensure proper formatting — double-spaced, 12pt Times New Roman. I\'ve been reading some fantastic drafts so far! Keep up the great work, everyone.',
    image: '/api/placeholder/600/300',
    timestamp: minutesAgo(120),
    likes: 45,
    comments: 8,
    shares: 15,
    isLiked: false,
    isSaved: false,
  },
  {
    id: 'post-4',
    author: { name: 'Ananya Singh', avatar: null, role: 'Student • Grade 10' },
    content:
      'Our basketball team made it to the inter-school finals! 🏀🔥 Proud of everyone who showed up for practice at 6 AM every day. Finals are next Saturday — come cheer for us!',
    timestamp: minutesAgo(180),
    likes: 67,
    comments: 14,
    shares: 23,
    isLiked: true,
    isSaved: false,
  },
  {
    id: 'post-5',
    author: { name: 'Mr. Rao', avatar: null, role: 'Computer Science Teacher' },
    content:
      'Excellent work on the Python functions assignment! The top 3 solutions from Grade 10-A are now displayed on the CS Lab bulletin board. Special mention to Arjun for the most elegant recursive solution 👨‍💻',
    timestamp: minutesAgo(240),
    likes: 38,
    comments: 6,
    shares: 4,
    isLiked: false,
    isSaved: true,
  },
  {
    id: 'post-6',
    author: { name: 'Vikram Joshi', avatar: null, role: 'Student • Grade 9' },
    content:
      'Hey seniors! Any tips for choosing between Computer Science and Biology for Grade 11? I\'m really confused and the deadline is next month. What are the career prospects like? 🤔',
    timestamp: minutesAgo(300),
    likes: 12,
    comments: 22,
    shares: 3,
    isLiked: false,
    isSaved: false,
  },
  {
    id: 'post-7',
    author: { name: 'Dr. Patel', avatar: null, role: 'Science Teacher' },
    content:
      '🔬 Science Fair registration is now OPEN! This year\'s theme is "Sustainable Solutions." Projects due by the 15th. Individual or teams of up to 3. Register at the science lab. Previous winners have gone on to national competitions!',
    image: '/api/placeholder/600/300',
    timestamp: minutesAgo(360),
    likes: 52,
    comments: 9,
    shares: 31,
    isLiked: true,
    isSaved: false,
  },
  {
    id: 'post-8',
    author: { name: 'Kavita Reddy', avatar: null, role: 'Student • Grade 10' },
    content:
      'Spent the whole afternoon at the library finishing the History timeline project. Pro tip: Canva has amazing templates for visual timelines! 🎨📜',
    timestamp: minutesAgo(420),
    likes: 15,
    comments: 3,
    shares: 7,
    isLiked: false,
    isSaved: false,
  },
];

// ─── Friends ─────────────────────────────────────────────

export interface Friend {
  id: string;
  name: string;
  avatar: string | null;
  isOnline: boolean;
  lastSeen?: string;
  grade?: string;
}

export const FRIENDS: Friend[] = [
  { id: 'f1', name: 'Priya Patel', avatar: null, isOnline: true, grade: '10' },
  { id: 'f2', name: 'Rahul Verma', avatar: null, isOnline: true, grade: '10' },
  { id: 'f3', name: 'Ananya Singh', avatar: null, isOnline: false, lastSeen: '10m ago', grade: '10' },
  { id: 'f4', name: 'Vikram Joshi', avatar: null, isOnline: true, grade: '9' },
  { id: 'f5', name: 'Kavita Reddy', avatar: null, isOnline: false, lastSeen: '1h ago', grade: '10' },
  { id: 'f6', name: 'Arun Nair', avatar: null, isOnline: true, grade: '10' },
  { id: 'f7', name: 'Meera Iyer', avatar: null, isOnline: false, lastSeen: '3h ago', grade: '9' },
];

// ─── Notifications ───────────────────────────────────────

export interface CommunityNotification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'share';
  message: string;
  by: string;
  timestamp: string;
  read: boolean;
}

export const NOTIFICATIONS: CommunityNotification[] = [
  { id: 'n1', type: 'like', message: 'liked your post', by: 'Priya Patel', timestamp: minutesAgo(5), read: false },
  { id: 'n2', type: 'comment', message: 'commented: "Great job!"', by: 'Rahul Verma', timestamp: minutesAgo(15), read: false },
  { id: 'n3', type: 'follow', message: 'started following you', by: 'Ananya Singh', timestamp: minutesAgo(30), read: true },
  { id: 'n4', type: 'mention', message: 'mentioned you in a post', by: 'Mr. Rao', timestamp: minutesAgo(60), read: true },
  { id: 'n5', type: 'share', message: 'shared your post', by: 'Kavita Reddy', timestamp: minutesAgo(120), read: true },
];

// ─── Suggested Friends ───────────────────────────────────

export const SUGGESTED_FRIENDS: Friend[] = [
  { id: 's1', name: 'Rohan Desai', avatar: null, isOnline: false, grade: '10' },
  { id: 's2', name: 'Neha Kapoor', avatar: null, isOnline: true, grade: '9' },
  { id: 's3', name: 'Amit Bose', avatar: null, isOnline: false, grade: '10' },
];

// ═══════════════════════════════════════════════════════════
// ─── Analytics Data ───────────────────────────────────────
// ═══════════════════════════════════════════════════════════

// ─── Monthly Attendance Trend ────────────────────────────

export interface AttendanceTrendPoint {
  month: string;
  attendance: number;
  target: number;
}

export const ATTENDANCE_TREND: AttendanceTrendPoint[] = [
  { month: 'Jan', attendance: 82, target: 85 },
  { month: 'Feb', attendance: 85, target: 85 },
  { month: 'Mar', attendance: 79, target: 85 },
  { month: 'Apr', attendance: 88, target: 85 },
  { month: 'May', attendance: 91, target: 85 },
  { month: 'Jun', attendance: 87.5, target: 85 },
];

// ─── Subject Performance (for bar chart) ─────────────────

export interface SubjectScorePoint {
  subject: string;
  score: number;
  classAvg: number;
  fill: string;
}

export const SUBJECT_SCORES: SubjectScorePoint[] = [
  { subject: 'Math', score: 88, classAvg: 72, fill: '#0F6CBD' },
  { subject: 'Science', score: 76, classAvg: 68, fill: '#107C10' },
  { subject: 'English', score: 92, classAvg: 78, fill: '#8A3707' },
  { subject: 'History', score: 68, classAvg: 70, fill: '#C50F1F' },
  { subject: 'CS', score: 95, classAvg: 74, fill: '#115EA3' },
  { subject: 'PE', score: 80, classAvg: 82, fill: '#038387' },
];

// ─── Homework Completion Stats ───────────────────────────

export interface HomeworkCompletion {
  status: string;
  count: number;
  fill: string;
}

export const HOMEWORK_COMPLETION: HomeworkCompletion[] = [
  { status: 'Completed', count: 24, fill: '#107C10' },
  { status: 'Pending', count: 4, fill: '#8A3707' },
  { status: 'Overdue', count: 1, fill: '#C50F1F' },
  { status: 'Graded', count: 18, fill: '#0F6CBD' },
];

// ─── Weekly Study Hours ──────────────────────────────────

export interface DailyStudyHours {
  day: string;
  hours: number;
  target: number;
}

export const WEEKLY_STUDY_HOURS: DailyStudyHours[] = [
  { day: 'Mon', hours: 3.5, target: 3 },
  { day: 'Tue', hours: 2.8, target: 3 },
  { day: 'Wed', hours: 4.2, target: 3 },
  { day: 'Thu', hours: 3.0, target: 3 },
  { day: 'Fri', hours: 2.2, target: 3 },
  { day: 'Sat', hours: 5.1, target: 3 },
  { day: 'Sun', hours: 1.5, target: 2 },
];

// ─── Overall Academic Progress ───────────────────────────

export interface ProgressMetric {
  category: string;
  score: number;
  fullMark: number;
}

export const OVERALL_PROGRESS: ProgressMetric[] = [
  { category: 'Attendance', score: 87.5, fullMark: 100 },
  { category: 'Academics', score: 83, fullMark: 100 },
  { category: 'Homework', score: 76, fullMark: 100 },
  { category: 'Participation', score: 90, fullMark: 100 },
  { category: 'Discipline', score: 94, fullMark: 100 },
];
