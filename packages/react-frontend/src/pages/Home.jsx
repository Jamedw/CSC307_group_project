import Sidebar from "./Sidebar";
import Poly_logo from "./componets/Poly_logo";
import Log_in_button from "./componets/Log_in_button";
import Search_bar from "./componets/Search_bar"
import "./Home.css"

function Home() {
    return (
        <div>
            <div className="header">
                This is a header
            </div>
            
            <div className="topnav" >
                
                <Poly_logo  />
                <Search_bar />
                <Log_in_button />
                
            </div>

            <Sidebar />
        </div>
    );
  };
  
  
  export default Home;