import Header from "./page/Header";
import Home from "./page/Home";
import "./App.scss";
import Favorite from "./page/Favorite";
import { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab"
import ExpandableText from "./page/LongText";
import ExpandableTextV2 from "./page/LongText_v3";
import Draggable from "./page/MoveComponent/DraggableOptional";
import ChatBox2 from "./page/ChatBox/boxChat";
import { SessionProvider } from "./context/chatSession/SessionContext";
import TodoList from "./page/TodoList";

let longText = "There are many variations of passages of There are many variations of passages of There are many variations of passages of There are many variations of passages of There are many variations of passages of There are many variations of passages of"
// longText += "There are many variations of passages of There are many variations of passages of There are many variations of passages of There are many variations of passages of There are many variations of passages of There are many variations of passages of"


export const App = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return <div className="app">
    <Box sx={{ width: '100%', typography: 'body1' }}>
    <Header />
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Home" value="1" />
          <Tab label="Favorite" value="2" />
          <Tab label="Search" value="3" />
          <Tab label="Long Text" value="4" />
          <Tab label="Auto Expanded text" value="5" />
          <Tab label="Resize" value="6" />
          <Tab label="Draggable" value="7" />

        </TabList>
      </Box>
      <TabPanel value="1"><Home /></TabPanel>
      <TabPanel value="2"><Favorite /></TabPanel>
      <TabPanel value="4"><ExpandableText text={longText}/></TabPanel>
      <TabPanel value="5"><ExpandableTextV2 monitorResize text={longText} lineClamp={2}/></TabPanel>
      <TabPanel value="6"><Draggable /></TabPanel>
      <TabPanel className="chat-parent" value="7"><ChatBox2 className="chat-box"/></TabPanel>
    </TabContext>
  </Box>
  </div>;
};

export const App2 = () => {
  return <SessionProvider>
    <div>
      <TodoList />
    </div>
  </SessionProvider>
}
