import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

export default function Label(props) {
    console.log("label",props.label);
    return (
        // <div>
        //     {props.label.map((item,index)=>{
        //         return <>
        //         <p className='label  mb-1'>
        //             <span style={{ backgroundColor: '#'+ item.color }}>
        //                 {item && item.name}
        //             </span>
        //         </p>
        //         </>
        //     })}
        // </div>
        <>
        <p className='label  mb-1'>
                    <span style={{ backgroundColor: '#' }}>
                         {props.label}
                     </span>
                 </p>
        </>
    )
}
