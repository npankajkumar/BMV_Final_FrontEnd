import MemberProfile from "@/components/MemberProfile";
import MemberProfilePage from "@/components/MemberProfilePage";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";

const Profile = ({ provider }: { provider: any }) => {
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
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
  });
  if (pageLoading)
    return (
      <div className="p-4 grid md:grid-cols-5 grid-cols-1 gap-6">
        <Skeleton className="rounded-full h-56 my-auto" />
        <div className="col-span-4">
          {[1, 2, 3, 4].map((i) => {
            return <Skeleton className="h-10 my-4" />;
          })}
        </div>
      </div>
    );
  return (
    <div className="py-10 px-36">
      <MemberProfilePage className="" name="kjhg" email="jhf" phone="jvf" />
    </div>
  );
};

export default Profile;
