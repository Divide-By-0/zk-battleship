import React from "react";
import Square from "./Square.js"

const Constants = require("../Consts.js");

class EnemyBoard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            grid: Array(Constants.GRID_SZ).fill().map(_ => Array(Constants.GRID_SZ).fill('-')),      
            shooting: false,
        }
        this.generateBoard = this.generateBoard.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.takeShot = this.takeShot.bind(this)
    }

    async takeShot(x, y) {
        // Fill in this function with necessary logic to make a shot at enemy board
        // For testing purposes, just return hit with p=0.5, and generate dummy info for ship
        let success = Math.floor(Math.random() * 2)
        let shipInfo = success ? Constants.SHIPS[Math.floor(Math.random() * 5)] : null
        return {success: success, ship: shipInfo}
    }
    
    async handleClick(x, y) {        
        if (this.state.shooting) {
            let result = await this.takeShot()
            console.log(result)
            let grid = this.state.grid
            alert(result.success ? "Your shot was a hit on the enemy " + result.ship.NAME + "!" : "Your shot was a miss!")
            grid[x][y] = result.success ? result.ship.COLOR : Constants.MISS
            this.setState({
                grid: grid,
                shooting: false
            })
        }
    }

    generateBoard() {
        let board = this.state.grid.map((row, i) => {return (
            <tr key={`row_${i}`}>
                {row.map((_, j) => {
                    let color = this.state.grid[i][j] === '-' ? "white" : this.state.grid[i][j]                    
                    return (
                        <Square clicked={()=>this.handleClick(i, j)} color={color} size={Constants.CELL_SZ} key={i+","+j}/>
                    )                    
                })}
            </tr>
        )})
        return board
    }    
    
    render() {
        let board = this.generateBoard()
        return (
            <div className="enemyBoard">                
                <table cellSpacing="0" className="boardTable">
                    <tbody>
                        {board}
                    </tbody>                    
                </table>
                {this.state.shooting && <h3 className="warning">Click on a square to take shot!</h3>}
                <button onClick={() => this.setState({shooting: true})}>Take Shot!</button>                
            </div>
        )
    }
}

export default EnemyBoard;