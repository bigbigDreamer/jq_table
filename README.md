# jQuery+ BootStrap动态表格

## 介绍

&emsp;&emsp;本项目为jQuery与BootStrap的练习基础项目，**可以不必理会构建环境的技术栈，以及实现细节**，
只需要关注代码的内部实现细节就可以了。

&emsp;&emsp;本表格目前已实现细节与待实现细节：
  - [ ] 新增表头字段(使其动态化处理)
  - [x] 添加行
  - [ ] 删除行
    - [X] 单行删除
    - [ ] 多行删除
  - [x] 修改行
  - [ ] 查询行
    - [ ] 模糊查询
    - [ ] 条件查询
  - [ ] 表格排序
  - [x] 表单验证
     - [x] 输入实时校验（可选：函数防抖）
     - [ ] 表单失焦校验（可选）
     - [ ] 按钮点击校验（可选）
  - [x] 保存日志记录
  - [ ] 保存修改记录
  - [ ] 分页数据处理
  - [ ] 核心代码优化
  - [ ] 事件模式优化
  - [ ] UI样式优化
  - [ ] 浏览器兼容性
  
  `具体实现细节见文末DEMO演示`
  
## 二次开发指导

### 说明

&emsp;&emsp;在二次开发之前，请确保你已经比较熟悉`Git`和`JavaScript（ES>=5）`，当然也需要你或多或少了解`Less`预处理器的书写规范。

&emsp;&emsp;你需要具有良好的代码缩进与命名规约风格，本项目代码样式风格详见`.editorconfig`，命名规范：
- 常量： 匈牙利命名法&大写
- 函数名：具有形象意义的动词短语&驼峰命名法
- 变量名：具有意义的名词&驼峰命名法
- 类名：具有一定指代性的名词&帕斯卡命名法

#### 再次说明

&emsp;&emsp;动态表格的二次开发与项目构建(诸如：webpack等自动化工具)没有任何关系，具体的热更新环境与打包环境我已经帮你部署好了，而你只需要关注`index.html`、`addRow.js`、`table.less`三个文件的核心代码就可以了。

&emsp;&emsp;另外一提，热更新的含义就是，项目在你改动代码保存后构建环境会自动刷新浏览器，省去了你手动刷新的时间！

### 克隆本项目

```bash
$ git clone 
```

### 安装依赖

```bash
$ yarn add
# OR
$ npm i
```

### 运行

```bash
$ npm start
```

### 打包

```bash
$ npm run build
```
### 访问

&emsp;&emsp;当你运行起来整个项目，你可以访问：http://127.0.0.1:3000 

## 项目自动化环境构建技术栈

- [x] WebPack
- [x] jQuery
- [x] BootStrap
- [x] Less
- [x] Node
- [x] IE>=9

## 版本控制

- `git`&`github`

## 项目效果

![ALT]()

## 开发者

<img src="https://avatars2.githubusercontent.com/u/39019913?s=460&v=4" style="border-radius: 50%;" width="80px" height="80px" alt="alt" />
<img src="https://avatars2.githubusercontent.com/u/39019913?s=460&v=4" style="border-radius: 50%;" width="80px" height="80px" alt="alt" />






