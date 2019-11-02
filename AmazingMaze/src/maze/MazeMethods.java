package maze;

import java.util.concurrent.ThreadLocalRandom;

import utility.CircularArrayList;
import utility.Coord;
import utility.List;

public class MazeMethods {
	private Maze maze;
	private Coord start;
    private Coord end;
    
    public MazeMethods(int height, int width) {
    	this.maze = new Maze(height, width);
    	this.start = new Coord(0,0);
    	this.end = new Coord(height-1, width-1);
    }
    
    public void Maze() {
    	maze.removeWall(start, Maze.LEFT); 
	    maze.removeWall(end, Maze.RIGHT);
	    
	    CircularArrayList<Coord> stack = new CircularArrayList<Coord>();
	    stack.push(start);
	    maze.visit(start);
	    maze.drawBuildMazeInitial();
	    maze.drawBuildMaze(end);
	    while(!stack.isEmpty()) {
	    	Coord current = stack.pop();
	    	List<Coord> neighbors = maze.getUnvisitedNeighbors(current);
	    	int random = 0;
	    	if(neighbors.size() > 0) {
	    		random = ThreadLocalRandom.current().nextInt(0, neighbors.size());
	    		Coord next = neighbors.get(random);
	    		maze.visit(next);
	    		int direction = maze.getDirection(current, next);
	    		maze.removeWall(current, direction);
	    		maze.drawBuildMaze(current);
	    		stack.push(current);
	    		stack.push(next);
	    	}
	    }
	    
		maze.unvisitAll();
		CircularArrayList<Coord> queue = new CircularArrayList<Coord>();
		queue.enqueue(start);
		maze.visit(start);
		
		while(!queue.isEmpty()) {
			Coord current = queue.dequeue();
			maze.drawSolveMaze(current);
			if(current.equals(end)) {
				end = current;
				break;
			}
			List<Coord> neighbors = maze.getReachableUnvisitedNeighbors(current);
			for(int i=0; i<neighbors.size(); i++) {
	    		Coord next = neighbors.get(i);
	    		next.distance = current.distance + 1;
	    		queue.enqueue(next);
	    		maze.visit(next);
	    	}
		}
		maze.drawSolveMaze();
    }
}

