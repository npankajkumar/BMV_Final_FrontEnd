import MemberProfilePage from "@/components/MemberProfilePage";
import NotFound from "@/components/NotFound";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBmv } from "@/contexts/bmvContext";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const { token, isLoggedin } = useBmv();

  useEffect(() => {
    axios
      .get("http://localhost:5059/api/Customers", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setMobile(response.data.mobile);
        setPageLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data : ", error);
        setPageLoading(false);
      });
  }, []);

  const navigate = useNavigate();
  const handleProfileUpdate = (updatedData: {
    name: string;
    mobile: string;
  }) => {
    setName(updatedData.name);
    setMobile(updatedData.mobile);
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

  if (!isLoggedin) {
    navigate("/");
    toast({
      title: "Please Login to view your profile",
      className: "border-2 border-primary",
    });
  }

  return (
    <div className="py-10 px-36">
      <MemberProfilePage
        className="w-2/3 "
        name={name.charAt(0).toUpperCase() + name.slice(1)}
        email={email}
        mobile={mobile}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  );
};

export default Profile;
