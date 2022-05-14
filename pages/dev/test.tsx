import React, { useEffect, useState } from 'react'
import { useClassroom } from '../../hooks/useSetClassroom';

const  Test = () => {
    
  const { students, setStudents } = useClassroom();
  const [sort, setSort] = useState<string>("")
  useEffect(()=>{
    const filtered = students?.sort((a,b)=>{
      switch(sort){
        case "grade_before":
          return b.grade_before - a.grade_before;
      
        case "grade_after":
          return b.grade_after - a.grade_after;
        }
    })
    console.log(filtered)
    setStudents(filtered!)
  }, [sort])

  return (
    <>
    <button className='border bg-yellow-50' onClick={()=>{setSort("grade_after")}}>Sort</button>
    <button className='border bg-yellow-50' onClick={()=>{setSort("grade_before")}}>Sort</button>
    <pre>{students ? JSON.stringify(students, null, 2) : "No data"}</pre>
    </>
  )
}

export default Test 