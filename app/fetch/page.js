'use client';

import { useEffect, useState } from 'react';

export default function Page(params) {
    const { id } = params;
    const [data, setData] = useState();
    const [detail, setdetail] = useState();
    const [loading, setLoading] = useState(true);
    const [apiUrl, setApiUrl] = useState('https://pokeapi.co/api/v2/pokemon');


    useEffect(() => {
        fetch(apiUrl).then(res => res.json())
            .then(json => {
                setData(json);
                console.log(json)
                console.log(json.next)
                console.log(json.previous)
                setLoading(false);
            });
    }, [apiUrl]);


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
        if (data.next) {
            setApiUrl(data.next)
            console.log(data.next)
        }
    }
    const prevfun = () => {
        if (data.previous) {
            setApiUrl(data.previous)
            console.log(data.previous)
        }
    }

    return (
        <div className=' flex p-3'>
            <div className="w-[400px] border-r pr-4">
                <h2 className="text-lg font-bold mb-2">POKIEMON NAMES :-</h2>
                <ul>
                    {data.results.map((itm, i) => (
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
                        disabled={!data.previous}
                        className={`border p-2 w-[25%] rounded
                    ${!data.previous ? 'cursor-not-allowed' : 'hover:bg-amber-700 cursor-pointer'}`}>Previous</button>

                    <button
                        onClick={nextfun}
                        disabled={!data.next}
                        className={`border p-2 w-[25%] rounded
                             ${!data.next ? 'cursor-not-allowed' : 'hover:bg-amber-700  coursor-pointer' }`}>Next </button>
                </div>
            </div>
            <div className='w-[500px] pl-4 flex'>
                <div className='w-1/2'>

                    <h2 className='text-lg font-bold mb-2'>POKIEMON DETAIL :-</h2>
                    {detail && (

                        <div>


                            <p className="mt-2"><strong>Name:</strong> {detail.name}</p>
                            <p className="mt-2"><strong>Height:</strong> {detail.height}</p>
                            {detail.move}

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
