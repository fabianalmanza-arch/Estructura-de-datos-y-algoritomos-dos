
import menuTree from '../structures/MenuTree';
import MenuItem from './MenuItem';

export default function Sidebar({ activeLink, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="logo">N</span>
        <div>
          <h2>Mi aplicación</h2>
          <p>Panel de administración</p>
        </div>
      </div>

      <nav aria-label="Menú principal">
        <ul className="menu-list">
          {menuTree.root.children.map((item) => (
            <MenuItem
              key={item.link}
              item={item}
              activeLink={activeLink}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        Challenge 09 · Árbol N-ario
      </div>
    </aside>
  );
}
