import axios from 'axios'
export const getMatchScore = async (urlArrays, threshold, setData, assignment, setloader) => {
  setloader(true);
    console.log(urlArrays)
  let res = await axios.post(`http://localhost:8000/score?thres_hold=${threshold}`,{...urlArrays});
  console.log("Result -->",res.data.result)
  let createData = [["Student 1", "Student 2", "Match Score"]];
  for (const [key, value] of Object.entries(res.data.result)) {
    let arr = [];
    for (const [k, v] of Object.entries(value)){  
      if(k<2){
        arr.push(assignment.uploads.filter(a => a.studentId === v)[0].studentName)
      }else{
        arr.push(v)
      }
    }
    createData.push(arr);
  }
  setData(createData)
  setloader(false);
}
