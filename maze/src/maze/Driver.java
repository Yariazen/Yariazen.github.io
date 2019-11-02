package maze;	

import utility.StdDraw;

public class Driver {

	public static void main(String[] args) {		
		StdDraw.setCanvasSize(900, 900);
		StdDraw.enableDoubleBuffering();
		MazeMethods maze = new MazeMethods(50, 50);
		
		long Start = System.nanoTime();
		maze.Maze();
		long End = System.nanoTime();

		long time = End - Start;
		double timeInSec = time / 1e9;
		
		System.out.println("Maze");
		System.out.println("Time Taken: "+timeInSec);
	}
}
