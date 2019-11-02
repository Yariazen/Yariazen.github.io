package utility;
public interface Queue<T>{

  public void enqueue(T e);

  public T dequeue() throws IndexOutOfBoundsException;

  public T peek() throws IndexOutOfBoundsException;

  public int size();

}
