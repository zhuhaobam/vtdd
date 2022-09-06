---
title: 依赖
breadcrumb: md.md
noi18n: yes
icon: file-markdown-filled
sort: 4
padding: 0
---

<anchor-md-script>

<div style="display: none;">

[TOC]

</div>

# 依赖注入

### 依赖注入 (DI) 是一个过程，其中对象仅通过构造函数参数、工厂方法的参数或对象实例在构造或从工厂方法返回。然后容器在创建 bean 时注入这些依赖项。<br/>这个过程基本上是 bean 本身通过使用直接构造类或服务定位器模式来控制其依赖项的实例化或位置的逆过程（因此称为控制反转）。

### 使用 DI 原则，代码更干净，当对象具有依赖关系时，解耦更有效。对象不查找其依赖项，也不知道依赖项的位置或类别。结果，您的类变得更容易测试，<br/> 特别是当依赖关系在接口或抽象基类上时，它们允许在单元测试中使用存根或模拟实现。

## DI 存在两个主要变体：基于构造函数的依赖注入和基于 Setter 的依赖注入。

# 基于构造函数的依赖注入

### 提倡构造函数注入，因为它允许您将应用程序组件实现为不可变对象，并确保所需的依赖项不是 null.<br/>此外，构造函数注入的组件总是以完全初始化的状态返回给客户端（调用）代码。<br/>大量的构造函数参数是一种不好的代码气味，这意味着该类可能有太多的职责，应该重构以更好地解决适当的关注点分离。

### 基于构造函数的 DI 是通过容器调用具有多个参数的构造函数来完成的，每个参数代表一个依赖项。调用 static 带有特定参数的工厂方法来构造 bean 几乎是等价的，<br/>本次讨论将类似地对待构造函数和 static 工厂方法的参数。以下示例显示了一个只能通过构造函数注入进行依赖注入的类：

```java
public class SimpleMovieLister {

    // SimpleMovieLister依赖于MovieFinder
    private final MovieFinder movieFinder;

    // 构造函数，以便Spring容器可以注入MovieFinder
    public SimpleMovieLister(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // 省略了实际使用注入的MovieFinder的业务逻辑...
}
```

### 构造函数参数名称进行值消歧，可以使用 @ConstructorProperties JDK 注释显式命名构造函数参数。示例类必须如下所示：

```java
package examples;

public class ExampleBean {

     // 年数
    private final int years;

    // 最后的的答案
    private final String ultimateAnswer;

    @ConstructorProperties({"years", "ultimateAnswer"})
    public ExampleBean(int years, String ultimateAnswer) {
        this.years = years;
        this.ultimateAnswer = ultimateAnswer;
    }
}
```

# 基于 Setter 的依赖注入

### Setter 注入应该主要仅用于可以在类中分配合理默认值的可选依赖项。否则，必须在代码使用依赖项的任何地方执行非空检查。<br/>setter 注入的一个好处是 setter 方法使该类的对象可以在以后重新配置或重新注入

### 基于 Setter 的 DI 是通过容器在调用无参数构造函数或无参数 static 工厂方法来实例化 bean 后调用 bean 上的 setter 方法来完成的。

### 以下示例显示了一个只能通过使用纯 setter 注入进行依赖注入的类。这个类是传统的 Java。它是一个 POJO，不依赖于容器特定的接口、基类或注释。

```java
public class SimpleMovieLister {

    // SimpleMovieLister依赖于MovieFinder
    private MovieFinder movieFinder;

    // setter方法，以便Spring容器可以注入MovieFinder
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // 省略了实际使用注入的MovieFinder的业务逻辑...
}
```

# 依赖解决过程

## 容器执行 bean 依赖解析如下：

- 使用 ApplicationContext 描述所有 bean 的配置元数据创建和初始化。配置元数据可以由 XML、Java 代码或注释指定。

- 对于每个 bean，其依赖关系以属性、构造函数参数或静态工厂方法的参数的形式表示（如果您使用它而不是普通的构造函数）。这些依赖项在实际创建 bean 时提供给 bean。

- 每个属性或构造函数参数都是要设置的值的实际定义，或者是对容器中另一个 bean 的引用。

- 作为值的每个属性或构造函数参数都从其指定格式转换为该属性或构造函数参数的实际类型。默认情况下，Spring 可以将以字符串格式提供的值转换为所有内置类型，例如 int, long, String,boolean 等。

### Spring 容器在创建容器时验证每个 bean 的配置。但是，在实际创建 bean 之前，不会设置 bean 属性本身。<br/>在创建容器时会创建单例范围并设置为预实例化（默认）的 Bean。范围在 Bean Scopes 中定义。否则，只有在请求时才会创建 bean。<br/>创建 bean 可能会导致创建 bean 图，因为 bean 的依赖项及其依赖项的依赖项（等等）被创建和分配。<br/>请注意，这些依赖项之间的解析不匹配可能会出现较晚 - 即在第一次创建受影响的 bean 时。

## 循环依赖

### 一种可能的解决方案是编辑某些类的源代码以由设置器而不是构造器配置。或者，避免构造函数注入并仅使用 setter 注入。<br/>也就是说，虽然不推荐，但是可以通过 setter 注入来配置循环依赖。

</anchor-md-script>
