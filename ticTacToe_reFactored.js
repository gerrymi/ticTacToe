var winner, turn, round, board, players, currentPlayer, draw, winConditions

init()
reset()

function init() {
	turn = 1
	round = 0
	players = [
		{symbol: 'O', fa:'fa-circle-o', score: 0},
		{symbol: 'X', fa:'fa-times', score: 0},
		{symbol: 'draw', fa:'fa-minus-square', score: 0}
	]
	currentPlayer = () => players[(turn + round - 1) % 2] 
	draw = players[2] 
	winConditions = [
		[0,1,2], [3,4,5], [6,7,8],
		[0,3,6], [1,4,7], [2,5,8],
		[0,4,8], [2,4,6]
	]	
}

function reset() {
	winner = false
	turn = 1
	round++
	board = ['_', '_', '_', '_', '_', '_', '_', '_', '_']
	for(i = 0; i < board.length; i++) {
		document.getElementsByClassName("block")[i].getElementsByTagName('i')[0].className = "fa " + draw.fa
	}
	document.getElementById('turn').className = currentPlayer().symbol
	document.getElementById('turn-symbol').className = 'fa ' + currentPlayer().fa
	document.getElementById('alert').className = 'alert-off'
}

function play(move) {
	
	if (board[move] === '_') {
		board[move] = currentPlayer()
		document.getElementsByClassName("block")[move].getElementsByTagName('i')[0].className = currentPlayer().symbol + ' fa ' + currentPlayer().fa
		
		if (winCheck(currentPlayer(), move)) {
			renderResults(winner)
		} else if (turn < 9) {
			turn++
			document.getElementById('turn').className = currentPlayer().symbol
			document.getElementById('turn-symbol').className = 'fa ' + currentPlayer().fa
		} else {
			renderResults(draw, 'DRAW!')
		}

	} else {
		console.log('You can\'t do that!\n')
		// To Do: Add Shake Animation
	}

	function winCheck(player, move) {
		if (turn > 4) return checkConditions(player, winConditions)
		function checkConditions(player, checks) {
			checks.forEach(c => {
				if (board[c[0]] === player &&
					board[c[1]] === player &&
					board[c[2]] === player) winner = player
			})
			return winner
		}
	}
	
	function renderResults(result, resText) {
		var resText = resText || 'WINS!'
		document.getElementById('winner').className = result.symbol + ' fa ' + result.fa
		document.getElementById('alert-text').innerHTML = resText
		document.getElementById('alert').className = 'alert-on'
		result.score++
		document.getElementById(result.symbol).innerHTML = result.score
	}
	
}