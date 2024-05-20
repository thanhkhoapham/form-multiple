import { CssBaseline, Box, Container, AppBar, Toolbar, Typography } from "@mui/material"
import { ReactElement } from "react"
import "./styles.scss"
import Content from "./Content"

const Layout2 = (): ReactElement => {
    return <div>
        <CssBaseline />
        <Box sx={{
            display: 'flex', 
            flexDirection: 'column',
            minHeight: '100vh',
            minWidth: 1024,
            maxWidth: 2000,
        }}>

            <AppBar position="static" color="primary" sx={{ height: 50 }}>
                <Toolbar>
                    <Typography variant="h6">
                        Header
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box className="bg-amber-400" component="main" sx={{
                flexGrow: 1,
                overflowY: 'auto',
                '&::after': {
                    content: '""', display: 'block', height: 50
                }
                }}>
            <Container component="main" sx={{minHeight: 'calc(100vh - 100px)'}}>
                {/* Content goes here */}            
                <Content />
                <Content />
                <Content />
                <Content />
                <Content />
            </Container>
            </Box>
            <Box component="footer" sx={{
                height: 50,
                backgroundColor: 'primary.main',
                color: 'common.white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            Footer
            </Box>
        </Box>
    </div>
}

export default Layout2
