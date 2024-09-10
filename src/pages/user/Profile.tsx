import { Skeleton } from '@/components/ui/skeleton';
import React, { useEffect, useState } from 'react'

const Profile = () => {
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
  if(pageLoading)return (
    <div className='p-4 grid md:grid-cols-5 grid-cols-1 gap-6'>        
        <Skeleton className='rounded-full h-56 my-auto'/>
        <div className='col-span-4'>
            {[1,2,3,4].map(i=>{return <Skeleton className='h-10 my-4'/>})}
        </div>
    </div>
  )
}

export default Profile