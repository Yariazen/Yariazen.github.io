package utility;
public interface Stack<T>{

  public void push(T e);
  
  public T pop() throws IndexOutOfBoundsException;

  public T peek() throws IndexOutOfBoundsException;

  public int size();    
  
}
