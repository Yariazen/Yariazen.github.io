package maze;
import java.awt.Color;

import utility.Coord;
import utility.LinkedList;
import utility.List;
import utility.StdDraw;

public class Maze {
	public static final int LEFT = 3;
	public static final int RIGHT = 1;
	public static final int UP = 0;
	public static final int DOWN = 2;
	
	private Space[][] map;
	private int width, height;
	
	public class Space{
		private boolean walls[];
		private Space neighbors[];
		private boolean visit;
		private int distance;
		private boolean path;
		
		private int row;
		private int col;
		
		public Space(int h, int w, int distance){
			walls =  new boolean[] {true,true,true,true};
		    neighbors = new Space[] {null,null,null,null};
		    visit = false;
		    this.distance = distance;
		    path = false;
		    
		    row = h;
		    col = w;
		}
		
		public Space(int h, int w) {
			this(h, w, 0);
		}
		
		public Coord toCoordinate()
		{
			return new Coord(row, col, distance);
		}
		
		public void setPath() {
			path = true;
		}
		
		public int getDistance() {
			return distance;
		}
		
		public void setDistance(int distance) {
			this.distance = distance;
		}
		
		public Space[] getNeighbors(){
			return neighbors;
		}
		
		public void setNeighbors(Space n[]){
			for(int i=0;i<4;i++)
				neighbors[i] = n[i];
		}

		public boolean isVisited(){
			return visit;
		}
		 
		public void setVisited(){
			visit=true;
		}
	
		public void setUnvisited(){
			visit=false;
		}

		public void removeWall(int direction){
			walls[direction]=false;
		    if(neighbors[direction] != null){
		    	neighbors[direction].removeWall( (direction+2) % 4, true);
		    }
		}

		private void removeWall(int direction, boolean first){
			walls[direction]=false;
		}

		public boolean hasWall(int direction){
			return walls[direction];
		}

		public boolean hasUpWall(){
			return walls[UP];
		}

		public boolean hasDownWall(){
			return walls[DOWN];
		}

		public boolean hasLeftWall(){
		    return walls[LEFT];
		}

		public boolean hasRightWall(){
		    return walls[RIGHT];
		}

		public int numWalls(){
		    int n=0;
		    for(int i=0;i<4;i++)
		      if(walls[i])
		        n++;
		    return n;
		}
		
		public boolean[] walls() {
			return walls;
		}
	}
	
	public Maze(int height, int width){
		if (height<=0)
			throw new IllegalArgumentException("height must be positive. Entered: "+height);
	    if (width<=0)
	    	throw new IllegalArgumentException("width must be positive. Entered: "+width);

	    map = new Space[height][width];
	    this.height = height;
	    this.width = width;

	    setupMap();
	}

	private void setupMap(){
		int scale = 0;
		if(width > height)
			scale = width;
		else
			scale = height;
		StdDraw.setXscale(0, scale+2);
		StdDraw.setYscale(0, scale+2);
		for(int h=0;h<height;h++)
			for(int w=0;w<width;w++)
				map[h][w] = new Space(h,w);

	    for(int h=0;h<height;h++){
	    	for(int w=0;w<width;w++){
	    		Space neighbors[] = new Space[4];

	    		neighbors[0] = h-1 >= 0 ? map[h-1][w] : null;
	    		neighbors[2] = h+1 < height ?  map[h+1][w] : null;

	    		neighbors[3] = w-1 >= 0 ? map[h][w-1] : null;
	    		neighbors[1] = w+1 < width ? map[h][w+1] : null;

	        map[h][w].setNeighbors(neighbors);
	    	}
	    }
	}
	
	public Space[][] getMap(){
		return map;
	}

	public int getHeight(){
		return height;
	}

	public int getWidth(){
	    return width;
	}

	public void removeWall(Coord coord, int direction){
	    removeWall(coord.row,coord.col,direction);
	}
	
	private void removeWall(int row, int col, int direction){
	    map[row][col].removeWall(direction);
	}

	private void visit(int row, int col){
	    map[row][col].setVisited();
	}

	public void visit(Coord coord){
	    visit(coord.row,coord.col);
	    
	    map[coord.row][coord.col].setDistance(coord.distance + 1);
	}
	
	public void unvisitAll(){
		for(int h=0;h<height;h++){
			for(int w=0;w<width;w++){
				map[h][w].setUnvisited();
			}
	    }
	}

	private boolean isVisited(Coord coord){
		return map[coord.row][coord.col].isVisited();
	}

	public List<Coord> getNeighbors(Coord coord){
		List<Coord> list = new LinkedList<Coord>();
	    int row=coord.row;
	    int col=coord.col;

	    Space[] neighbors = map[coord.row][coord.col].getNeighbors();

	    for(int i=0;i<neighbors.length;i++){
	    	if(neighbors[i] != null){
	    		if(i == UP)
	    			list.add(list.size(), new Coord(row-1,col));
	    		if(i == DOWN)
	    			list.add(list.size(), new Coord(row+1,col));
	    		if(i == RIGHT)
	    			list.add(list.size(), new Coord(row,col+1));
	    		if(i == LEFT)
	    			list.add(list.size(), new Coord(row,col-1));
	    	}
	    }
	    return list;
	}
	
	public List<Coord> getReachableVisitedNeighbors(Coord coord){
		int row=coord.row;
	    int col=coord.col;
	    List<Coord> list = new LinkedList<Coord>();
	    Space[] neighbors = map[row][col].getNeighbors();

	    for(int i=0;i<neighbors.length;i++){
	    	if(neighbors[i] != null && neighbors[i].isVisited()){
	    		Coord c = null;
	    		if(i == UP  && ! map[row][col].hasUpWall() ){
	    			c = new Coord(row-1,col);
	    		} else if(i == DOWN && ! map[row][col].hasDownWall() ){
	    			c = new Coord(row+1, col);
	    		} else if(i == RIGHT  && ! map[row][col].hasRightWall() ){
	    			c = new Coord(row,col+1);
	    		} else if(i == LEFT  && ! map[row][col].hasLeftWall() ){
	    			c = new Coord(row,col-1);
	    		}

	    		if( c != null)
	    			list.add(list.size(),c);
	    	}
	    }
	    return list;
	}

	public List<Coord> getUnvisitedNeighbors(Coord coord){
	    List<Coord> list = new LinkedList<Coord>();
	    int row=coord.row;
	    int col=coord.col;

	    Space[] neighbors = map[row][col].getNeighbors();

	    for(int i=0;i<neighbors.length;i++){
	    	if(neighbors[i] != null && ! neighbors[i].isVisited()){
	    		Coord c = null;
	    		if(i == UP){
	    			c = new Coord(row-1,col);
	    		} else if(i == DOWN){
	    			c = new Coord(row+1, col);
	    		} else if(i == RIGHT){
	    			c = new Coord(row,col+1);
	    		} else if(i == LEFT){
	    			c = new Coord(row,col-1);
	    		}

	    		if(c!= null)
	    			list.add(list.size(),c);
	    	}
	    }
	    return list;
	}

	public List<Coord> getReachableUnvisitedNeighbors(Coord coord){
	    int row=coord.row;
	    int col=coord.col;
	    List<Coord> list = new LinkedList<Coord>();
	    Space[] neighbors = map[row][col].getNeighbors();

	    for(int i=0;i<neighbors.length;i++){
	    	if(neighbors[i] != null && ! neighbors[i].isVisited()){
	    		Coord c = null;
	    		if(i == UP  && ! map[row][col].hasUpWall() ){
	    			c = new Coord(row-1,col);
	    		} else if(i == DOWN && ! map[row][col].hasDownWall() ){
	    			c = new Coord(row+1, col);
	    		} else if(i == RIGHT  && ! map[row][col].hasRightWall() ){
	    			c = new Coord(row,col+1);
	    		} else if(i == LEFT  && ! map[row][col].hasLeftWall() ){
	    			c = new Coord(row,col-1);
	    		}

	    		if( c != null)
	    			list.add(list.size(),c);
	    	}
	    }
	    return list;
	}
	
	public int getDirection(Coord current, Coord next) {
		int x1 = current.getX();
		int x2 = next.getX();
		int y1 = current.getY();
		int y2 = next.getY();
		
		int deltaX = x1-x2;
		int deltaY = y1-y2;
		
		if(deltaX == 1)
			return Maze.LEFT;
		if(deltaX == -1)
			return Maze.RIGHT;
		if(deltaY == 1)
			return Maze.UP;			
		if(deltaY == -1)
			return Maze.DOWN;
		return -1;
	}
	
	public Coord getPathToStart(Coord coord)
	{
		Space[] neighbors = map[coord.row][coord.col].getNeighbors();
		
		Coord nextStep = null;
		
		for (int i = 0; i < neighbors.length; i++)
		{
			if (neighbors[i] != null)
			{
				Coord temp = neighbors[i].toCoordinate();
				
				if (coord.distance - temp.distance == 1)
				{
					nextStep = temp;
					break;
				}
			}
		}
		
		return nextStep;
	}
	
	public String toString() {
		StringBuilder builder = new StringBuilder();
		for(int i=0; i<height; i++) {
			builder.append("[");
			for(int h=0; h<width; h++) {
				boolean visited = isVisited(new Coord(i, h));
				if(visited)
					builder.append("1");
				else
					builder.append("0");
				builder.append(", ");
			}
			builder.append("]\n");
		}
		return builder.toString();
	}
	
	public void test() {
		removeWall(0, 0, 1);
		System.out.println(map[0][0].hasRightWall());
		System.out.println(map[0][1].hasLeftWall());
	}
	
	public void drawBuildMazeInitial() {
		StdDraw.clear();
		StdDraw.setPenColor(StdDraw.BLACK);
        for (int y = 0; y <= height; y++)
            StdDraw.line(1, y+1, width+1, y+1);
        for (int x=0; x<=width; x++)
        	StdDraw.line(x+1, 1, x+1, height+1);
        //StdDraw.pause(100);
        StdDraw.show();
	}
	
	public void drawBuildMaze(Coord current) {
		StdDraw.setPenColor(StdDraw.WHITE);
		for(int i=0; i<4; i++) {
			int y = current.row;
			int x = current.col;
			boolean[] wall = map[y][x].walls();
			switch(i) {
				case 0:
					if(!wall[2])
						StdDraw.line(x+1, height-y, x+2, height-y);
					break;
				case 1:
    				if(!wall[1])
    					StdDraw.line(x+2, height-y, x+2, height-y+1);
    				break;
    			case 2:
    				if(!wall[0])
    					StdDraw.line(x+1, height-y+1, x+2, height-y+1);
    				break;
    			case 3:
    				if(!wall[3])
    					StdDraw.line(x+1, height-y, x+1, height-y+1);
    				break;
			}
		}
        //StdDraw.pause(100);
        StdDraw.show();
	}
	
	public void drawSolveMaze() {
		StdDraw.setPenColor(StdDraw.GREEN);
		for(int y=0; y<height; y++){
			for(int x=0; x<width; x++) {
				if(map[y][x].path)
					StdDraw.filledCircle(x+1.5, height+.5-y, .25);
			}
		}
		StdDraw.show();
	}
	
	public void drawSolveMaze(Coord current, Color color) {
		StdDraw.setPenColor(color);
		StdDraw.filledCircle(current.col+1.5, height+.5-current.row, .25);
		//StdDraw.pause(100);
		StdDraw.show();
	}
	
	public void drawSolveMaze(Coord current) {
		drawSolveMaze(current, StdDraw.RED);
	}
}
