import { useState, useEffect } from 'react';

export default function StudentPortal({ onBackToHome }) {

  const [activeTab, setActiveTab] = useState('notices');
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(true);
  const [cie1Submitted, setCIE1Submitted] = useState(false);
  
useEffect(() => {
  const checkSubmission = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/submissions');
      const data = await response.json();

      // Check Assignment 1
      const alreadySubmitted = data.some(
        (submission) =>
          submission.studentName === 'ANIKETH' &&
          submission.assignmentName === 'Lab Assignment 5' &&
          submission.status === 'Submitted'
      );

      // Check Assignment 2 - CIE 1
      const cie1AlreadySubmitted = data.some(
        (submission) =>
          submission.studentName === 'ANIKETH' &&
          submission.assignmentName === 'CIE - 1 ASSESSMENT' &&
          submission.status === 'Submitted'
      );

      setAssignmentSubmitted(alreadySubmitted);
      setCIE1Submitted(cie1AlreadySubmitted);

    } catch (error) {
      console.error('Error fetching submission:', error);
    } finally {
      setSubmissionLoading(false);
    }
  };

  checkSubmission();
}, []);

    const handleSubmitAssignment = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentName: 'ANIKETH',
          assignmentName: 'Lab Assignment 5',
          course: 'CS3301 - Full Stack'
        })
      });

      if (response.ok) {
        setAssignmentSubmitted(true);
        console.log('Assignment submitted successfully!');
      }
    } catch (error) {
      console.error('Backend connection error:', error);
    }
  };
  const handleSubmitCIE1 = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentName: 'ANIKETH',
          assignmentName: 'CIE - 1 ASSESSMENT',
          course: 'CS3255 - PROBABILITY THEORY'
        })
      });

      if (response.ok) {
        setCIE1Submitted(true);
        console.log('CIE-1 submitted successfully!');
      }
    } catch (error) {
      console.error('Backend connection error:', error);
    }
};
const handleUnsubmitAssignment = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/submissions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentName: 'ANIKETH',
          assignmentName: 'Lab Assignment 5'
        })
      });

      if (response.ok) {
        setAssignmentSubmitted(false);
        console.log('Assignment unsubmitted successfully!');
      }
    } catch (error) {
      console.error('Unsubmit error:', error);
    }
  };
  const handleUnsubmitCIE1 = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/submissions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentName: 'ANIKETH',
          assignmentName: 'CIE - 1 ASSESSMENT'
        })
      });

      if (response.ok) {
        setCIE1Submitted(false);
        console.log('CIE-1 unsubmitted successfully!');
      }
    } catch (error) {
      console.error('Unsubmit error:', error);
    }
};

  return (
    <div style={styles.container}>

      {/* Header Section */}
      <div style={styles.header}>

        <div>
          <h1 style={styles.title}>🎓 Student Portal</h1>
          <p style={styles.welcome}>Welcome, RVU Student</p>
        </div>

        <button
          style={styles.backButton}
          onClick={onBackToHome}
        >
          ← Back to Main Campus View
        </button>

      </div>


      {/* Navigation Tabs */}
      <div style={styles.tabs}>

        <button
          style={
            activeTab === 'notices'
              ? styles.activeTab
              : styles.tab
          }
          onClick={() => setActiveTab('notices')}
        >
          Notices & Events
        </button>

        <button
          style={
            activeTab === 'assignments'
              ? styles.activeTab
              : styles.tab
          }
          onClick={() => setActiveTab('assignments')}
        >
          Assignments
        </button>

        <button
          style={
            activeTab === 'attendance'
              ? styles.activeTab
              : styles.tab
          }
          onClick={() => setActiveTab('attendance')}
        >
          Track Attendance
        </button>

        <button
          style={
            activeTab === 'profile'
              ? styles.activeTab
              : styles.tab
        }
        onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>

      </div>


      {/* Main Content */}
      <div style={styles.content}>

        {/* NOTICES */}
        {activeTab === 'notices' && (
          <>
            <h2 style={styles.sectionTitle}>
              📢 Campus Notices & Events
            </h2>

            {/* Notice 1 */}
            <div style={styles.notice}>

              <div>
                <h3 style={styles.noticeTitle}>
                  Mid-Term Exam Schedule Released
                </h3>

                <p style={styles.noticeInfo}>
                  SDCSE • Sept 12, 2026
                </p>
              </div>

              <button style={styles.viewButton}>
                View Details
              </button>

            </div>


            {/* Notice 2 */}
            <div style={styles.notice}>

              <div>
                <h3 style={styles.noticeTitle}>
                  Hackathon Registration Open
                </h3>

                <p style={styles.noticeInfo}>
                  RVU Tech Club • Sept 15, 2026
                </p>
              </div>

              <button style={styles.viewButton}>
                View Details
              </button>

            </div>
          </>
        )}


        {/* ASSIGNMENTS */}
        {activeTab === 'assignments' && (
          <>
            <h2 style={styles.sectionTitle}>
              📝 My Assignments
            </h2>

            {/* Assignment 1 */}
            <div style={styles.notice}>

              <div>
                <h3 style={styles.noticeTitle}>
                  Lab Assignment 5
                </h3>

                <p style={styles.noticeInfo}>
                  CS3301 - Full Stack • Due: Sept 18, 2026
                </p>
              </div>

              <div style={styles.assignmentActions}>
                <span
                  style={
                    assignmentSubmitted
                      ? styles.submittedStatus
                      : styles.pendingStatus
                  }
                >
                  {submissionLoading
                    ? 'Checking...'
                    : assignmentSubmitted
                      ? 'Submitted'
                      : 'Pending'}
                </span>

                <button
                  style={styles.viewButton}
                  onClick={
                    assignmentSubmitted
                      ? handleUnsubmitAssignment
                      : handleSubmitAssignment
                  }
                  disabled={submissionLoading}
                >
                  {submissionLoading
                    ? 'Checking...'
                    : assignmentSubmitted
                      ? 'Unsubmit'
                      : 'Submit'}
                </button>

              </div>
            </div>  


            {/* Assignment 2 */}
              <div style={styles.notice}>

                <div>
                  <h3 style={styles.noticeTitle}>
                    CIE - 1 ASSESSMENT
                  </h3>

                  <p style={styles.noticeInfo}>
                    CS3255 - PROBABILITY THEORY • Due: Sept 17, 2026
                  </p>
                </div>

                <div style={styles.assignmentActions}>
                  <span
                    style={cie1Submitted
                      ? styles.submittedStatus
                      : styles.pendingStatus}
                  >
                    {cie1Submitted ? 'Submitted' : 'Pending'}
                  </span>

                  <button
                    style={styles.viewButton}
                    onClick={cie1Submitted
                      ? handleUnsubmitCIE1
                      : handleSubmitCIE1}
                  >
                    {cie1Submitted ? 'Unsubmit' : 'Submit'}
                  </button>
                </div>

              </div>

          </>
        )}

        {activeTab === 'attendance' && (
  <>
    <h2 style={styles.sectionTitle}>
      📊 Track Attendance
    </h2>

    <div style={styles.attendanceRow}>
      <strong>CS3202 - Full Stack Development</strong>
      <span>94%</span>
    </div>

    <div style={styles.attendanceRow}>
      <strong>CS3255 - Natural Language Processing</strong>
      <span>95%</span>
    </div>

    <div style={styles.attendanceRow}>
      <strong>CS3301 - Deep Learning</strong>
      <span>92%</span>
    </div>

    <div style={styles.attendanceRow}>
      <strong>CS3402 - Internet of Things</strong>
      <span>100%</span>
    </div>

    <div style={styles.attendanceRow}>
      <strong>CS3803 - Probability Theory</strong>
      <span>94%</span>
    </div>
  </>
)}

        {activeTab === 'profile' && (
  <>
    <h2 style={styles.sectionTitle}>
      👤 Student Profile
    </h2>

    <div style={styles.profile}>

      <div style={styles.profilePhoto}>
        <img
          src="/src/assets/profile.jpeg"
          alt="Student Profile"
          style={styles.profileImage}
        />
      </div>

      <p><strong>Name:</strong> ANIKETH</p>

      <p><strong>Student ID:</strong> 1RUA24SCS0008</p>

      <p><strong>Programme:</strong> B.Sc. (Hons.) Computer Science</p>

      <p>
        <strong>Department:</strong> School of Computer Science & Engineering
      </p>

      <p><strong>University:</strong> RV University</p>

    </div>
  </>
)}

      </div>

    </div>
  );
}


const styles = {

  container: {
    width: '680px',
    maxWidth: '90%',
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
    borderBottom: '1px solid #cccccc'
  },

  tab: {
    flex: 1,
    padding: '15px 8px',
    backgroundColor: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#0A2240'
  },

  activeTab: {
    flex: 1,
    padding: '15px 8px',
    backgroundColor: '#e8f0f8',
    border: 'none',
    borderBottom: '2px solid #0A2240',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#0A2240'
  },

  content: {
    padding: '25px'
  },

  sectionTitle: {
    color: '#0A2240',
    fontSize: '20px',
    marginBottom: '25px'
  },

  notice: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 0',
    borderBottom: '1px solid #eeeeee'
  },

  attendanceRow: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '18px',
  marginBottom: '8px',
  backgroundColor: '#f8f9fa',
  borderLeft: '4px solid #0A2240',
  borderRadius: '4px',
  color: '#172b4d'
},

  profile: {
  textAlign: 'center',
  padding: '10px'
},

profilePhoto: {
  width: '100px',
  height: '100px',
  margin: '0 auto 20px auto',
  borderRadius: '50%',
  backgroundColor: '#e8f0f8',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '45px',
  border: '3px solid #0A2240'
},
  profileImage: {
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  objectFit: 'cover'
},

  noticeTitle: {
    margin: 0,
    color: '#172b4d',
    fontSize: '16px'
  },

  noticeInfo: {
    margin: '8px 0 10px 0',
    color: '#888888',
    fontSize: '12px'
  },

  viewButton: {
    backgroundColor: '#0A2240',
    color: '#ffffff',
    border: 'none',
    padding: '10px 14px',
    borderRadius: '4px',
    cursor: 'pointer'
  },

  assignmentActions: {
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
},

  pendingStatus: {
    display: 'inline-block',
    backgroundColor: '#F2A900',
    color: '#ffffff',
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold'
  },

  submittedStatus: {
    display: 'inline-block',
    backgroundColor: '#2e7d32',
    color: '#ffffff',
    padding: '5px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold'
  }

};