import {Link} from 'react-router-dom'
import _ from 'lodash';
const Pagination = (props) => {
    const {itemCounts,pageSize,currentPage,onPageChange}=props;
    const pageCount=Math.ceil(itemCounts / pageSize);
    if(pageCount===1) return null;
    const pages=_.range(1,pageCount+1);
    console.log("currentPage",currentPage);
    return ( 
        <nav>
            <ul className="pagination">
                {pages.map((page)=> <li key={page} className={page===currentPage?"page-item active":"page-item"}><a onClick={()=>onPageChange(page)} className="page-link">{page}</a></li>)}
            </ul>
        </nav>
     );
}
 
export default Pagination;