import React from "react";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
function Text() {
  return (
    <div className="App">
      <Tippy
        arrow={false}
        delay={1000}
        placement="right"
        content="basichsgshsjsjshwjwjwjwjwj"
      >
        <button>Hover</button>
      </Tippy>
    </div>
  );
}

export default Text;

// .box {
//   /* border: 5px solid black; */
//   /* background: #1cb803; */
//   width: 100%;
//   border: 1px solid black;
// }
// .grid {
//   width: 100%;
//   /* height: 100%; */
//   display: grid;
//   gap: 5rem;
//   grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
//   border: 1px solid black;
// }
// .mobile-shoptext {
//   padding-top: 10px;
//   text-align: center;
// }
// .mobile-shoptext p a {
//   color: #252525;
// }
// .mobile-shoptext h3 {
//   color: #252525;
//   margin-top: 13px;
//   font-weight: bold;
//   font-size: 19px;
// }

// {/* <div className="mobile-header">
//   <div className="grid shop">
//     {products.map((product) => (
//       <div
//         //className="shop col-lg-4 col-md-6 col-sm-6"
//         className="box"
//         key={product._id}
//       >
//         {/* <div className="border-product"> */}
//         <Link to={`/products/${product._id}`}>
//           <div className="">
//             <img
//               src={product.image}
//               alt={product.name}
//               width={100}
//               height={100}
//             />
//             <h3>Gh₵ {product.price}</h3>
//           </div>
//         </Link>

//         <div className="shoptext">
//           <p>
//             <Link to={`/products/${product._id}`}>
//               {product.name.slice(0, 15)}...
//             </Link>
//           </p>
//           <Rating value={product.rating} />
//         </div>
//       </div>
//     ))}
//   </div>
//   <nav className="float-end" aria-label="Page mobile-pagination">
//     <ul className="pagination">
//       <li className="page-item disabled">
//         <Link className="page-link" to="#">
//           Previous
//         </Link>
//       </li>
//       <li className="page-item active">
//         <Link className="page-link" to="#">
//           1
//         </Link>
//       </li>
//       <li className="page-item">
//         <Link className="page-link" to="#">
//           2
//         </Link>
//       </li>
//       <li className="page-item">
//         <Link className="page-link" to="#">
//           3
//         </Link>
//       </li>
//       <li className="page-item">
//         <Link className="page-link" to="#">
//           Next
//         </Link>
//       </li>
//     </ul>
//   </nav>
// </div>; */}
