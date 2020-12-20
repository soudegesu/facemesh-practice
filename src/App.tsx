import React, { FC } from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import TopPage from './pages/TopPage';
import { RecoilRoot } from 'recoil';

const App: FC = () => {
  return (
    <RecoilRoot>
      <Container>
        <TopPage />
      </Container>
    </RecoilRoot>
  );
};

export default App;
