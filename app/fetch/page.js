'use client';

import { useEffect, useState } from 'react';

export default function Page(params) {
    const { id } = params;
    const [data, setData] = useState();
    const [detail, setdetail] = useState();
    const [loading, setLoading] = useState(true);
    const [apiurl, setApiurl] = useState('https://pokeapi.co/api/v2/pokemon');


    useEffect(() => {
        fetch(apiurl)
        .then(res => res.json())
        .then(json => {
            setData(json);
            setLoading(false);
            // console.log(json)
           // console.log(+json.next)
            // console.log(json.previous)
        });
    }, [apiurl]);
    
    if (loading)
        return <p>Loading Pokemons...</p>;

    const pokieDetail = async (url) => {
        setLoading(true)
        const res = await fetch(url)
        const data = await res.json();
        setdetail(data);
        setLoading(false)
    }
    const nextfun = () => {
        if (data?.next) {
            setApiurl(data.next)
        }
    }
    const prevfun = () => {
        if (data?.previous) {
            setApiurl(data.previous)
        }
    }

    return (
        <div className=' flex p-3'>
            <div className="w-[400px] border-r pr-4">
                <h2 className="text-lg font-bold mb-2">POKIIEMON NAMES :-</h2>
                <ul>
                    {data?.results?.map((itm, i) => (
                        <li key={i}>
                            <button
                                onClick={() => pokieDetail(itm.url)}
                            >
                                {itm.name}
                            </button>

                        </li>
                    ))}

                </ul>
                <div className='flex justify-center  items-center gap-4'>

                    <button
                        onClick={prevfun}
                        disabled={!data?.previous}
                        className={`border p-2 w-[25%] rounded
                    ${!data?.previous ? 'cursor-not-allowed' : 'hover:bg-amber-700 cursor-pointer'}`}>Previous</button>

                    <button
                        onClick={nextfun}
                        disabled={!data?.next}
                        className={`border p-2 w-[25%] rounded
                             ${!data?.next ? 'cursor-not-allowed' : 'hover:bg-amber-700  coursor-pointer'}`}>Next </button>
                </div>
            </div>
            <div className='w-[500px] pl-4 flex'>
                <div className='w-1/2'>

                    <h2 className='text-lg font-bold mb-2'>POKIEMON DETAIL :-</h2>
                    {detail && (

                        <div>


                            <p className="mt-2"><span className='text-red-600 font-bold'>Name:</span> {detail.name}</p>
                            <p className="mt-2"><span className='text-red-600 font-bold'>Height:</span> {detail.height}</p>
                            

                        </div>

                    )}
                </div>
                <div className='w-1/2'>


                    {detail && (
                        <button className='border p-2 w-[30%] rounded hover:bg-amber-700'
                            onClick={() => setdetail(null)}>RESET</button>
                    )}

                </div>
            </div>




        </div>
    );
}


/*
 * usestatate and useeffect to import kiya.
 * useState - Data, detail,loading status,and api url ko store karne ke liye.
 * html body bani buttons like reset previous next and show details
 * then useEffecect ka use krke api fetch ki on every render when apiurl changes
 * then shhow data on html using map method 
 * then made  a loading state for  showing loading status on page
 * then made  pokieDetail(itm.url) for showing detail of pokiemons it takes  url when we clicked on button
 * then made 2 buttons prev and next button check the availablity of url in both case
 * made a reset button to clear all pokiemons details
 */