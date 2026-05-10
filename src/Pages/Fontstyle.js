const FontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { font-family: 'DM Sans', sans-serif; }
  h1,h2,h3,.font-display { font-family: 'Playfair Display', serif; }
  @keyframes float      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes spin-slow  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes fadeUp     { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.4} 100%{transform:scale(1.5);opacity:0} }
  @keyframes shimmer    { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes spin       { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  .float      { animation: float 4s ease-in-out infinite; }
  .spin-slow  { animation: spin-slow 12s linear infinite; }
  .fade-up    { animation: fadeUp 0.7s ease both; }
  .spin       { animation: spin 0.8s linear infinite; }
  .delay-1    { animation-delay: 0.1s; }
  .delay-2    { animation-delay: 0.2s; }
  .delay-3    { animation-delay: 0.3s; }
  .delay-4    { animation-delay: 0.4s; }
  .bubble     { position:absolute; border-radius:50%; }
  .shimmer {
    background: linear-gradient(90deg, #e0f2fe 25%, #bae6fd 50%, #e0f2fe 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
`;

export default FontStyle;