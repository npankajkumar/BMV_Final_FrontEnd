import React from 'react'
import { CardTitle } from './ui/card'
import {venueCardsData} from "../db.ts"
import VenueCard from './VenueCard'

const UserVenueCardsGrid = ({className, title}:{className?:string, title:string}) => {
  return (
    <div className={`${className}`}>
        <CardTitle className='mb-4'>{title}:</CardTitle>
        <div className='grid grid-cols-3 gap-4'>
            {venueCardsData.map(cardData=><VenueCard title={cardData.title} city={cardData.city} rating={cardData.rating} imageUrl={cardData.imageUrl} provider={cardData.city} />)}
        </div>
    </div>
  )
}

export default UserVenueCardsGrid