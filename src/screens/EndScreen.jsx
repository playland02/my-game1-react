function EndScreen() {


    function clickBackMenu(){
        location.reload()
    }

    return (
        <>
            <div className="card">
                <div className="card-header bg-dark text-warning">
                    Game over
                </div>
                <div className="card-body bg-dark text-danger">
                    <h5 className="card-title">You lost by trying 3 times</h5>
                    <p className="card-text">Return to main menu</p>
                    <a  className="btn btn-warning" onClick={clickBackMenu}>Back main menu</a>
                </div>
            </div>

        </>
    )
} export default EndScreen