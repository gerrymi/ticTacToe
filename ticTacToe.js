var winner = false
var turn = 1 
var round = 1 
var board = ['_', '_', '_', '_', '_', '_', '_', '_', '_']
var players = [
	{symbol: 'O', fa:'fa-circle-o', score: 0},
	{symbol: 'X', fa:'fa-times', score: 0},
	{symbol: '-', fa:'fa-minus-square', score: 0}
]
var player = s => players[(turn + round - 1)% 2] 
var draw = players[2] 
var winConditions = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]
]
var applicableConditions = move => {
	return winConditions.filter(x => {
		var apply = false
		x.filter(y => {
			if (y === move) apply = true
		})
		return apply
	})
}
var checkConditions = (player, checks) => {
	checks.forEach(c => {
		if (board[c[0]] === player && board[c[1]] === player && board[c[2]] === player) winner = player
	})
	return winner
}
var winCheck = (player, move) => {
	if (turn > 4) return checkConditions(player, applicableConditions(move))
}
var play = p => {
	if (board[p] === '_') {
		board[p] = player().symbol
		document.getElementsByClassName("block")[p].getElementsByTagName('i')[0].className = player().symbol + ' fa ' + player().fa
		if (winCheck(player().symbol,p)) {
			document.getElementById('winner').className = player().symbol + ' fa ' + player().fa
			document.getElementById('alert-text').innerHTML = 'WINS!'
			document.getElementById('alert').className = 'alert-on'
			player().score++
			document.getElementById(player().symbol).innerHTML = player().score
		} else if (turn < 9) {
			turn++
			document.getElementById('turn').className = player().symbol
			document.getElementById('turn-symbol').className = 'fa ' + player().fa
		} else {
			document.getElementById('winner').className = 'fa fa-minus-square'
			document.getElementById('alert-text').innerHTML = 'DRAW!'
			document.getElementById('alert').className = 'alert-on'
			draw.score++
			document.getElementById('draw').innerHTML = draw.score
		}
	} else {
		console.log('You can\'t do that!\n')
	}
}
var reset = x => {
	winner = false
	turn = 1
	round++
	document.getElementById('turn').className = player().symbol
	document.getElementById('turn-symbol').className = 'fa ' + player().fa
	board = ['_', '_', '_', '_', '_', '_', '_', '_', '_']
	for(i = 0; i < board.length; i++) {
		document.getElementsByClassName("block")[i].getElementsByTagName('i')[0].className = "fa " + draw.fa
	}
	document.getElementById('alert').className = 'alert-off'
}