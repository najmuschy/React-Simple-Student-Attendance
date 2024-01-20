import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react'

const App = () => {
  const [studentName, setStudentName] = useState('') ;
  const[students, setStudents] = useState([]) ;
  const[editMode, setEditMode] = useState(false) ;
  const [editableStudent, setEditableStudent] = useState(null) ;

  const addStudentHandler= (e)=>{
    e.preventDefault();
    if(studentName===''){
      return alert('Enter a valid student name')
    }
    const addedStudent = {
      id : Date.now(),
      name : studentName,
      isPresent : undefined
    }
    setStudents([...students, addedStudent]);
    
    setStudentName('');
  }
  const editStudentHandler = (id) =>{
    setEditMode(true);
    const editStudent = students.find(item => item.id===id) ;
    setEditableStudent(editStudent);
    setStudentName(editStudent.name);

    console.log(editableStudent)

  }
  const updateStudentHandler = (e) =>{
    e.preventDefault() ;

    if(studentName===''){
      return alert('Enter a valid student name')
    }
    console.log(editableStudent);
    const updatedStudents = students.map(item =>{
      if(item.id === editableStudent.id){
        item.name = studentName;
      }
      return item ;
    })
    console.log(updatedStudents) ;
    setStudents(updatedStudents);
    
    setStudentName('');

  }
  const removeStudentHandler = (id)=>{
      const removedStudents = students.filter(item=> item.id !== id) ;
      
      setStudents(removedStudents);
  }
  const makePresentHandler = (id)=>{
    
    const presentStudent = students.find(item => item.id === id)
    if(presentStudent.isPresent===true || presentStudent.isPresent ===false){
      return alert('Student is already Present or Absent')
    }
    const presentStudents =students.map(item=>{
      if(item.id===presentStudent.id){
        item.isPresent = true ;
      }
      return item ;
    })
    setStudents(presentStudents) ;


  }

  const makeAbsentHandler = (id)=>{
    
    const absentStudent = students.find(item => item.id === id)
    if(absentStudent.isPresent===true || absentStudent.isPresent ===false){
      return alert('Student is already Present or Absent')
    }
    const absentStudents =students.map(item=>{
      if(item.id===absentStudent.id){
        item.isPresent = false ;
      }
      return item ;
    })
    setStudents(absentStudents) ;


  }
  const accidentalAddHandler = (id)=>{
    const accidentallyAddedStudent = students.find(item=> item.id ===id);
    const accidentalStudents =students.map(item=>{
      if(item.id===accidentallyAddedStudent.id){
        item.isPresent = !item.isPresent ;
      }
      return item ;
    })

    setStudents(accidentalStudents) ;
  }
  return (
    <div className="attendance-app">
      <div className="add-student-section">
        <form onSubmit={editMode? updateStudentHandler : addStudentHandler}>
          <input type="text" value={studentName} onChange={(event)=>setStudentName(event.target.value)}/>
          <button type="submit">{editMode ? 'Update Student' : 'Add Student'}</button>
        </form>
      </div>
      <div className="student-attendance-section">
        <div className="list all-student">
          <h2>All Students</h2>
          <ul>
            {students.map(item=>(
              <li key={item.id}>{item.name}
              <button onClick={()=>editStudentHandler(item.id)}>Edit</button>
              <button onClick={()=>removeStudentHandler(item.id)}>Remove</button>
              <button onClick={()=>makePresentHandler(item.id)}>Make Present</button>
              <button onClick={()=>makeAbsentHandler(item.id)}>Make Absent</button>
              
              </li>
          ))}
          </ul>
        </div>
        <div className="list present-student">
          <h2>Present Students</h2>
          <ul>
            
              {students.filter(item => item.isPresent===true ).map(item=>(
                <li key={item.id}>{item.name}
                <button onClick={()=>accidentalAddHandler(item.id)}>Accidentally Added</button>
                </li>
              ))}
            
          </ul>
        </div>
        <div className="list absent-student">
          <h2>Absent Students</h2>
          <ul>
            
              {students.filter(item => item.isPresent===false ).map(item=>(
                <li key={item.id}>{item.name}
                <button onClick={()=>accidentalAddHandler(item.id)}>Accidentally Added</button>
                </li>
              ))}
            
          </ul>

        </div>
      </div>
    </div>
  )
}


export default App;
