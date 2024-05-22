// import React, { useContext } from 'react';
// import './FoodDisplay.css';
// import { StoreContext } from '../../context/StoreContext';
// import FoodItem from '../FoodItem/FoodItem';

// const FoodDisplay = ({ category }) => {
//   const { food_list } = useContext(StoreContext);

//   return (
//     <div className='food-display' id='food-display'>
//       <h2>Top Dishes near you </h2>
//       <div className='food-display-list'>
//         {food_list.map((item, index) => {
//           if (category === "All" || category === item.category) {
//             return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />;
//           }
//           return null; // Added to satisfy React's requirement of returning a value in map function
//         })}
//       </div>
//     </div>
//   );
// };

// export default FoodDisplay;


import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = () => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes </h2>
      <div className='food-display-list'>
        {food_list.map((item) => (
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
  );
};

export default FoodDisplay;

