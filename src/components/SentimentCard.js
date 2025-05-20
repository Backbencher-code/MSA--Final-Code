
import React from 'react';

const SentimentCard = ({ sentiment }) => {
  const colorMap = {
    'Very Negative': '#FF4C4C',
    Negative: '#FF914D',
    Neutral: '#A0AEC0',
    Positive: '#48BB78',
    'Very Positive': '#2B6CB0',
  };

  const backgroundColor = colorMap[sentiment.label] || '#CBD5E0';

  return (
    <div
      className="card"
      style={{
        borderLeft: `8px solid ${backgroundColor}`,
        backgroundColor: `${backgroundColor}20`, // add transparency
        color: backgroundColor,
      }}
    >
      <h2 className="label">{sentiment.label}</h2>
      <p className="confidence">
        Confidence: {(sentiment.confidence * 100).toFixed(2)}%
      </p>
    </div>
  );
};

export default SentimentCard;


