import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {

  const { food_list, searchQuery } = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>

      <div className="food-display-list">
        {food_list
          .filter((item) => {
            // ✅ category filter
            const categoryMatch =
              category === "All" || category === item.category

            // ✅ search filter
            const searchMatch = item.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())

            return categoryMatch && searchMatch
          })
          .map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
      </div>
    </div>
  )
}

export default FoodDisplay

