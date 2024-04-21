import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [values, setValues] =useState([]);
  // const [image, setImage] =useState('');
  const [generateBtn, setGenerateBtn] = useState('Generate');
  const [number,setNumber] = useState(1);
  const [coinType, setCoinType] = useState(1);
  const [h,setH] = useState(1);
  const [t,setT] = useState(1);

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

  function noOfCoins(event) {
    setNumber(event.target.value);
  }


  // function generate() {
  //   const fetchData = async () => {
  //     try {
  //         const response = await fetch(`https://www.random.org/integers/?num=${value}&min=100000000&max=1000000000&col=1&base=10&format=plain&rnd=new`);
  //         if (!response.ok) {
  //             throw new Error('Failed to fetch data');
  //         }
  //         const data = (await response.text()).replace(/\n/g, ' ').split(' ');
  //         setImage(...image, data);
  //         return data;
  //     } catch (error) {
  //         console.error('Error fetching data:', error);
  //         return null; 
  //     }
  // };
  
  // fetchData().then(data => {
  //     if(value>100) {
  //         value=100;
  //     }
  //     for(let i=0;i<value;i++) {
  //         if(data[i] % 2 == 0) {
  //             image.innerHTML+=`<img src="./assets/head.png">`;
  //             head++;
  //         }
  //         else {
  //             image.innerHTML+=`<img src="./assets/tail.png">`;
  //             tail++;
  //         }
  //     }
  //     document.querySelector('.head-count').innerHTML = head;
  //     document.querySelector('.tail-count').innerHTML = tail;
  // });
  // }

  function setTypeOfCoin() {
    const coinSelector = document.querySelector('.coinType');
    setCoinType(coinSelector.value);
  }
  function generate() {
    let i=0;
    let newData = [];
    let h=0;
    let t=0;
    setValues();
    let heads = ['src/assets/indian-obverse.png','src/assets/american-obverse.png','src/assets/todd-obverse.png','src/assets/antoninus-obverse.png','src/assets/aurelian-obverse.png','src/assets/constatius-obverse.png','src/assets/Eucratides-obverse.png','src/assets/maximinus-obverse.png','src/assets/postumus-obverse.png','src/assets/valentinian-obverse.png','src/assets/us-obverse.png'];
    let tails = ['src/assets/indian-reverse.png','src/assets/american-reverse.png','src/assets/todd-reverse.png','src/assets/antoninus-reverse.png','src/assets/aurelian-reverse.png','src/assets/constatius-reverse.png','src/assets/Eucratides-reverse.png','src/assets/maximinus-reverse.png','src/assets/postumus-reverse.png','src/assets/valentinian-reverse.png','src/assets/us-reverse.png']
    setGenerateBtn('Generating....');
    while(i < number) {
      let value =new String(parseInt(new String(quantumData[i%10]),16)).slice(0,8);
      if(value%2 === 0) {
        newData.push(`${heads[coinType-1]}`);
        h++;
      }
      else {
        newData.push(`${tails[coinType-1]}`);
        t++;
      }
      i++;
    }
    setH(h);
    setT(t);
    setGenerateBtn('Generate'); 
    setValues(newData);
  }

  return (
    <>
      <div className='container bg-gray-100 p-6 w-11/12 flex flex-col items-center '>
        <p className='title font-bold text-4xl text-black'>Coin Flipper</p>
        <div className='image m-2'>
        {values.map((value, index) => (
          <img className='w-8 h-8' key={index} src={value} />
        ))}
        </div>
        <div className='result mt-5 flex flex-row gap-x-8  h-8 justify-between w-8/12'>
          <div className='flex  flex-row items-center gap-x-2'>
            <p className='flex-nowrap '>No.of Coins:</p>
            <input className='count w-10 p-1 border-2 border-black-100' value={number} onChange={noOfCoins}></input>
          </div>
          <select className='coinType w-auto border-2 bg-white h-8' onChange={setTypeOfCoin}>
            <option value={1}>Indian 1 Rupee</option>
            <option value={2}>American voting 2004</option>
            <option value={3}>Todd Redden's Decision Maker Coin</option>
            <option value={4}>Antoninus Pius - Bronze Sestertius - Roman Empire</option>
            <option value={5}>Aurelian - Bronze Antoninianus - Roman Empire</option>
            <option value={6}>Constatius II - Silver Siliqua - Roman Empire</option>
            <option value={7}>Eucratides - Silver Tetradrachm - Bactria Indo-Sythican Greek Kingdom</option>
            <option value={8}>Maximinus - Bronze/Silver Tetradrachm - Roman Empire</option>
            <option value={9}>Postumus - Bronze/Silver Antoninianus - Roman Empire</option>
            <option value={10}>Valentinian II - Silver Siliqua - Roman Empire</option>
            <option value={11}>US $1 - John Adams</option>
          </select>
          <button className='winner bg-black text-white px-3 rounded-md w-auto h-full' onClick={generate}>{generateBtn}</button>
        </div>
      </div>
    </>
  )
}

export default App
