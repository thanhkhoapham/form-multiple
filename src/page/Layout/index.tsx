import React from 'react';
import { CssBaseline, Box, Container, AppBar, Toolbar, Typography } from '@mui/material';
import Content from './Content';

const Layout = () => {
  const [hasScrollbar, setHasScrollbar] = React.useState(false);

  // Kiểm tra xem có thanh cuộn ngang hay không và cập nhật trạng thái
  React.useEffect(() => {
    const checkForScrollbar = () => {
      const hasHorizontalScrollbar = document.body.scrollWidth > document.body.clientWidth;
      setHasScrollbar(hasHorizontalScrollbar);
    };

    window.addEventListener('resize', checkForScrollbar);
    checkForScrollbar();

    return () => window.removeEventListener('resize', checkForScrollbar);
  }, []);

console.log("Check: ", hasScrollbar)
const longText = "I have a pretty simple problem; limit the number of lines. Of a long text, I don't want to show more than 3 lines. I tried the following but doesn't work:"
  + "I have a pretty simple problem; limit the number of lines. Of a long text, I don't want to show more than 3 lines. I tried the following but doesn't work:"
  + "I have a pretty simple problem; limit the number of lines. Of a long text, I don't want to show more than 3 lines. I tried the following but doesn't work:"
  + "I have a pretty simple problem; limit the number of lines. Of a long text, I don't want to show more than 3 lines. I tried the following but doesn't work:"
  + "I have a pretty simple problem; limit the number of lines. Of a long text, I don't want to show more than 3 lines. I tried the following but doesn't work:"
  + "I have a pretty simple problem; limit the number of lines. Of a long text, I don't want to show more than 3 lines. I tried the following but doesn't work:"
  + "I have a pretty simple problem; limit the number of lines. Of a long text, I don't want to show more than 3 lines. I tried the following but doesn't work:"

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          minWidth: 600,
          maxWidth: 2000,
          overflowX: "hidden", // Ẩn thanh cuộn ngang nếu không cần thiết
        }}
      >
        <AppBar position="static" color="primary" sx={{ height: 50 }}>
          <Toolbar>
            <Typography variant="h6">Header</Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto", // Cuộn dọc chỉ áp dụng cho phần nội dung này
            maxHeight: hasScrollbar
              ? "calc(100vh - 100px - 17px)"
              : "calc(100vh - 100px)", // Tính toán chiều cao tối đa dựa trên trạng thái thanh cuộn ngang
          }}
        >
          <Container
            component="main"
            sx={{ minHeight: "calc(100vh - 100px)", paddingY: 2 }}
          >
            <Typography
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
              variant="body1"
            >
              {longText}
            </Typography>
            {/* Content goes here */}
            <Content />
            <Content />
            <Content />
            
            {/* {Array.from({ length: 100 }).map((_, index) => (
              <Typography key={index}>Line {index + 1}</Typography>
            ))} */}
          </Container>
        </Box>
        <Box
          component="footer"
          sx={{
            height: 50,
            backgroundColor: "primary.main",
            color: "common.white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Footer
        </Box>
      </Box>
    </>
  );
};

export default Layout;
