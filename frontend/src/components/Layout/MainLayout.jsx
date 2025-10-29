import Header from "./Header";
import Footer from "./Footer";
import { Children } from "react";

function DefaultLayout({ children }) {
    return (  
        <div>
            <Header />
            <main className="mainContent">
                {/* Nội dung trang sẽ được chèn ở đây */}
                <div className="content">{children}</div>
            </main>
            <Footer />
        </div>
    );
}

export default DefaultLayout;