import SearchBar from '@/components/SearchBar';
import UserVenueCardsGrid from '@/components/UserVenueCardsGrid';
import { Skeleton } from '@/components/ui/skeleton';
import { venueCardsData } from '@/db';
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
    <div className='p-5'>
      <SearchBar className='my-10 mx-auto'/>
      <UserVenueCardsGrid className='my-4' title='Top-Rated' cardDataArray={venueCardsData.slice(0,5)}/>
      <UserVenueCardsGrid className="my-4" title='Top-Booked' cardDataArray={venueCardsData.slice(0,5)}/>
    </div>
  )
}

export default Home