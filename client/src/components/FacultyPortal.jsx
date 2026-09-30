import { useState } from 'react';

export default function FacultyPortal({ onBackToHome }) {

  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>

        <div>
          <h1 style={styles.title}>👨‍🏫 Faculty Portal</h1>
          <p style={styles.welcome}>Welcome, RVU Faculty</p>
        </div>

        <button
          style={styles.backButton}
          onClick={onBackToHome}
        >
          ← Back to Main Campus View
        </button>

      </div>

      {/* Navigation */}
      <div style={styles.tabs}>

        <button
          style={activeTab === 'dashboard' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>

        <button
          style={activeTab === 'notices' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('notices')}
        >
          Post Notices
        </button>

        <button
          style={activeTab === 'assignments' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('assignments')}
        >
          Post Assignments
        </button>

        <button
          style={activeTab === 'attendance' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('attendance')}
        >
          Mark Attendance
        </button>

        <button
          style={activeTab === 'events' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('events')}
        >
          View Events
        </button>

        <button
          style={activeTab === 'submissions' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('submissions')}
        >
          View Submissions
        </button>

      </div>

      {/* Content */}
      <div style={styles.content}>

        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <>
            <h2 style={styles.sectionTitle}>
              📊 Faculty Dashboard
            </h2>

            <div style={styles.dashboardGrid}>

              <div style={styles.card}>
                <h3>👥 Students</h3>
                <p style={styles.number}>45</p>
              </div>

              <div style={styles.card}>
                <h3>📝 Assignments</h3>
                <p style={styles.number}>8</p>
              </div>

              <div style={styles.card}>
                <h3>📢 Notices</h3>
                <p style={styles.number}>5</p>
              </div>

            </div>

            <h3 style={styles.subTitle}>
              Quick Overview
            </h3>

            <p style={styles.info}>
              Manage notices, assignments, student attendance,
              events and assignment submissions from the Faculty Portal.
            </p>
          </>
        )}

        {/* POST NOTICES */}
        {activeTab === 'notices' && (
          <>
            <h2 style={styles.sectionTitle}>
              📢 Post Notices
            </h2>

            <label style={styles.label}>Notice Title</label>
            <input
              type="text"
              placeholder="Enter notice title"
              style={styles.input}
            />

            <label style={styles.label}>Description</label>
            <textarea
              placeholder="Enter notice details"
              style={styles.textarea}
            />

            <button style={styles.actionButton}>
              Post Notice
            </button>
          </>
        )}

        {/* POST ASSIGNMENTS */}
        {activeTab === 'assignments' && (
          <>
            <h2 style={styles.sectionTitle}>
              📝 Post Assignments
            </h2>

            <label style={styles.label}>Assignment Title</label>
            <input
              type="text"
              placeholder="Enter assignment title"
              style={styles.input}
            />

            <label style={styles.label}>Subject</label>
            <input
              type="text"
              placeholder="Enter subject"
              style={styles.input}
            />

            <label style={styles.label}>Due Date</label>
            <input
              type="date"
              style={styles.input}
            />

            <button style={styles.actionButton}>
              Post Assignment
            </button>
          </>
        )}

        {/* MARK ATTENDANCE */}
        {activeTab === 'attendance' && (
          <>
            <h2 style={styles.sectionTitle}>
              📋 Mark Attendance
            </h2>

            <h3 style={styles.subTitle}>
              CS3301 - Full Stack Development
            </h3>

            <div style={styles.studentRow}>
              <span>Aniketh</span>
              <button style={styles.presentButton}>
                Present
              </button>
            </div>

            <div style={styles.studentRow}>
              <span>Student 2</span>
              <button style={styles.presentButton}>
                Present
              </button>
            </div>

            <div style={styles.studentRow}>
              <span>Student 3</span>
              <button style={styles.absentButton}>
                Absent
              </button>
            </div>

            <button style={styles.actionButton}>
              Save Attendance
            </button>
          </>
        )}

        {/* VIEW EVENTS */}
        {activeTab === 'events' && (
          <>
            <h2 style={styles.sectionTitle}>
              🎉 Campus Events
            </h2>

            <div style={styles.event}>
              <h3>RVU Tech Fest 2026</h3>
              <p>September 20, 2026</p>
            </div>

            <div style={styles.event}>
              <h3>Faculty Development Program</h3>
              <p>September 25, 2026</p>
            </div>

            <div style={styles.event}>
              <h3>Annual Sports Meet</h3>
              <p>October 5, 2026</p>
            </div>
          </>
        )}

        {/* VIEW SUBMISSIONS */}
        {activeTab === 'submissions' && (
          <>
            <h2 style={styles.sectionTitle}>
              📥 View Submissions
            </h2>

            <div style={styles.submission}>
              <div>
                <h3>Lab Assignment 5</h3>
                <p>CS3301 - Full Stack Development</p>
              </div>

              <span style={styles.submittedStatus}>
                38 Submitted
              </span>
            </div>

            <div style={styles.submission}>
              <div>
                <h3>React Mini Project</h3>
                <p>CS3301 - Full Stack Development</p>
              </div>

              <span style={styles.pendingStatus}>
                7 Pending
              </span>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

const styles = {

  container: {
    width: '900px',
    maxWidth: '95%',
    margin: '30px auto',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
    borderRadius: '6px',
    overflow: 'hidden',
    fontFamily: 'Arial, sans-serif'
  },

  header: {
    backgroundColor: '#0A2240',
    color: '#ffffff',
    padding: '22px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  title: {
    margin: 0,
    fontSize: '22px',
    color: '#F2A900'
  },

  welcome: {
    margin: '5px 0 0 0',
    fontSize: '12px',
    color: '#ffffff'
  },

  backButton: {
    backgroundColor: '#F2A900',
    color: '#0A2240',
    border: 'none',
    padding: '12px 16px',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },

  tabs: {
    display: 'flex',
    borderBottom: '1px solid #cccccc',
    overflowX: 'auto'
  },

  tab: {
    flex: 1,
    padding: '14px 8px',
    backgroundColor: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#0A2240',
    whiteSpace: 'nowrap'
  },

  activeTab: {
    flex: 1,
    padding: '14px 8px',
    backgroundColor: '#e8f0f8',
    border: 'none',
    borderBottom: '2px solid #0A2240',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#0A2240',
    whiteSpace: 'nowrap'
  },

  content: {
    padding: '25px'
  },

  sectionTitle: {
    color: '#0A2240',
    fontSize: '20px',
    marginBottom: '25px'
  },

  subTitle: {
    color: '#172b4d',
    marginTop: '25px'
  },

  dashboardGrid: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap'
  },

  card: {
    flex: 1,
    minWidth: '180px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderLeft: '4px solid #0A2240',
    borderRadius: '5px'
  },

  number: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#0A2240',
    margin: '10px 0 0 0'
  },

  info: {
    color: '#666666',
    lineHeight: '1.6'
  },

  label: {
    display: 'block',
    marginBottom: '6px',
    marginTop: '15px',
    fontWeight: 'bold',
    color: '#172b4d'
  },

  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px',
    border: '1px solid #cccccc',
    borderRadius: '4px'
  },

  textarea: {
    width: '100%',
    minHeight: '100px',
    boxSizing: 'border-box',
    padding: '12px',
    border: '1px solid #cccccc',
    borderRadius: '4px',
    resize: 'vertical'
  },

  actionButton: {
    marginTop: '20px',
    backgroundColor: '#0A2240',
    color: '#ffffff',
    border: 'none',
    padding: '11px 18px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },

  studentRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    marginBottom: '8px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px'
  },

  presentButton: {
    backgroundColor: '#2e7d32',
    color: '#ffffff',
    border: 'none',
    padding: '7px 12px',
    borderRadius: '4px'
  },

  absentButton: {
    backgroundColor: '#c62828',
    color: '#ffffff',
    border: 'none',
    padding: '7px 12px',
    borderRadius: '4px'
  },

  event: {
    padding: '18px',
    marginBottom: '12px',
    backgroundColor: '#f8f9fa',
    borderLeft: '4px solid #0A2240',
    borderRadius: '4px'
  },

  submission: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 0',
    borderBottom: '1px solid #eeeeee'
  },

  submittedStatus: {
    backgroundColor: '#2e7d32',
    color: '#ffffff',
    padding: '6px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold'
  },

  pendingStatus: {
    backgroundColor: '#F2A900',
    color: '#ffffff',
    padding: '6px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold'
  }

};