function NavBar(){
    return(
        <header className="navigationBar">
            ARCANA
            
            <button className="viewMenuButton">View Opened Project</button>
            <button className="syncMenuButton">Sync Projects</button>
            <button className="manageMenuButton">Manage Projects</button>
            <button className="homeButton"><img className="homeLogo" src="/home.png" alt="housepng" /></button>
        </header>
    );
}

export default NavBar