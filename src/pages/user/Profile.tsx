import MemberProfilePage from "@/components/MemberProfilePage";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5059/api/Customers/2")
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setMobile(response.data.mobile);
      })
      .catch((error) => {
        console.error("Error fetching data : ", error);
      });
    setTimeout(() => {
      setPageLoading(false);
    }, 5000);
  }, []);
  if (pageLoading)
    return (
      <div className="h-[90vh] w-[100%] flex flex-col justify-around">
        <div className="p-4 grid md:grid-cols-5 grid-cols-1 gap-6">
          <div className="col-span-4">
            {[1, 2, 3, 4].map((i) => {
              return <Skeleton key={i} className="h-10 my-4" />;
            })}
          </div>
          <Skeleton className="rounded-full h-56 my-auto" />
        </div>
      </div>
    );
  return (
    <div className="py-10 px-36">
      <MemberProfilePage
        className="w-2/3 "
        name={name.charAt(0).toUpperCase() + name.slice(1)}
        email={email}
        phone={mobile}
      />
    </div>
  );
};

export default Profile;
