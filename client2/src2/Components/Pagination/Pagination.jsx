import React from "react";
import "./pagination.css";
// const Pagination = (props) => {
//     const numbersPage = [];
//     for (var i=1; i <=Math.ceil(props.totalGames/props.gamePerPage);i++){
//          // el Math.ceil() devuelve el entero mayor o igual más próximo a un número dado.
//          //(108/15) = 7.2 = 8 , i=8
//         numbersPage.push(i)
//     }
//     return(
//         <div className='container-pagination'>
//             <span className='pages'>{'PAGINAS:    '}</span>
//                {
//                 <ul className='pagination'>
//                     {/* recorro las paginas que tengo */}
//                    {numbersPage.map(number =>(
//                        <li key={number}>
//                            <a className={props.estado===number?'numbersActive':'numbers'} onClick={()=>props.paginate(number)}>{number}</a>
//                             {/*por cada elemento renderizar el a y agregarles un evento onClick, el cual me hara cambiar entre paginas*/}
//                        </li>
//                    ))}
//                 </ul>
//                }       
//         </div>
//     )
// }
class Pagination extends React.Component{
    
    render(){
        return(
            <div className='container-pagination'>
                         <span className='pages'>{'PAGINAS:    '}</span>
                            {
                             <ul className='pagination'>
                                 {/* recorro las paginas que tengo */}
                                {numbersPage.map(number =>(
                                    <li key={number}>
                                        <a className={props.estado===number?'numbersActive':'numbers'} onClick={()=>props.paginate(number)}>{number}</a>
                                        {/*por cada elemento renderizar el a y agregarles un evento onClick, el cual me hara cambiar entre paginas*/}
                                    </li>
                                ))}
                             </ul>
                            }       
                     </div>
        )
    }

}
export default Pagination