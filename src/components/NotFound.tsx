const NotFound = ({message}:{message:string}) => {
  return (
    <div className="h-screen flex items-center justify-center">
          <p className="text-7xl text-primary font-bold" >{message} Not Found</p>
        </div>
  )
}

export default NotFound