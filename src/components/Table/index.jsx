import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import data from "../../data/mockData.json";
import months from "../../data/months.json";
import cn from "classnames";


const Table = ()=>{

    const [stores, setStores] = useState([]);

    useEffect(()=>{
        
        let sortedData = data.sort((item1, item2)=>item1.store.id-item2.store.id);
        setStores(sortedData);

    }, [])

    const inputChangeHandler = (event, store_id, store_index, montth_id, month_index)=>{
        if(stores[store_index].store.id === store_id && stores[store_index].months[month_index].id === montth_id){
            setStores(prev=>{
                let temp = [...prev];
                temp[store_index].months[month_index].value = event.target.value;
                return temp;
            })
        }else{
            alert("Что то пошло не так");
        }
    }

    const calcStoreTotalAmount = (store_id, store_index)=>{

        if(stores[store_index].store.id === store_id){
           return  stores[store_index].months.reduce((accumulator, currentValue) => accumulator + Number(currentValue.value), 0);
        }else{
            throw "Something wrong";
        }
    }

    const calcStoreTotalAmountByMonths = (month_index)=>{
        let amount = 0;

        stores.forEach((store)=>{
            amount += Number(store.months[month_index].value);
        })
        return amount;
    }

    const calcAllAmount = ()=>{
        let amount = 0;

        stores.map(store=>{
            amount += store.months.reduce((accumulator, currentValue) => accumulator + Number(currentValue.value), 0);
        })

        return amount;
    }

    return(
        <div className={styles.wrapper}> 
            
            {
                stores.length === 0?
                    "Empty"
                :
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={cn(styles.th)}>
                                Stores
                            </th>
                            {
                                months.map((item, index)=>{
                                    return(
                                        <th key={index} className={cn(styles.th)}>
                                            {item}
                                        </th>
                                    )
                                })
                            }
                            <th className={cn(styles.total)}>
                                Total of store
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stores.map((store, store_index)=>{
                                return(
                                    <tr key={store.store.id}>  
                                        <td className={cn(styles.name)}>
                                            {store.store.name}
                                        </td>                 
                                        {
                                            store.months.map((item, month_index)=>{
                                                return(
                                                    <td key={item.id} className={cn(styles.td)}>
                                                        <input 
                                                            type="number" 
                                                            value={item.value} 
                                                            onChange={(e)=>{
                                                                inputChangeHandler(e, store.store.id, store_index, item.id, month_index);
                                                            }} 
                                                        />
                                                    </td>
                                                )
                                            })
                                        }
                                        <td className={cn(styles.total)}>
                                            {
                                                calcStoreTotalAmount(store.store.id, store_index)
                                            }
                                        </td>
                                    </tr>
                                    
                                )
                            })
                        }
                        <tr>
                            <td className={cn(styles.total)}> Total amount per month </td>
                            {
                                [0,1,2,3,4,5,6,7,8,9,10,11].map((item)=>{
                                    return(
                                        <td className={cn(styles.total)} key={Math.random()*item}> {calcStoreTotalAmountByMonths(item)} </td>
                                    )
                                })
                            }
                            <td className={cn(styles.total)}> {calcAllAmount()} <h6> Total of totals </h6> </td>
                        </tr>
                    </tbody>
                </table>
            }

        </div>
    )
}

export default Table;
