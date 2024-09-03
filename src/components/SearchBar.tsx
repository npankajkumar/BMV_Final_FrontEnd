import { Button } from './ui/button'
import { Input } from './ui/input'

const SearchBar = ({className}:{className?:string}) => {
  return (
    <div className={`flex w-full max-w-sm items-center space-x-2 ${className}`}>
    <Input type="email" placeholder="Search for a venue" />
    <Button type="submit">Search</Button>
  </div>
  )
}

export default SearchBar