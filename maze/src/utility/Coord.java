package utility;

public class Coord {
	public final int row;
	public final int col;
	public boolean path;
	public int distance;

	public Coord (int row, int col, int distance) {
		this.row=row;
		this.col=col;
		this.path = false;
		this.distance = distance;
	}
	
	public Coord (int row, int col) {
		this(row, col, 0);
	}
	
	public void setPath() {
		path = true;
	}
	
	public void removePath() {
		path = false;
	}
	
	public String toString() {
		return "("+row+","+col+")";
	}

	public boolean equals(Object o) {
		if (o instanceof Coord) {
			Coord other = (Coord)o;
			return (row==other.row) && (col==other.col);
		}
		return false;
	}
	
	public int getY() {
		return row;
	}
	
	public int getX() {
		return col;
	}
}
