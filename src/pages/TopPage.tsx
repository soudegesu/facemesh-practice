import { Box, Grid } from '@material-ui/core';
import React, { FC } from 'react';
import StartButton from '../components/StartButton';
import InputVideoStream from '../components/InputVideoStream';
import StatsPanel from '../components/StatsPanel';

const TopPage: FC = () => {
  return (
    <Box paddingTop={10}>
      <StatsPanel />
      <Grid container>
        <Grid item>
          <InputVideoStream />
        </Grid>
      </Grid>
      <Box padding={1}>
        <Grid container spacing={1}>
          <Grid item>
            <StartButton />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TopPage;
