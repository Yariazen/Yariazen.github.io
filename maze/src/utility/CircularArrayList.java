package utility;

import java.util.Arrays;

public class CircularArrayList<T> implements Stack<T>, Queue<T>{
	int size;
	int head;
	int tail;
	T[] array;
	
	public CircularArrayList() {
		size = 0;
		head = tail = 0;
		try{
			array = (T[]) new Object[size];
		} catch(ClassCastException e){
			System.err.println(e);
		}
		
	}
	
	public String toString() {
		return Arrays.toString(array);
	}

	public void enqueue(T e) {
		T[] linkLast = Arrays.copyOf(array, array.length+1);
		linkLast[array.length] = e;
		array = linkLast;
		size++;
	}

	public T dequeue() throws IndexOutOfBoundsException {
		T head = array[0];
		T[] tempArray = (T[]) new Object[array.length-1];
		for(int i=0; i<size; i++) {
			if(i!=0)
				tempArray[i-1] = array[i];
		}
		array = tempArray;
		size--;
		return head;
	}

	public void push(T e) {
		T[] tempArray = array;
		T[] newArray = (T[]) new Object[size+1];
		newArray[0] = e;
		for(int i=1; i<size+1; i++) {
			newArray[i] = tempArray[i-1];
		}
		array = newArray;
		size++;
	}

	public T pop() throws IndexOutOfBoundsException {
		T head = array[0];
		T[] tempArray = (T[]) new Object[array.length-1];
		for(int i=0; i<size; i++) {
			if(i!=0)
				tempArray[i-1] = array[i];
		}
		array = tempArray;
		size--;
		return head;
	}

	public T peek() throws IndexOutOfBoundsException {
		return array[0];
	}

	public int size() {
		return size;
	}
	
	public boolean isEmpty() {
		return (size == 0);
	}
}
