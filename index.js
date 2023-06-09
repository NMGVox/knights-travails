const gameBoard = (function() {
    spaces= [...Array(8)].map(e => Array(8));

    function isValidMove(newPos) {
        if(newPos[0] > spaces.length || newPos[0] < 0) {
            return false;
        } else if ( newPos[1] > spaces[0].length || newPos[1] < 0 ) {
            return false;
        }
        return true;
    }

    return {
        spaces
    };
})();

function knightFactory(start, end) {
    let initialPos = start;
    let endPos = end;
    let queue = [];
    let moves = [[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,1]];

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

    return {
        initialPos,
        endPos,
        queue,
        moves,
        addPossibleMove,
        wasNotVisited,
        nextNode
    }
}

function nodeFactory( curr, prev ) {
    let position = curr;
    let visited = prev.append(position);

    return {
        position,
        visited,
        wasNotVisited
    }
}

let newKnight = knightFactory([3,4]);
newKnight.addPossibleMove([4,6]);
newKnight.addPossibleMove([5,8]);
newKnight.addPossibleMove([7,7]);

console.log(newKnight.queue);

newKnight.nextNode();
newKnight.nextNode();

console.log(newKnight.queue);