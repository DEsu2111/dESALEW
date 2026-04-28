import React from 'react';
import { useNavigate } from 'react-router-dom';

const RotatingName = () => {
  const navigate = useNavigate();
  const label = 'Desalew Alganeh -Full Stack Developer ';

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div 
      className="name-orbit" 
      aria-hidden="true" 
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
      title="Admin Login"
    >
      <svg viewBox="0 0 200 200" className="name-orbit-svg">
        <defs>
          <path
            id="nameOrbitPath"
            d="M 100, 100 m -52, 0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0"
          />
        </defs>
        <text className="name-orbit-text">
          <textPath href="#nameOrbitPath" startOffset="0%">
            {label.repeat(10)}
          </textPath>
        </text>
      </svg>
      <div className="name-orbit-core" />
    </div>
  );
};

export default RotatingName;

