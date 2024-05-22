import React from 'react';
import './Exploremenu.css';
import { menu_list } from '../../assets/assets';

const Exploremenu = ({ category, setCategory }) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1> Explore our Menu </h1>
            <p className='explore-menu-text'> 
Savor a variety of delicious dishes made with the finest ingredients to elevate your dining experience, one bite at a time. </p>
            <div className='explore-menu-list'>
                {menu_list.map((item, index) => (
                    <div key={index} onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} className='explore-menu-list-item'>
                        <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    )
}

export default Exploremenu;

