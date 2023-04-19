import { BrowserRouter, Routes } from "react-router-dom";

import Layout from '@/components/Layout'

import { Apps } from '@/apps';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {Apps.map((app, index) => app.getRoute(index))}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
