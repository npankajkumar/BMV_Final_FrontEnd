import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserIndex from "../pages/user/Index"
import ProviderIndex from "../pages/provider/Index"

const Index = () => {
    const [rootLoading, setRootLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const token = localStorage.getItem("auth");
    useEffect(()=>{
        if(!token || (token!="user" && token!="provider"))
        setRootLoading(false);
        navigate("/login");
    })
    if(rootLoading)
        return <div>Loading</div>
    if(token == "user")
        return <UserIndex/>
    if(token == "provider")
        return <ProviderIndex/>
    return <div>not found</div>
}

export default Index