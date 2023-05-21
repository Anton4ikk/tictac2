import React from 'react'
import Square from './Square';
import './Board.css'

export const Board = () => {

    const [cells, setCells] = React.useState(9)
    const [board, setBoard] = React.useState(Array(cells).fill(''));
    const [turn, setTurn] = React.useState('X');
    const [winner, setWinner] = React.useState('')


    // Вызывается при изменении board
    React.useEffect(() => {
        const winFor3 = [
            // rows
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            // columns
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            //diagonals
            [0, 4, 8],
            [2, 4, 6]
        ]

        const winFor4 = [
            // rows
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
            [12, 13, 14, 15],

            // columns
            [0, 4, 8, 12],
            [1, 5, 9, 13],
            [2, 6, 10, 14],
            [3, 7, 11, 15],

            //diagonals
            [0, 5, 10, 15],
            [3, 6, 9, 12]
        ]

        let winningPositions = []

        winningPositions = (cells === 9 ? winningPositions = winFor3 : winFor4)

        let winningPositionIndex = 0
        let newWinner = null
        while (winningPositionIndex < winningPositions.length && !newWinner) {
            const boardPositionToCheck = winningPositions[winningPositionIndex]
            const boardValuesToCheck = boardPositionToCheck.map(index => board[index])
            const chekingValue = boardValuesToCheck[0]
            const isFinished = boardValuesToCheck.every((value) => value === chekingValue && chekingValue)
            newWinner = isFinished ? chekingValue : null
            winningPositionIndex++
        }
        if (newWinner) {
            setWinner(newWinner === 'X' ? 'X' : 'O')
        }
    }, [board, cells])

    const handleClick = (index) => {
        if (cells < index < 0 || board[index] || winner) return
        const newBoard = [...board]
        newBoard.splice(index, 1, turn)
        setBoard(newBoard)
        const newTurn = turn === 'X' ? 'O' : 'X'
        setTurn(newTurn)
    };

    const handleRestart = (cellsNum) => {
        setTurn('X')
        setWinner('')
        setBoard(Array(cellsNum === cells ? cells : cellsNum).fill(''))
        setCells(cellsNum === cells ? cells : cellsNum)

        // Передаем сторону доски в css
        let side = Math.sqrt(cellsNum);
        document.querySelector('.board').style.setProperty('--side', side);
    };
    
    return (
        <div className='game'>
            {winner && <h2 className='winner'>Победитель: {winner}</h2>}
            {!winner && <h3>Ход: {turn}</h3>}
            <div className='board'>
                {
                    board.map( (elem, index) => (
                        <Square key={index} value={elem} index={index} handleClick={handleClick}/>
                    ))
                }
            </div>
            <button className='repeater' onClick={() => handleRestart(cells)}>Начать заново</button>
            <div className='side'>
                Или выберите сторону игрового поля:<br/>
                <div className='buttons'>
                    <button className='reset3' type="button" onClick={() => handleRestart(9)} id="btn3">3x3</button>
                    <button className='reset4' type="button" onClick={() => handleRestart(16)} id="btn4">4x4</button>
                </div>
            </div>
        </div>
    )
}

export default Board