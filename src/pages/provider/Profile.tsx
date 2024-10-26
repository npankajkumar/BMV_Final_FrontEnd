import MemberProfilePage from "@/components/MemberProfilePage";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

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
      <div className="w-[80%] bg-background text-foreground p-6 ml-24 mt-6">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-12 w-64 mx-auto mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="col-span-1">
              <CardContent className="p-6 flex flex-col items-center space-y-4">
                <Skeleton className="h-40 w-40 rounded-full" />

                <Skeleton className="h-10 w-full mt-4" />
              </CardContent>
            </Card>
            <Card className="col-span-1 md:col-span-2">
              <CardContent className="p-6 space-y-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-4 p-4 bg-muted rounded-lg"
                  >
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-1/4 mb-2" />
                      <Skeleton className="h-6 w-3/4" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
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
