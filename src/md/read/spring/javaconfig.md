---
title: Java配置
breadcrumb: md.md
noi18n: yes
icon: file-markdown-filled
sort: 3
padding: 0 210px 40px 40px
---

<anchor-md-script>

<div style="display: none;">

[TOC]

</div>

# 基本概念：@Bean 和@Configuration

`class Demo { };`{language=java}

Spring 新的 Java 配置支持中的核心工件是带 @Configuration 注释的类和带@Bean 注释的方法。<br/>
@Bean 注解用于表示一个方法实例化、配置和初始化一个由 Spring IoC 容器管理的新对象。<br/>

### TABLE

| First Header | Second Header | Third Header |
| ------------ | :-----------: | -----------: |
| Content      |   **Cell**    |         Cell |
| New section  |     More      |         Data |

### CODE

```java
@Configuration
public class AppConfig {

    @Bean
    public MyService myService() {
        return new MyServiceImpl();
    }
}
```

</anchor-md-script>
