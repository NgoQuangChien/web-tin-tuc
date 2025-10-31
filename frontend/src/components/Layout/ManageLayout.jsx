
import Header from "./Header";

function ManageLayout({children}) {
    return (  
        <div className="containerManage">
            <Header/>
            <div className="contentManage">
                {children}
            </div>
        </div>
    );
}

export default ManageLayout;