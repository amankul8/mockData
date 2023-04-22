import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import Table from "../../components/Table";


const Main = ()=>{

    return(
        <div className={styles.wrapper}>
            <h2> ТЗ - Mock Data </h2>
            <Table/>
        </div>
    )
}


export default Main;