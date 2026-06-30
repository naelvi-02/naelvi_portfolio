export default function Marquee() {
  const items = [
    'Graphic Design', 'AI Specialist', 'Brand Identity',
    'Social Media', 'Video Editing', 'UI / UX', 'Photography',
    'Canva Templates', 'Motion Graphics', 'Visual Storytelling',
  ]

  // Duplicate for seamless loop
  const allItems = [...items, ...items]

  return (
    <div className="marquee-wrapper" aria-hidden="true" role="presentation">
      <div className="marquee-track">
        {allItems.map((item, i) => (
          <span key={i} className={`marquee-item ${i % 3 === 0 ? 'marquee-item--accent' : ''}`}>
            {item}
            <span className="marquee-sep" />
          </span>
        ))}
      </div>
    </div>
  )
}
