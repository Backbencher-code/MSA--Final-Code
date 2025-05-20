
import React, { useState, useEffect } from 'react';
import SentimentCard from './components/SentimentCard';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'false' ? false : true;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError('');
    setSentiment(null);

    try {
      const res = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      setSentiment(data);
    } catch {
      setError('Failed to analyze sentiment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <header className="header">
        <img
          className="logo"
          src="https://cdn-icons-png.flaticon.com/512/2921/2921823.png"
          alt="Sentiment Icon"
        />
        <h1 className="title">Multilingual Sentiment Analyzer</h1>

        <button
          className="mode-toggle"
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label="Toggle dark/light mode"
          title="Toggle Dark/Light Mode"
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <textarea
        className="input"
        placeholder="Type a multilingual sentence (English, Hindi, French)..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="btn"
        onClick={handleSubmit}
        disabled={loading}
        title="Analyze sentiment of your text"
      >
        {loading ? 'Analyzing...' : 'Analyze Sentiment'}
      </button>

      {error && <p className="error">{error}</p>}

      {sentiment && <SentimentCard sentiment={sentiment} key={sentiment.label} />}

      <footer className="footer">© 2025 Sentiment Analysis Project</footer>
    </div>
  );
}

export default App;
