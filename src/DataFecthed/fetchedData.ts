    // import React, { useState, useEffect } from 'react';
    // import axios from 'axios';

    
    // interface Item {
    //     _id: string;
    //     name: string;
    //     description: string;
    // }


    // export function

    // const ItemList: React.FC = () => {
    //     const [items, setItems] = useState<Item[]>([]);
    //     const [loading, setLoading] = useState<boolean>(true);
    //     const [error, setError] = useState<string | null>(null);

    //     useEffect(() => {
    //         const fetchItems = async () => {
    //             try {
    //                 const response = await axios.get<Item[]>('http://localhost:5000/api/items');
    //                 setItems(response.data);
    //             } catch (err) {
    //                 setError('Failed to fetch items');
    //                 console.error(err);
    //             } finally {
    //                 setLoading(false);
    //             }
    //         };

    //         fetchItems();
    //     }, []);

    //     // if (loading) return <div>Loading items...</div>;
    //     // if (error) return <div>Error: {error}</div>;

    //     // return (
    //     //     <><>
    //     //     // <div>
    //     //     //     <h1>Items</h1>
    //     //     //     <ul>
    //     //     //         {items.map(item => (
    //     //     //             <li key={item._id}>
    //     //     //                 <strong>{item.name}</strong>: {item.description}
    //     //     //             </li>
    //     //     //         ))}
    //     //     //     </ul>
    //     //     // </div>
    //     // );
    // };

    // export default ItemList;



