
function header() {
// const query=document.getElementById("Search_bar").value;
// const urlSearch=`https://api.tvmaze.com/singlesearch/shows?q=${query}`;

    return(
        <>
        <nav >
        <h1 className="logo">Movie.</h1>
        <div >
            <input type="text" placeholder="Enter movie name" id="Search_bar" />
            <button id="Search_btn" >Search</button>
        </div>
    </nav>
    </>
    )
}

export default header 