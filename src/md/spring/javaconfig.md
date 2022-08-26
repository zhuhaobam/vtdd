---
title: Java 的容器配置
noi18n: yes
trans:
icon: container
sort: 3
---

# 基本概念：@Bean 和@Configuration

Spring 新的 Java 配置支持中的核心工件是带 @Configuration 注释的类和带@Bean 注释的方法。<br/>
@Bean 注解用于表示一个方法实例化、配置和初始化一个由 Spring IoC 容器管理的新对象。<br/>

```
@Configuration
public class AppConfig {

    @Bean
    public MyService myService() {
        return new MyServiceImpl();
    }
}
```
