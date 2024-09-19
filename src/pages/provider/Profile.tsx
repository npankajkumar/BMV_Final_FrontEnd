import MemberProfilePage from "@/components/MemberProfilePage";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const Profile = ({
  provider,
  updateProvider,
}: {
  provider: any;
  updateProvider: any;
}) => {
  const [pageLoading, setPageLoading] = useState(true);
  const [name, setName] = useState(provider.name);
  const [email] = useState(provider.email);
  const [mobile, setMobile] = useState(provider.mobile);
  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 1000);
  }, []);

  const handleProfileUpdate = (updatedData: {
    name: string;
    mobile: string;
  }) => {
    setName(updatedData.name);
    setMobile(updatedData.mobile);
    updateProvider();
  };

  if (pageLoading)
    return (
      <div className="p-4 grid md:grid-cols-5 grid-cols-1 gap-6">
        <Skeleton className="rounded-full h-56 my-auto" />
        <div className="col-span-4">
          {[1, 2, 3, 4].map((i) => {
            return <Skeleton key={i} className="h-10 my-4" />;
          })}
        </div>
      </div>
    );
  return (
    <div className="py-10 px-36">
      <MemberProfilePage
        className=""
        name={name}
        email={email}
        mobile={mobile}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  );
};

export default Profile;
