import React from 'react';
import { MantineProvider } from '@mantine/core';
// import AggregatedCropsTable from './Components/AggregatedCropsTable'
import AverageCropsTable from './Components/AverageCropsTable'

import AggregatedCropsTable from './Components/AggregatedCropsTable';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div style={{ padding: 20 }}>
        <h1>Indian Agriculture Data</h1>
        <AggregatedCropsTable />
        <AverageCropsTable />
      </div>
    </MantineProvider>
  );
}

export default App;
