import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(45deg, #ff85a2, #ff6b6b);
  font-family: 'Pacifico', cursive;
  text-align: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  color: white;
  font-size: 2.5em;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  position: relative;
  margin: 20px;
`;

const YesButton = styled.button`
  padding: 15px 30px;
  font-size: 1.5em;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.3s ease;
  margin-right: 10px;

  &:hover {
    transform: scale(1.1);
    background: #45a049;
  }
`;

const LoveText = styled.div`
  font-size: 3em;
  color: white;
  animation: ${spin} 2s linear infinite;
  margin-top: 30px;
`;

function App() {
  const [yesClicked, setYesClicked] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      // Calculate distance between cursor and button
      const dx = e.clientX - noButtonPosition.x;
      const dy = e.clientY - noButtonPosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) { // Magnet effect radius
        const angle = Math.atan2(dy, dx);
        const newX = noButtonPosition.x - Math.cos(angle) * 20;
        const newY = noButtonPosition.y - Math.sin(angle) * 20;

        // Keep button within viewport
        const boundedX = Math.max(0, Math.min(window.innerWidth - 100, newX));
        const boundedY = Math.max(0, Math.min(window.innerHeight - 50, newY));

        setNoButtonPosition({ x: boundedX, y: boundedY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [noButtonPosition]);

  return (
      <Container>
        {yesClicked && <Confetti recycle={true} numberOfPieces={200} />}

        <Title>💘 Czy zostaniesz moją walentynką, Łucjo? 💘</Title>

        {!yesClicked ? (
            <ButtonContainer>
              <YesButton onClick={() => setYesClicked(true)}>Tak</YesButton>
              <button
                  style={{
                    position: 'absolute',
                    left: `${noButtonPosition.x}px`,
                    top: `${noButtonPosition.y}px`,
                    padding: '15px 30px',
                    fontSize: '1.5em',
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    transition: 'all 0.1s ease',
                  }}
                  onMouseEnter={() => {
                    // Initial push when hovered
                    setNoButtonPosition({
                      x: Math.random() * (window.innerWidth - 100),
                      y: Math.random() * (window.innerHeight - 50),
                    });
                  }}
              >
                Nie
              </button>
            </ButtonContainer>
        ) : (
            <LoveText>💖 Kocham Cię! 💖</LoveText>
        )}
      </Container>
  );
}

export default App;