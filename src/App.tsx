import Header from "./page/Header";
import Home from "./page/Home";
import "./App.scss";
import Favorite from "./page/Favorite";
import Search from "./page/Search";
import { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab"

const App = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    
    <div className="app">
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <Header />
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Home" value="1" />
            <Tab label="Favorite" value="2" />
            <Tab label="Search" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><Home /></TabPanel>
        <TabPanel value="2"><Favorite /></TabPanel>
      </TabContext>
    </Box>
    </div>
  );
};

export default App;
