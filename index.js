const gameBoard = (function() {
    spaces= [...Array(8)].map(e => Array(8));

    function isValidMove(newPos) {
        if(newPos[0] > spaces.length - 1 || newPos[0] < 0) {
            return false;
        } else if ( newPos[1] > spaces[0].length - 1|| newPos[1] < 0 ) {
            return false;
        }
        return true;
    }

    return {
        spaces,
        isValidMove
    };
})();

function knightFactory(start, end) {
    let initialPos = start;
    let endPos = end;
    let queue = [];
    let moves = [[2,1], [1,2], [-2,1], [-1,2], [2,-1], [1,-2], [-2,-1], [-1,-2]];

    function addPossibleMove (node) {
        queue.push(node);
        return;
    }

    function nextNode () {
        return queue.shift();
    }

    function wasNotVisited(node, newPos) {
        //Pass the CURRENT node, and the new position FROM the current node.
        return node.visited.includes(newPos) ? false : true;
    }

    function travailsHelper() {
        let curr = nodeFactory(initialPos, []);
        while( curr !== null ) {
            if( curr.position[0] === endPos[0] &&  curr.position[1] === endPos[1]) {
                console.log(curr);
                return curr;
            }
            moves.forEach(move => {
                let newPos = [(curr.position[0] + move[0]),(curr.position[1] + move[1])]
                if(!gameBoard.isValidMove(newPos) || !wasNotVisited(curr, newPos)) {
                    return;
                }
                let newNode = nodeFactory(newPos, curr.visited);
                addPossibleMove(newNode); 
            });
            curr = nextNode();
        }
    }

    function travails() {
        let result = travailsHelper();
        console.log(`You made it in ${result.visited.length - 1} moves! Check 'em out:`);
        result.visited.forEach(space => {
            console.log(space);
        })
    }

    return {
        initialPos,
        endPos,
        queue,
        moves,
        addPossibleMove,
        nextNode,
        travails
    }
}

function nodeFactory( curr, prev ) {
    let position = curr;
    let visited = prev.concat([position]);

    return {
        position,
        visited,
    }
}

let newKnight = knightFactory([3,3], [4,3]);

newKnight.travails();