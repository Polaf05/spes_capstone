import React from 'react'
import { useClassroom } from '../../hooks/useSetClassroom';

const  Test = () => {
    
  const { students } = useClassroom();
  return (
    
    <pre>{students ? JSON.stringify(students, null, 2) : "No data"}</pre>
  )
}

export default Test 