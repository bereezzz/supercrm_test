import React from 'react';
import Header from './components/header/Header';
import BlockCards from './components/blockCards/BlockCards';

function App() {
  return (
    <div >
      <Header></Header>
      <div style={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:'center'}}>
        <BlockCards></BlockCards>
      </div>
    </div>
  );
}

export default App;
