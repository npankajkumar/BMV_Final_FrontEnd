import BookingCard from '@/components/BookingCard'
import { useToast } from '@/hooks/use-toast'

import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

const Bookings = () => {
    const toast = useToast();
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
    if(pageLoading){
        return (
            <div className='mx-40 flex flex-col gap-2'>
                {[1,2,3].map((i)=><Card key={i} className="grid grid-cols-2 space-x-4  p-4">
                <div className='flex flex-col gap-2'>
                <Skeleton className='w-40 h-10'/>
                <Skeleton className='w-30 h-10'/>
                <Skeleton className='w-10 h-10'/>
                </div>
                <div className='flex flex-col gap-2'>
                <Skeleton className='w-40 h-10'/>
                <Skeleton className='w-40 h-10'/>
                <div className='flex gap-2'>
                <Skeleton className='w-10 h-10'/>
                <Skeleton className='w-10 h-10'/>
                </div>
                </div>
    </Card>
                )}
            </div>
        )
    }
  return (
    <div className='mx-40 my-10'>
        <BookingCard/>
    </div>
  )
}

export default Bookings