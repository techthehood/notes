# Java notes

## Articles
[Java tutorial for beginners [2020]](https://youtu.be/eIrMbAQSU34)   

#### [understanding Arrays.asList](https://www.tutorialspoint.com/java/util/arrays_aslist.htm)   
#### [Java API docs](https://docs.oracle.com/javase/8/docs/api/)   
#### [Java in Visual Studio Code](https://code.visualstudio.com/docs/languages/java)   
#### [The Structure of a Method](https://www.homeandlearn.co.uk/java/java_methods.html)   
#### [Java tutorial and reference | w3schools](https://www.w3schools.com/java/)   



```
  import java.util.*;

  public class Main { 
    public static void main(String[] args) { 
      // create an array of strings
        String a[] = new String[]{"abc","klm","xyz","pqr"};
        
        for(String x: a) System.out.println("a:" + x);

        List list1 = Arrays.asList(a);
        //Arrays.toString(a);// also works to show array
        System.out.println("a:" + Arrays.toString(a));

        // printing the list
        System.out.println("The list is:" + list1);
    } 
  }

  // returns
  // a:abc
  // a:klm
  // a:xyz
  // a:pqr
  // The list is:[abc, klm, xyz, pqr]
```
> without array as list you couldn't print out a view of the array without iterating through each index

```
  String a[] = new String[]{"abc","klm","xyz","pqr"};
      
  System.out.println("a:" + a);

  // returns a:[Ljava.lang.String;@5b2133b1
```
> otherwise it returns a strange output which is likely an error

#### Arrays.copyOf - what if you want to copy all the values? 
>do you need to do ary.length for the 2nd argument

```
  int a6[] = {1,2,3};
  int a7[] = Arrays.copyOf(a6,3);
```

# Exploring ArrayList

```
  import java.util.*;

  public class Main { 
    public static void main(String[] args) { 
      ArrayList<String> aL1 = new ArrayList<String>();
      // ArrayList<String> aL1 = new ArrayList<>();// still worked without the 2nd <String> type
      aL1.add("Sue");
      aL1.add("Bird");
      // aL1.remove("sue");// there is no lowercase sue
      // System.out.println(Arrays.toString(aL1));// returns an error
      System.out.println(Arrays.asList(aL1));
    } 
  }

  // returns: [[Sue, Bird]]
```
> im not sure why there are brackets around the output (and especially not double brackets)

> Array list ends @ 36:59 - next LinkedList

#### return a list of differnt types

_Main.java_

```
import java.util.*;

public class Main { 

  static List<Object> getRandList(){
    String name = "Derek";
    int age = 44;
    return Arrays.asList(name,age);
  }
      
  public static void main(String[] args) { 
      List<Object> randList = getRandList();
      System.out.println(randList);
  } 
}

```
> I tried to change the class name to public class HelloWorld {
> GOTCHA: Main.java:3: error: class HellowWorld is public, should be declared in a file named HellowWorld.java

### full class examples
_Main.java_

```
  // Code from filename: Main.java
  // abstract class
  abstract class Main {
    private String fname = "John";
    public int age = 24;
    public abstract void study(); // abstract method

    public String getName(){
      return fname;
    }
  }

  // Subclass (inherit from Main)
  class Student extends Main {
    public int graduationYear = 2018;
    public void study() { // the body of the abstract method is provided here
      System.out.println("Studying all day long");
    }
  }
  // End code from filename: Main.java
```
_Second.java_

```
  // Code from filename: Second.java
  class Second {
    public static void main(String[] args) {
      // create an object of the Student class (which inherits attributes and methods from Main)
      Student myObj = new Student();

      // System.out.println("Name: " + myObj.fname);// returns error
      System.out.println("Name: " + myObj.getName());
      System.out.println("Age: " + myObj.age);
      System.out.println("Graduation Year: " + myObj.graduationYear);
      myObj.study(); // call abstract method
    }
  }
```

### [using and creating java packages](https://www.w3schools.com/java/java_packages.asp)   

```
  package mypack;
  class MyPackageClass {
    public static void main(String[] args) {
      System.out.println("This is my package!");
    }
  }
```

>Save the file as MyPackageClass.java, and compile it:
```
  $ javac MyPackageClass.java
```

> Then compile the package:
```
  $ javac -d . MyPackageClass.java
```

> This forces the compiler to create the "mypack" package.

> The -d keyword specifies the destination for where to save the class file. You can use any directory name, like c:/user (windows), or, if you want to keep the package within the same directory, you can use the dot sign ".", like in the example above.

> Note: The package name should be written in lower case to avoid conflict with class names.

> NOTE: This looks like something i can't just do on the fly like i attempted above

#### scope

```
  public class Main
  {
      int a = 10;
      public Main()
      {
          //int a = 20;
          System.out.println(a); // prints 20
          System.out.println(this.a); // prints the "a" defined in the class. In this case, 10
      }

      public static void main(String[] args)
      {
          Main myTest = new Main();
          System.out.println(myTest.a);
      }
  }
```
> returns 20 10 10 if int a = 20 isn't commented out
> otherwise returns 10 10 10