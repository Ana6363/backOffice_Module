import React from 'react';

const Buttons = () => {
  return (
    <div>
      <button className="btn btn-active">Default</button>
      <button className="btn btn-active btn-neutral">Neutral</button>
      <button className="btn btn-active btn-primary">Primary</button>
      <button className="btn btn-active btn-secondary">Secondary</button>
      <button className="btn btn-active btn-accent">Accent</button>
      <button className="btn btn-active btn-ghost">Ghost</button>
      <button className="btn btn-active btn-link">Link</button>
      <button className="btn btn-lg">Large</button>
      <button className="btn btn-normal">Normal</button>
      <button className="btn btn-sm">Small</button>
      <button className="btn btn-xs">Tiny</button>
      <button className="btn">
        <span className="loading loading-spinner"></span>
        Loading
      </button>
    </div>
  );
};

export default Buttons;
