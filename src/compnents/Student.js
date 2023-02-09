import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Paper, Container } from '@mui/material';
import { margin } from '@mui/system';

export default function Student() {

    const [name, setName] = useState('');
    const [address, setAdress] = useState('');
    const [students, setStudents] = useState([]);
   const paperstyle = {padding:'50PX 20PX', width:600, margin:"20px auto"}

    const handleclick = (e) => {
        e.preventDefault()
        const student = { name, address };
        console.log(student);
        fetch("http://localhost:8080/student/add", {
            method: "Post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(student)
        }).then(() => {

            console.log("now student is added");
        })
    }

    useEffect(() => {
        fetch("http://localhost:8080/student/getAll")
            .then(res => res.json())
            .then((result) => {
                setStudents(result)
            })
    }, []);


    return (
<Container>
    <Paper elevation={3} style={paperstyle}>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >

            <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField id="filled-basic" label="Student Adress" variant="filled" fullWidth
                value={address}
                onChange={(e) => setAdress(e.target.value)}
            />
            <Button variant="outlined" onClick={handleclick} >Send Data</Button>
{
        students.map(students=>
          <Paper elevation={20} style={{margin:"10px", padding:"15px" , textAlign:"left" }} >
            Id:{students.id}<br />
            Name:{students.name}<br />
            Address:{students.address}<br />

          </Paper>
        )
}
        </Box>
        </Paper>
        </Container>


    );

}
