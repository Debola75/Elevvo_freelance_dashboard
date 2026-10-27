import React from 'react';
import { useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import {
  ArrowDownLeft, ArrowRight, ArrowUpRight, Bell, BriefcaseBusiness, CalendarDays,
  Check, ChevronDown, ChevronRight, CircleHelp, Clock3, Command, CreditCard,
  Ellipsis, FileText, FolderKanban, LayoutDashboard, Menu, Plus, Search,
  ShieldCheck, Sparkles, UserRound, Wallet, X,
} from 'lucide-react';
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';

const activities = [
  { icon: Check, color: 'mint', title: 'Payment received', detail: 'Northstar Studio · $2,400.00', time: '12 min ago' },
  { icon: FileText, color: 'lavender', title: 'New project brief', detail: 'Horizon rebrand · 3 attachments', time: '1 hour ago' },
  { icon: CalendarDays, color: 'peach', title: 'Milestone due soon', detail: 'Landing page concepts · Tomorrow', time: '3 hours ago' },
];

const projects = [
  { name: 'Northstar brand identity', client: 'Northstar Studio', initials: 'NS', tone: 'blue', type: 'Branding', deadline: 'Oct 30, 2026', progress: 82, status: 'In progress', amount: '$4,800' },
  { name: 'Horizon website redesign', client: 'Horizon Health', initials: 'HH', tone: 'peach', type: 'Web design', deadline: 'Nov 04, 2026', progress: 56, status: 'In progress', amount: '$6,200' },
  { name: 'Sunday Social campaign', client: 'Sunday Goods', initials: 'SG', tone: 'mint', type: 'Social media', deadline: 'Nov 12, 2026', progress: 28, status: 'In progress', amount: '$2,400' },
  { name: 'Meridian pitch deck', client: 'Meridian Ventures', initials: 'MV', tone: 'lilac', type: 'Presentation', deadline: 'Nov 18, 2026', progress: 0, status: 'Not started', amount: '$1,800' },
  { name: 'Fieldnotes packaging', client: 'Fieldnotes Co.', initials: 'FC', tone: 'yellow', type: 'Packaging', deadline: 'Oct 24, 2026', progress: 100, status: 'Completed', amount: '$3,100' },
];

const earnings = [
  { month: 'May', amount: 3200 },
  { month: 'Jun', amount: 4700 },
  { month: 'Jul', amount: 3900 },
  { month: 'Aug', amount: 6100 },
  { month: 'Sep', amount: 4900 },
  { month: 'Oct', amount: 7200 },
];

function Avatar({ initials = 'JD', tone = 'blue', small = false }) {
  return <span className={`avatar avatar-${tone}${small ? ' avatar-small' : ''}`}>{initials}</span>;
}

function Sidebar({ mobileOpen, closeMobile }) {
  const nav = [
    { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/projects', label: 'Projects', icon: FolderKanban, badge: '5' },
    { to: '/profile', label: 'Profile settings', icon: UserRound },
  ];
  return (
    <>
      {mobileOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={closeMobile} />}
      <aside className={`sidebar${mobileOpen ? ' sidebar-open' : ''}`}>
        <Link to="/" className="brand" onClick={closeMobile}>
          <span className="brand-mark"><Command size={19} strokeWidth={2.6} /></span>
          <span>studiofolk<span className="brand-period">.</span></span>
        </Link>
        <div className="workspace-switcher">
          <div className="workspace-icon"><Sparkles size={16} /></div>
          <span className="workspace-copy"><strong>Jade's workspace</strong><small>Freelancer plan</small></span>
          <ChevronDown size={15} className="muted-icon" />
        </div>
        <p className="nav-caption">WORKSPACE</p>
        <nav className="primary-nav" aria-label="Main navigation">
          {nav.map(({ to, label, icon: Icon, badge, end }) => (
            <NavLink key={to} to={to} end={end} onClick={closeMobile} className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}>
              <Icon size={18} strokeWidth={1.9} /><span>{label}</span>{badge && <span className="nav-badge">{badge}</span>}
            </NavLink>
          ))}
        </nav>
        <p className="nav-caption tools-caption">TOOLS</p>
        <a className="nav-link" href="#invoices" onClick={(event) => event.preventDefault()}><CreditCard size={18} strokeWidth={1.9} /><span>Invoices</span></a>
        <a className="nav-link" href="#files" onClick={(event) => event.preventDefault()}><BriefcaseBusiness size={18} strokeWidth={1.9} /><span>Resources</span></a>
        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon"><CircleHelp size={17} /></div>
            <strong>Need a hand?</strong>
            <p>We're always happy to help you find your flow.</p>
            <a href="mailto:hello@studiofolk.example">Visit help center <ArrowRight size={13} /></a>
          </div>
          <button className="account-row">
            <Avatar initials="JD" tone="blue" small />
            <span className="account-copy"><strong>Jade Daniels</strong><small>jade@studiofolk.co</small></span>
            <Ellipsis size={18} className="muted-icon" />
          </button>
        </div>
      </aside>
    </>
  );
}

function Header({ title, openMobile }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  return (
    <header className="topbar">
      <button className="mobile-menu icon-button" aria-label="Open navigation" onClick={openMobile}><Menu size={20} /></button>
      <div className="breadcrumb"><span>Workspace</span><ChevronRight size={14} /><strong>{title}</strong></div>
      <div className="topbar-actions">
        <button className="search-trigger" aria-label="Search"><Search size={16} /><span>Search anything...</span><kbd>⌘ K</kbd></button>
        <div className="notification-wrap">
          <button className={`icon-button notification-button${notificationsOpen ? ' icon-button-on' : ''}`} aria-label="Notifications" aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen(!notificationsOpen)}>
            <Bell size={18} /><span className="notification-dot" />
          </button>
          {notificationsOpen && (
            <div className="notification-popover">
              <div className="popover-heading"><div><strong>Notifications</strong><span>You're all caught up</span></div><button className="text-button" onClick={() => setNotificationsOpen(false)}>Close</button></div>
              <div className="notification-list">{activities.map(({ icon: Icon, color, title, detail, time }) => (
                <div className="notification-item" key={title}>
                  <span className={`activity-icon ${color}`}><Icon size={15} /></span>
                  <div className="notification-copy"><strong>{title}</strong><p>{detail}</p><small>{time}</small></div>
                </div>
              ))}</div>
              <Link to="/" className="popover-link" onClick={() => setNotificationsOpen(false)}>View activity <ArrowRight size={14} /></Link>
            </div>
          )}
        </div>
        <span className="topbar-divider" />
        <Avatar initials="JD" tone="blue" small />
        <span className="topbar-name">Jade Daniels</span>
        <ChevronDown size={15} className="muted-icon topbar-chevron" />
      </div>
    </header>
  );
}

function PageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="page-heading">
      <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-description">{description}</p></div>
      {action}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend, trendText, iconTone }) {
  return (
    <article className="stat-card">
      <div className="stat-top"><span className={`stat-icon ${iconTone}`}><Icon size={17} /></span><button className="more-button" aria-label={`${label} options`}><Ellipsis size={19} /></button></div>
      <p className="stat-label">{label}</p>
      <div className="stat-bottom"><strong className="stat-value">{value}</strong><span className={`trend${trend === 'down' ? ' trend-down' : ''}`}>{trend === 'down' ? <ArrowDownLeft size={13} /> : <ArrowUpRight size={13} />}{trendText}</span></div>
    </article>
  );
}

function EarningsChart() {
  return (
    <section className="panel earnings-panel">
      <div className="panel-heading"><div><h2>Earnings overview</h2><p>Your income is looking lovely.</p></div><button className="select-button">Last 6 months <ChevronDown size={14} /></button></div>
      <div className="chart-summary"><strong>$30,000</strong><span className="trend"><ArrowUpRight size={13} /> 12.8%</span><small>vs. previous 6 months</small></div>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={earnings} margin={{ top: 8, right: 4, left: -18, bottom: 0 }} barSize={28}>
            <CartesianGrid vertical={false} stroke="#eef0f4" strokeDasharray="3 5" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9299a7', fontSize: 11, fontFamily: 'DM Sans' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9299a7', fontSize: 11, fontFamily: 'DM Sans' }} tickFormatter={(value) => `$${value / 1000}k`} ticks={[0, 2000, 4000, 6000, 8000]} />
            <Tooltip cursor={{ fill: '#f6f7f9', radius: 5 }} formatter={(value) => [`$${value.toLocaleString()}`, 'Earnings']} contentStyle={{ border: '1px solid #edeff3', borderRadius: 10, fontFamily: 'DM Sans', fontSize: 12, boxShadow: '0 8px 24px #17203312' }} />
            <Bar dataKey="amount" fill="#7664e8" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function ActivityPanel() {
  return (
    <section className="panel activity-panel">
      <div className="panel-heading"><div><h2>Recent activity</h2><p>A little update from your world.</p></div><button className="icon-more" aria-label="Activity options"><Ellipsis size={19} /></button></div>
      <div className="activity-feed">{activities.map(({ icon: Icon, color, title, detail, time }) => (
        <div className="activity-row" key={title}><span className={`activity-icon ${color}`}><Icon size={15} /></span><div className="activity-copy"><strong>{title}</strong><p>{detail}</p></div><time>{time}</time></div>
      ))}</div>
      <Link className="activity-link" to="/projects">See all activity <ArrowRight size={14} /></Link>
    </section>
  );
}

function ProjectTable({ limit, projectList = projects }) {
  const shownProjects = limit ? projectList.slice(0, limit) : projectList;
  return (
    <div className="table-scroll"><table className="project-table">
      <thead><tr><th>PROJECT</th><th>STATUS</th><th>DEADLINE</th><th>VALUE</th>{!limit && <th>PROGRESS</th>}<th aria-label="Actions" /></tr></thead>
      <tbody>{shownProjects.map((project) => (
        <tr key={project.name}>
          <td><div className="project-name-cell"><Avatar initials={project.initials} tone={project.tone} small /><div><strong>{project.name}</strong><span>{project.client} <span className="cell-dot">·</span> {project.type}</span></div></div></td>
          <td><span className={`status-pill status-${project.status.toLowerCase().replace(' ', '-')}`}><span />{project.status}</span></td>
          <td className="deadline-cell"><CalendarDays size={14} />{project.deadline}</td>
          <td className="value-cell">{project.amount}</td>
          {!limit && <td><div className="progress-cell"><span className="progress-track"><span style={{ width: `${project.progress}%` }} /></span><small>{project.progress}%</small></div></td>}
          <td><button className="row-more" aria-label={`More options for ${project.name}`}><Ellipsis size={17} /></button></td>
        </tr>
      ))}</tbody>
    </table></div>
  );
}

function Overview() {
  return (
    <>
      <PageHeading eyebrow="MONDAY, OCTOBER 26, 2026" title={<>Good morning, Jade <span className="wave">✳</span></>} description="Here's what's happening with your freelance business." action={<button className="button button-primary"><Plus size={16} /> New project</button>} />
      <div className="stats-grid">
        <StatCard icon={FolderKanban} iconTone="stat-lavender" label="Active projects" value="8" trend="up" trendText="2 this month" />
        <StatCard icon={Wallet} iconTone="stat-mint" label="Earnings this month" value="$7,240" trend="up" trendText="12.8%" />
        <StatCard icon={Clock3} iconTone="stat-peach" label="Tasks due soon" value="12" trend="down" trendText="3 overdue" />
        <StatCard icon={FileText} iconTone="stat-yellow" label="Hours this month" value="124.5" trend="up" trendText="8.2%" />
      </div>
      <div className="insights-grid"><EarningsChart /><ActivityPanel /></div>
      <section className="panel projects-preview">
        <div className="panel-heading"><div><h2>Projects in motion <span className="heading-count">5</span></h2><p>A peek at what you're working on.</p></div><Link className="button button-secondary" to="/projects">All projects <ArrowRight size={15} /></Link></div>
        <ProjectTable limit={3} />
      </section>
      <div className="footer-note"><ShieldCheck size={14} /> Your workspace is looking good <span>·</span> Last synced just now</div>
    </>
  );
}

function ProjectsPage() {
  const [filter, setFilter] = useState('All projects');
  const visible = filter === 'All projects' ? projects : projects.filter((project) => project.status === filter);
  return (
    <>
      <PageHeading eyebrow="YOUR WORKSPACE" title="Projects" description="Every idea, deadline, and little win — all in one place." action={<button className="button button-primary"><Plus size={16} /> New project</button>} />
      <div className="project-summary">
        <div className="summary-item"><span className="summary-dot dot-purple" /><span>Active</span><strong>3</strong></div>
        <span className="summary-divider" />
        <div className="summary-item"><span className="summary-dot dot-green" /><span>Completed</span><strong>1</strong></div>
        <span className="summary-divider" />
        <div className="summary-item"><span className="summary-dot dot-gray" /><span>Not started</span><strong>1</strong></div>
      </div>
      <section className="panel all-projects-panel">
        <div className="project-toolbar"><div className="filter-tabs">{['All projects', 'In progress', 'Completed', 'Not started'].map((tab) => <button key={tab} onClick={() => setFilter(tab)} className={`filter-tab${filter === tab ? ' filter-tab-active' : ''}`}>{tab}{tab === 'All projects' && <span>5</span>}</button>)}</div><button className="select-button"><CalendarDays size={14} /> All deadlines <ChevronDown size={14} /></button></div>
        <ProjectTable projectList={visible} />
        <div className="table-footer"><span>Showing <strong>{visible.length}</strong> of <strong>5</strong> projects</span><div className="pagination"><button disabled aria-label="Previous page"><ChevronRight className="flip-chevron" size={15} /></button><button className="page-current">1</button><button aria-label="Next page"><ChevronRight size={15} /></button></div></div>
      </section>
      <div className="tip-card"><span className="tip-icon"><Sparkles size={17} /></span><div><strong>Small steps add up.</strong><p>You're making great progress across your projects. Keep that momentum going!</p></div><button aria-label="Dismiss tip"><X size={16} /></button></div>
    </>
  );
}

function ProfilePage() {
  const [saved, setSaved] = useState(false);
  return (
    <>
      <PageHeading eyebrow="YOUR ACCOUNT" title="Profile settings" description="A little about you, and how clients can get in touch." />
      <div className="profile-layout">
        <section className="panel profile-card">
          <div className="profile-section-heading"><div><h2>Personal details</h2><p>Keep your profile up to date.</p></div><span className="private-label"><ShieldCheck size={13} /> Private</span></div>
          <div className="profile-avatar-row"><Avatar initials="JD" tone="blue" /><div><strong>Your profile photo</strong><p>Make a lovely first impression.</p></div><button className="button button-secondary">Change photo</button></div>
          <form onSubmit={(event) => { event.preventDefault(); setSaved(true); }}>
            <div className="form-grid">
              <label className="form-field"><span>First name</span><input defaultValue="Jade" onChange={() => setSaved(false)} /></label>
              <label className="form-field"><span>Last name</span><input defaultValue="Daniels" onChange={() => setSaved(false)} /></label>
              <label className="form-field form-full"><span>Email address</span><input type="email" defaultValue="jade@studiofolk.co" onChange={() => setSaved(false)} /><small>We'll send project updates to this address.</small></label>
              <label className="form-field form-full"><span>Bio</span><textarea defaultValue="Independent brand designer helping thoughtful businesses find their voice." rows="4" onChange={() => setSaved(false)} /><small>A short introduction for your client-facing profile.</small></label>
            </div>
            <div className="form-actions"><span className={`save-message${saved ? ' save-message-visible' : ''}`}>{saved && <><Check size={14} /> Your changes are saved.</>}</span><button type="submit" className="button button-primary">Save changes</button></div>
          </form>
        </section>
        <aside className="profile-side">
          <section className="panel password-panel"><div className="profile-section-heading"><div><h2>Password</h2><p>Keep your account secure.</p></div></div><label className="form-field"><span>Current password</span><input type="password" placeholder="••••••••••••" /></label><label className="form-field"><span>New password</span><input type="password" placeholder="At least 8 characters" /></label><button className="button button-secondary password-button">Update password</button></section>
          <div className="profile-hint"><ShieldCheck size={17} /><div><strong>Your data, your rules.</strong><p>Your personal info is only shared with clients when you choose to share it.</p><a href="#privacy" onClick={(event) => event.preventDefault()}>Learn about privacy <ArrowRight size={13} /></a></div></div>
        </aside>
      </div>
    </>
  );
}

const pageTitles = { '/': 'Overview', '/projects': 'Projects', '/profile': 'Profile settings' };

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  return (
    <div className="app-shell">
      <Sidebar mobileOpen={mobileOpen} closeMobile={() => setMobileOpen(false)} />
      <div className="main-column">
        <Header title={pageTitles[location.pathname] || 'Overview'} openMobile={() => setMobileOpen(true)} />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Overview />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
