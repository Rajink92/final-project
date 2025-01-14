import React, { useState, useEffect, useContext } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import axios from 'axios';

import { api_base } from 'config'
import { LoginContext } from 'Contexts/LoginContext';
import Scores from './Scores';

const Reports = () => {
  const { teachers: teacher } = useContext(LoginContext)
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const getRows = async () => {
      const courses = await axios.get(`${api_base}/course/reports/scores`);
      const rowsData = [];
      let i = 0;
      courses.data.forEach(c => {
        if (c.exams.length > 0) {
          c.exams.forEach(exam => {
            if (exam.scores.length > 0) {
              let last = undefined;
              exam.scores.forEach(score => {
                if (score.course === c._id) {
                  if (!last) {
                    last = score.created;
                  } else {
                    last = Date.parse(score.created) > Date.parse(last) ? score.created : last;
                  }
                }
              });
              if (last) {
                rowsData.push({id: i, examId: exam._id, exam: exam.name, courseId: c._id, course: c.name, time: last});
                i++;
              }
            }
          });
        }
      });
      setRows(_prev => rowsData);

    }
    getRows();
  }, []);
  const columns = 
  [
    {field: 'exam', headerName: 'Exam', flex: 2, renderCell: (rowData) => {
      const que = rowData.row;
      return <Link href={`${api_base}/teacher/reports/${que.courseId}/${que.examId}/scores`}>{que.exam}</Link>
    }},
    {field: 'course', headerName: 'Course', flex: 2},
    {field: 'time', headerName: 'Last Score Submitted Time', flex: 2}
  ];
  return (
    <Box sx={{m: 6}}>
      {teacher.map(item => {
        return (
          <div key={teacher._id}>
            <h1> {item.firstname}, {item.lastname}</h1>
          </div>
        )
      })}
      <Box style={{ height: 400, width: '100%' }}>
        {rows.length > 0 && <DataGrid columns={columns} rows={rows} components={{ Toolbar: GridToolbar }} />}
      </Box>
    </Box>
  )
}

export default Reports;