import React, { useState } from 'react';
import { HeaderTrie } from './components/HeaderTrie';
import { SidebarNary } from './components/SidebarNary';
import { BookStack } from './components/BookStack';
import { AtmQueue } from './components/AtmQueue';
import { BstIndex } from './components/BstIndex';
import { MediaAndBrowser } from './components/MediaAndBrowser';
import { LibraryNetwork } from './components/LibraryNetwork';

export default function App() {
  const [activeView, setActiveView] = useState('BOOK_STACK');

  const renderActiveView = () => {
    switch (activeView) {
      case 'BOOK_STACK':
        return <BookStack />;
      case 'ATM_QUEUE':
        return <AtmQueue />;
      case 'BST_INDEX':
        return <BstIndex />;
      case 'GRAPH_NETWORK':
        return <LibraryNetwork />;
      case 'MUSIC_PLAYER':
      case 'BROWSER_HISTORY':
      case 'MEDIA_PLAYER':
        return <MediaAndBrowser />;
      default:
        return <BookStack />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#121212', color: '#fff' }}>
      {/* Al seleccionar un resultado en el Trie, cambia automáticamente la vista */}
      <HeaderTrie onSelectSearch={(component) => setActiveView(component)} />

      <div style={{ display: 'flex', flex: 1 }}>
        <SidebarNary onSelectComponent={(component) => setActiveView(component)} />
        <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}