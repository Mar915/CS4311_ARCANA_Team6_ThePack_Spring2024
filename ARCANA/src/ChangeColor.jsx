function ChangeColor(){
    return(
        <body className="changeColorMenu">
            <div className="colorBox">
                <h1>Change Website Color</h1>
                <p>Select a color scheme</p>
                <p>If you would like to apply the color scheme permanently, please click save.</p>
            </div>

            <div className="saveButton">
                <button>Save</button>
            </div>
        </body>
    );
}

export default ChangeColor