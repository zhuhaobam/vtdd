---
title: IOC容器
breadcrumb: md.md
noi18n: no
icon: file-markdown-filled
sort: 1
padding: 0 210px 40px 40px
---

<anchor-md-script>

<div style="display: none;">

[TOC]

</div>

# Spring IoC 容器和 bean 简介

本章介绍 Spring 框架实现控制反转（IoC）的原理。<br/>IoC 也称为依赖注入（DI）。<br/>对象仅通过构造函数参数、工厂方法的参数或在对象实例构造或从工厂方法返回后在对象实例上设置的属性来定义它们的依赖关系（即，它们使用的其他对象）。<br/>然后，容器在创建 bean 时注入这些依赖项。这个过程基本上是 bean 本身的逆过程（因此称为控制的反转），通过使用类的直接构造或服务定位器模式等机制来控制其依赖项的实例化或位置。

org.springframework.beans 和 org.springframework.context 包是 Spring 框架的 IoC 容器的基础。<br/>[BeanFactory](https://docs.spring.io/spring-framework/docs/5.3.22/javadoc-api/org/springframework/beans/factory/BeanFactory.html)接口提供了一种高级配置机制，能够管理任何类型的对象。<br/>[ApplicationContext](https://docs.spring.io/spring-framework/docs/5.3.22/javadoc-api/org/springframework/context/ApplicationContext.html)是 BeanFactory 的子接口。

- 更容易与 Spring 的 AOP 功能集成
- 消息资源处理（用于国际化）
- 活动发布
- 应用层特定上下文，例如 WebApplicationContext 用于 Web 应用程序的上下文。

简而言之，它 BeanFactory 提供了配置框架和基本功能，并 ApplicationContext 增加了更多的企业特定功能。是的 ApplicationContext 完整超集，BeanFactory 并且在本章中专门用于描述 Spring 的 IoC 容器。有关使用 BeanFactory 代替的更多信息，ApplicationContext,请参阅涵盖 BeanFactoryAPI 的部分。

在 Spring 中，构成应用程序主干并由 Spring IoC 容器管理的对象称为 bean。bean 是由 Spring IoC 容器实例化、组装和管理的对象。否则，bean 只是应用程序中的众多对象之一。Bean 以及它们之间的依赖关系反映在容器使用的配置元数据中。

</anchor-md-script>
