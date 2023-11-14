import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack } from '@mui/material'; //getAll用コンポーネント
import { Button, TextField, Typography, List, ListItem } from '@mui/material'; // Postフォーム用コンポーネント
import { AppBar,Toolbar,IconButton,Box} from '@mui/material'; // バー用コンポーネント
// import { Stack,Typography,ThemeProvider,createTheme} from '@mui/material' ///フォームのバー用コンポーネント
import { ThemeProvider, createTheme } from '@mui/material/styles';//フォームのバー用コンポーネント

import './App.css';

const App = () => {
  const url = "http://localhost:3001/api/todos";
  const [todo, setTodo] = useState([]);
  const [newTask,setNewTask] = useState('');
  const [newStatus,setNewStatus] = useState('');

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

  useEffect(() =>{
    fetchData();
  },[]);
 

  // 全件取得(getAll)
  const fetchData = () => {
    fetch(url, { 
      method: "GET" ,
      mode :"cors",
      headers:{
        "Content-Type": "aplication/json",
      }})
      .then((res) => res.json())
      .then((data) => {
        setTodo(data);
      })
      .catch((err) => {
        console.error("Get All Todo!!",err)
      });
  }
  
    // 登録(Post)
    const handleAddTodo = () =>{
      fetch(url,{
        method:"POST",
        mode:"cors",      
        headers:{
          "Content-Type": "aplication/json",
        },
        body: JSON.stringify({
          task:newTask,
          status:newStatus,
        })
      })
      .then((res)=>res.json())
      .then((data)=>{
        fetchData();
        setNewTask('');
        setNewStatus('');
      })
      .catch((err)=>{
        console.error("Error Adding Todo!!",err)
      })
    }

    // ステータス編集(patch)
    const handleUpdateStatus = (id,newStatus) =>{
      fetch('http://localhost:3001/api/todos${id}',{
        method: "PATCH",
        mode : "cors",
        headers: {
          "Content-type": "aplication/json",
        },
        body: JSON.stringify({
          status: newStatus,
        })
      })
      .then((res) => res.json())
      .then((data) => {
        fetchData();
      })
      .catch((err) => {
        console.error("Error Patching Status!!",err)
      })
    }

  
     return (
      <div className="App">
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  私のTodoリスト
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>    
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Task</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Update Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todo.map((element) => (
                  <TableRow key={element.id}>
                    <TableCell>{element.id}</TableCell>
                    <TableCell>{element.task}</TableCell>
                    <TableCell>{element.status}</TableCell>
                    <TableCell>
                      <TextField 
                        label = "更新後ステータス"
                        variant = "outlined"
                        value = {newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                      />
                      <Button 
                        variant='contained'
                        onClick={()=> handleUpdateStatus(element.id,newStatus)}
                      >
                        ステータスを更新
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <br></br>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <ThemeProvider theme={darkTheme}>
            <AppBar position="static" color="primary">
              新しいタスクの登録エリア
           </AppBar>
          </ThemeProvider>
        </Stack>
        <br></br>
        <div>
          <TextField 
          label = "新しいタスク"
          variant = "outlined"
          value = {newTask}
          onChange={(e) => setNewTask(e.target.value)}
          />
          <TextField 
          label = "ステータス"
          variant = "outlined"
          value = {newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddTodo}>
            タスクを追加
          </Button>
          <br></br>
          <br></br>
        </div>

    </div>
     );
}

export default App;
