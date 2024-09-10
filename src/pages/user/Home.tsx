import { Skeleton } from '@/components/ui/skeleton';
import React, { useEffect, useState } from 'react'

const Home = () => {
    const [pageLoading, setPageLoading] = useState(true);
    useEffect(()=>{
        // axios.get('https://api.example.com/data')
        //       .then(response => {
        //         setData(response.data);
        //         setLoading(false);
        //       })
        //       .catch(error => {
        //         console.error('Error fetching data:', error);
        //         setLoading(false);
        //       });
        setTimeout(() => {
            setPageLoading(false);
          }, 5000); 
        }
    )
    if(pageLoading)
    return ( <div className='grid md:grid-cols-3 grid-cols-1 gap-4 p-5'>
      {[1,2,3,4,5].map(i=>{
          return <Skeleton className='h-44' key={i}/>
      })}
    </div>
    )
  return (
    <div>Home</div>
  )
}

export default Home