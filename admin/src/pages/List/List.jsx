import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {

    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error('Error fetching food items');
            }
        } catch (error) {
            toast.error('Error fetching food items');
        }
    };

    const removeFood = async (foodId) => {
        try {
            const response = await axios.delete(`${url}/api/food/remove`, { data: { id: foodId } });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchList();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error removing food item');
        }
    }

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='list add flex-col'>
            <p>All Food Items</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => (
                    <div key={index} className='list-table-format'>
                        <img src={`${url}/images/${item.image}`} alt="" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>₹{item.price}</p>
                        <button onClick={() => removeFood(item._id)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;
