import { useState ,useEffect} from 'react'
import './App.css'

function App(){
  const [holes, setHoles] = useState(1);
  const [generate, setGenerate] = useState('Generate');
  const [result, setResult] = useState([]);
  const [course_st, setCourse_st] = useState(1);
  const [course_end, setCourse_end] = useState(9);
  const [courseHole, setCourseHole] = useState(1);

  let quantumData=[
    'd9bed819869d94d6',
    '59a78788c72a16fe',
    'c65b47abea94dff8',
    '6e25c033ac57b925',
    'e384e9936289fb5d',
    'fa333b066ec942d9',
    '1da823f43c73d1a6',
    '76a2e1838298ccef',
    '7e2401d10a895f85',
    'c98344b09101597b'
  ];

  function holesCount(event){
    setHoles(event.target.value);
  }

  function courseHoleMethod(event) {
    setCourseHole(parseInt(event.target.value));
  }

  useEffect(() => {
    if (courseHole === 1) {
        setCourse_st(1);
        setCourse_end(9);
    } else if (courseHole === 2) {
        setCourse_st(9);
        setCourse_end(18);
    } else {
        setCourse_st(1);
        setCourse_end(18);
    }
  }, [courseHole]);

  async function generateBtnClick(){
    setGenerate('Generating...');
    setResult([]);
    // const data =await apiCall();
    const data = quantum();
    setResult(data);
    setGenerate('Generate');
  }

  async function apiCall(){
    console.log(course_st,course_end);
    const response = await fetch(`https://www.random.org/integers/?num=${holes}&min=${course_st}&max=${course_end}&col=1&base=10&format=plain&rnd=new`);
    const data= (await response.text()).replace(/\n/g, ' ').split(' ');
    console.log(data);
    return data;
  }
  
  function quantum(){
    let data = [];
    let i=0;
    if(course_st === 9){
      while(data.length < holes) {
        let value =parseInt(new String(quantumData[i%9]),16);
        console.log((value % 9));
        if(value%course_end === 0 && (!data.includes((value % 9)+9))) {
          if(value === 1 && !data.includes((1))){
            continue;
          }
          (!data.includes((value % 9)+9))
        }
        
        else if(!data.includes((value % 9)+9)) {
          data.push((value%9)+9);
        }

        else if(i>100)
          break;
      }
    }
    else{
      while(data.length < holes) {
        let value =parseInt(new String(quantumData[i%10]),16);
        console.log(value)
        if(value%course_end === 0 && (!data.includes((value % 18)))) {
          if(value === 1 && !data.includes((1))){
            continue;
          }
          (!data.includes((value % 18)))
        }
        else if(!data.includes((value % 18))){
          data.push((value%course_end));
        }
      }
    }
    return data;
  }



  return (
    <>
      <div className='container bg-gray-100 w-10/12 flex flex-col justify-center items-center gap-y-2 m-3 '>
        <p className='m-2 font-bold text-3xl'>Birdie Fund Generator</p>
        <div className=''>
        {result.map((value, index) => (
          <div key={index}>{value}</div>
        ))}
        </div>
        <div className='m-1 h-fit w-8/12 flex justify-center items-center'>
          <div className='m-2 flex items-center gap-x-2 w-auto h-fit'>
            <p className='font-bold'>Generate Holes:</p>
            <input className='holes h-8 p-2 w-8 rounded-md border-2' value={holes} onChange={holesCount}></input>
          </div>
          <div className='m-2 items-center flex w-auto gap-x-2'>
            <p className='font-bold'>Choose Course:</p>
            <select className='course h-8 border-2 bg-white rounded-md' onChange={courseHoleMethod}>
              <option value={1}>9-hole (Front 9)</option>
              <option value={2}>9-hole (Back 9)</option>
              <option value={3}>18-hole </option>
            </select>
          </div>
          <button className='generateBtn w-fit px-2 bg-black text-white h-8 rounded-md' onClick={generateBtnClick}>{generate}</button>
        </div>
      </div>
    </>
  )
}

export default App
