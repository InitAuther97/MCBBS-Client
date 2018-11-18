# MCBBS-Client

MCBBS 客户端

正在全速开发中，请耐心等待……

[此客户端的在线编辑地址](https://codesandbox.io/s/github/langyo/MCBBS-Client/tree/master/)

## 此客户端的开发模式

此客户端使用混合开发模式，本体为 HTML5 应用。

前端部分依赖 React 与 Material-UI 库进行构造，这需要依赖 Node.js 环境对页面进行转译。

后端部分的桌面端依赖 Electron，移动端依赖 React-Native。

## 版本说明

此分支的版本为 **0.1** （非常不稳定的版本，随时可能出现架构上的改变） 。

此分支的开发代号为 **原木** 。

## 调试方式

### 桌面端（electron）
    // 进入 electron 文件夹
    cd native/electron
    // 安装依赖
    npm i
    // 安装单独的 electron 编译好的二进制文件
    npm i electron --save-dev
    // 运行
    npm start
### 移动端（react native）
React native 的工程文件夹（native/reactNative）下分别有对应于 Android Studio 与 XCode 的工程说明文件，直接使用对应开发环境打开此类文件即可进行测试，测试时 react native 会自动调用 react native packager 对源代码进行打包。

## 源码结构说明

- /native - 依赖于对应平台的核心源代码，为平台无关代码部分提供控制设备以及浏览器的统一 API。
  - /electron - 以 electron 为核心开发的客户端部分。
  - /reactNative - 以 reactNative 为核心开发的客户端部分。
- /plugin - 可以自由选择是否装载的插件部分，此文件夹供任何人贡献自己的代码，将写好的插件提供给其他人使用。

  插件文件夹下的各个子文件夹名称应为插件作者的昵称，在对应作者的文件夹下的各个子文件夹才是插件文件夹。

  任何人都可以向插件文件夹提交自己的插件，但必须遵循以上原则，只能向以自己在 Github 的昵称作为文件夹名的文件夹下上传新插件，并提供自己在 MCBBS 的身份（用于清查可能的恶意代码来源），否则拒绝合并。

- /plugin/langyo - 包含了所有平台无关的核心源代码，全部由 JavaScript 编写，以插件形式装载。
  - /monkeyScript - 一种网页操纵脚本语言的解释引擎，用于自动化模拟操作浏览器。
  - /resourceManager - 资源管理器，提供对本地数据库与网络访问的支持。
  - /pageParser - 页面解析器，提供对 MonkeyScript 脚本的解析与执行，以模拟用户对浏览器的操纵。
  - /viewManager - 界面管理器，提供一系列方便的界面管理接口，将 Material-UI 库的界面进行了重构。
  - /pluginCenter - 插件管理中心，用于启用/禁用插件、安装/卸载插件、控制插件权限与为插件提供可供使用的 API。

## 具体的操作文档

### 后端库文档

> [本地核心 API](https://github.com/langyo/MCBBS-Client/blob/master/native/api.md)
>
> 插件 API（待编辑）
>
> [插件配置文件说明（config.json）](https://github.com/langyo/MCBBS-Client/blob/master/plugin/config.md)（待编辑）
>
> MonkeyScript 说明（待编辑）

### 前端部分使用的库

> [React](https://github.com/facebook/react)
>
> [React-Dom](https://github.com/facebook/react)
>
> [Prop-Types](https://github.com/facebook/prop-types)
>
> [classnames](https://github.com/JedWatson/classnames)
>
> [Google Material-UI](https://github.com/mui-org/material-ui)
