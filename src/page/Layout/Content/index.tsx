import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

const FapFap = () => {
    return (
      <div>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
        <Fab color="secondary" aria-label="edit">
          <EditIcon />
        </Fab>
        <Fab variant="extended">
          <AddIcon sx={{  }} />
          Navigate D:\soureCode\react\react-context-mui
        </Fab>
        <Fab disabled aria-label="like">
          <EditIcon />
        </Fab>
      </div>
    );
}

const Content = () => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div>
          {1}
          <FapFap />
        </div>
      ))}
    </div>
  );
};

export default Content