import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [values, setValues] =useState([]);
  const [winner, setWinner] =useState('');
  const [generateBtn, setGenerateBtn] = useState('Generate');
  const [number,setNumber] = useState(1);

  let data=[
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

  function generate(){
    const count = document.querySelector('.count').value;
    var result=[];
    
    async function fetching() {
      setGenerateBtn('Generating...');
      setWinner('Waiting for the winners...');
      setValues([]);
      const response = await fetch(`https://www.random.org/integers/?num=6&min=0&max=99&col=1&base=10&format=plain&rnd=new`);
      let data =(await response.text()).replace(/\n/g,' ').split(' ');

      data=data.map((val)=>{
        if(val<9)
          return '0'+val;
        return val;
      });

      let val = data[0]+'-'+data[1]+'-'+data[2]+'-'+data[3]+'-'+data[4]+' / '+data[5];
      result.push(val);
    }

    const fetchData = async () => {
      setWinner('');
      for(let i=0;i<count;i++){
        // await fetching();
        let value =new String(parseInt(new String(data[i%10]),16));
        // console.log(value);
        let ticket = value.slice(0,2)+'-'+value.slice(2,4)+'-'+value.slice(4,6)+'-'+value.slice(6,8)+'-'+value.slice(8,10)+' / '+value.slice(10,12);
        result.push(ticket);
        setGenerateBtn('Generate');
        setWinner('Winners:');
      }
    };

    fetchData().then(() => {
      setValues([...result]);
    });
  } 

  function nooftickets(event){
    const val = event.target.value;
    setNumber(val);
  }

  return (
    <>
      <div className='container bg-gray-100 p-6 w-10/12 flex flex-col items-center '>
        <p className='title font-bold text-4xl text-black'>Lottery Ticket Generator</p>
        <div className='data m-2'>
        <div className='my-2 font-bold text-xl'>{winner}</div>
        {values.map((value, index) => (
          <div className='text-green' key={index}><span className='text-bold'>{index+1}. </span>{value}</div>
        ))}
        </div>
        <div className='result mt-5 flex flex-row gap-x-8  h-8 justify-items-center'>
          <div className='flex flex-row items-center gap-x-1'>
            <p className='h-fit'>No.of Tickets:</p>
            <input className='count w-10 p-1 border-2 border-black-100' value={number} onChange={nooftickets}></input>
          </div>
          <button className='winner bg-black text-white px-3 rounded-md w-auto h-full' onClick={generate}>{generateBtn}</button>
        </div>
      </div>
    </>
  )
}

export default App
