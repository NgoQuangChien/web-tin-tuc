
import HeaderManage from "./HeaderManage";
import "../../style/manageLayout.css"
function ManageLayout({children}) {
    return (  
        <div className="containerManage">
            <HeaderManage className="headerManage"/>
            <div className="contentManage">
                {children}
            </div>
        </div>
    );
}

export default ManageLayout;