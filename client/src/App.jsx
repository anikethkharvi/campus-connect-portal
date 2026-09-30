import { useState, useEffect } from 'react';
import AuthModule from './components/AuthModule.jsx';
import StudentPortal from './components/StudentPortal.jsx';
import FacultyPortal from './components/FacultyPortal.jsx';

function App() {
  const [mode, setMode] = useState('register');
  const [showAuth, setShowAuth] = useState(false);
  const [showStudentPortal, setShowStudentPortal] = useState(false);
  const [showFacultyPortal, setShowFacultyPortal] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {

  if (window.location.hash === '#login') {
    setMode('login');
    setShowAuth(true);
    setShowStudentPortal(false);
    setShowFacultyPortal(false);

  } else if (window.location.hash === '#register') {
    setMode('register');
    setShowAuth(true);
    setShowStudentPortal(false);
    setShowFacultyPortal(false);

  } else if (window.location.hash === '#student-portal') {
    setShowAuth(false);
    setShowStudentPortal(true);
    setShowFacultyPortal(false);

  } else if (window.location.hash === '#faculty-portal') {
    setShowAuth(false);
    setShowStudentPortal(false);
    setShowFacultyPortal(true);

  } else {
    setShowAuth(false);
    setShowStudentPortal(false);
    setShowFacultyPortal(false);
  }
};

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

    if (showStudentPortal) {
    return (
      <StudentPortal
        onBackToHome={() => {
          window.location.hash = '';
          setShowStudentPortal(false);
        }}
      />
    );
  }
  if (showFacultyPortal) {
  return (
    <FacultyPortal
      onBackToHome={() => {
        window.location.hash = '';
        setShowFacultyPortal(false);
      }}
    />
  );
}

  if (showAuth) {
  return (
    <AuthModule key={mode} initialMode={mode} />
  );
}

return null;
}
export default App;