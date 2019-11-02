package utility;
public interface List<T>{

    public T get(int i) throws IndexOutOfBoundsException;

    public T set(int i, T e) throws IndexOutOfBoundsException;

    public void add(int i, T e) throws IndexOutOfBoundsException;

    public T remove(int i)   throws IndexOutOfBoundsException;

    public int size();
    
    public boolean isEmpty();
}
