package utility;
public class LinkedList<T> implements List<T>,Queue<T>,Stack<T>{

	private class Node{
		private T data;
		private Node next, prev;
		
		public Node(T t) {
			data = t;
		}
		
		public void setNext(Node n) {
			next = n;
		}
		
		public void setData(T t) {
			data = t;
		}
		
		public Node getNext() {
			return next;
		}
		
		public T getData() {
			return data;
		}
		
		@SuppressWarnings("unused")
		public Node getPrev() {
			return prev;
		}
		
		public void setPrev(Node n) {
			prev = n;
		}
	}

	private Node head;
	private Node tail;
	private int size;
	
	public LinkedList(){
		head=null;
		tail=null;
		size=0;
	}

	public T get(int i){
		return get(head,i);
	}
  
	public T set(int i, T e){
		return set(head,i,e);
	}
  
	public void add(int i, T e){
		head = add(head,i,e);
		if (tail==null)
			tail=head;
		size++;
	}

	public T remove(int i){
		T data = get(i);
		head = remove(head,i);
		if (head==null)
			tail=null;
		size--;
		return data;
	}

	public int size(){
		return size;
	}

	public String toString(){
		return "["+toString(head)+" ]";
	}

	private T get(Node n, int i){
		if( i < 0)
			throw new IndexOutOfBoundsException();
		if(n==null)
			throw new IndexOutOfBoundsException();
		if(i==0)
			return n.getData();
		return get(n.getNext(),i-1);
	}

	private T set(Node n, int i, T e){
		if( i < 0)
			throw new IndexOutOfBoundsException();
		if(n==null)
			throw new IndexOutOfBoundsException();
		if(i==0) {
			n.setData(e);
			return e;
		}
		return set(n.getNext(),i-1,e);
	}

	private Node add(Node n, int i, T e){
		if( i < 0)
			throw new IndexOutOfBoundsException();
		if(n==null && i > 0)
			throw new IndexOutOfBoundsException();
		if(i==0){
			Node newNode = new Node(e);
			newNode.setNext(n);
			if (n==null)
				tail=newNode;
			return newNode;
		}
		n.setNext(add(n.getNext(),i-1,e));
		return n;
	}

	private Node remove(Node n, int i){
		if( i < 0)
			throw new IndexOutOfBoundsException();
		if(n==null)
			throw new IndexOutOfBoundsException();
		if(i==0)
			return n.getNext();
		n.setNext(remove(n.getNext(),i-1));
		if (n.getNext()==null)
			tail=n;
		return n;
	}

	private String toString(Node n){
		if(n==null) 
			return "";
		if(n==head)
			return ""+n.getData().toString()+toString(n.getNext());
		return ", "+n.getData().toString()+toString(n.getNext());
	}

	public void push(T e){
		Node node = new Node(e);
		
		if(isEmpty()) {
			head = tail = node;
		} else if(head == tail) {
			head.setNext(node);
			tail = node;
			tail.setPrev(head);
		} else {
			Node temp = tail;
			tail = node;
			temp.setNext(tail);
			tail.setPrev(temp);
		}	
		size++;
	}
	
	public T pop() throws IndexOutOfBoundsException{ 
		Node temp = head;
		remove(0);
		return temp.getData();
	}

	public void enqueue(T e){
		Node node = new Node(e);
		
		if(isEmpty()) {
			head = tail = node;
		} else if(head == tail) {
			head.setNext(node);
			tail = node;
			tail.setPrev(head);
		} else {
			Node temp = tail;
			tail = node;
			temp.setNext(tail);
			tail.setPrev(temp);
		}	
		size++;
	}
	
	public T dequeue() throws IndexOutOfBoundsException{
		Node temp = head;
		remove(0);
		return temp.getData();
	}

	public T peek() throws IndexOutOfBoundsException{
		return head.getData();
	}

	public boolean isEmpty() {
		return (head == null);
	}
}

