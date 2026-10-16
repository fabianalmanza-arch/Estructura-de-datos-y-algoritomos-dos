
import { useState } from 'react';

export default function MenuItem({ item, activeLink, onNavigate, level = 0 }) {
  const [expanded, setExpanded] = useState(false);

  const hasChildren = item.children.length > 0;
  const isActive = activeLink === item.link;

  function handleClick() {
    if (hasChildren) {
      setExpanded((previous) => !previous);
    } else {
      onNavigate(item);
    }
  }

  return (
    <li className="menu-item">
      <button
        type="button"
        className={`menu-link ${isActive ? 'active' : ''}`}
        style={{ paddingLeft: `${16 + level * 16}px` }}
        onClick={handleClick}
        aria-expanded={hasChildren ? expanded : undefined}
        title={`${item.name} — ${item.file}`}
      >
        <span>{item.name}</span>

        {hasChildren && (
          <span className="flecha">
            {expanded ? '▾' : '▸'}
          </span>
        )}
      </button>

      {hasChildren && expanded && (
        <ul className="submenu">
          {item.children.map((child) => (
            <MenuItem
              key={child.link}
              item={child}
              activeLink={activeLink}
              onNavigate={onNavigate}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
