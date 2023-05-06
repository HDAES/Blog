#  GitHub Actions
![](https://hades0512.oss-cn-beijing.aliyuncs.com/DL-V2-LinkedIn_FB-1024x538.png)

## 1.什么是 GitHub Actions?

GitHub Actions is a continuous integration and continuous delivery (CI/CD) platform that allows you to automate your build, test, and deployment pipeline. 您可以创建工作流程来构建和测试存储库的每个拉取请求，或将合并的拉取请求部署到生产环境。

GitHub Actions 不仅仅是 DevOps，还允许您在存储库中发生其他事件时运行工作流程。 例如，您可以运行工作流程，以便在有人在您的存储库中创建新问题时自动添加相应的标签。

GitHub 提供 Linux、Windows 和 macOS 虚拟机来运行工作流程，或者您可以在自己的数据中心或云基础架构中托管自己的自托管运行器。

[官方文档](https://docs.github.com/cn/actions)

## 2.创建第一个工作流程

1. 如果`.github/workflows`目录不存在，先在GitHub仓库中创建此目录。

2. 在`.github/workflows`目录中，创建一个名为 `github-actions-demo.yml` 的文件。

3. 将以下 YAML 内容复制到 `github-actions-demo.yml` 文件中：

   ```yaml
   name: GitHub Actions Demo
   on: [push]
   jobs:
     Explore-GitHub-Actions:
       runs-on: ubuntu-latest
       steps:
         - run: echo " The job was automatically triggered by a ${{ github.event_name }} event."
         - run: echo " This job is now running on a ${{ runner.os }} server hosted by GitHub!"
         - run: echo "The name of your branch is ${{ github.ref }} and your repository is ${{ github.repository }}."
         - name: Check out repository code
           uses: actions/checkout@v2
         - run: echo "The ${{ github.repository }} repository has been cloned to the runner."
         - run: echo " The workflow is now ready to test your code on the runner."
         - name: List files in the repository
           run: |
             ls ${{ github.workspace }}
         - run: echo " This job's status is ${{ job.status }}."
   
   ```

4. 点击右边`start commit` ,选择` Commit directly to the master branch.`（*master 分支名字），然后点击 `Commit New file`。

5. 向仓库的分支提交工作流程文件会触发 `push` 事件并运行工作流程。

6. 打开项目`Actions`一栏，会显示所有工作流程，点击 `GitHub Actions Demo`，就看到每个步骤的处理方式。 展开任何步骤以查看其细节。

## 3.Yaml工作流程文件说明

可选 - 将出现在 GitHub 仓库的 Actions（操作）选项卡中的工作流程名称。

```yaml
name: GitHub Actions Demo		
```

指定此工作流程的触发器。

```yaml
on: [push, fork]   # 支持多种条件触发

on:
  push:
    branches:
      - main	# 指定分支push 触发
```

将 `learn-github-actions` 工作流程中运行的所有作业组合在一起。

```yaml
jobs:
```

将作业配置为在最新版本的 Ubuntu Linux 运行器上运行。 这意味着该作业将在 GitHub 托管的新虚拟机上执行。请参阅[“GitHub Actions 的工作流程语法”](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idruns-on)。

```yaml
runs-on: ubuntu-latest
```

将 `check-bats-version` 作业中运行的所有步骤组合在一起。 此部分下嵌套的每项都是一个单独的操作或 shell 脚本。

```yaml
steps:
		# 执行操作或者脚本的名字
 		- name: 安装node.js
        # action 的名字
  		uses: actions/setup-node@v1    
        # action 的配置
  		with: 			
        	# 配置版本
  			 node-version: 14.18.0
  			 
  		- name: 安装yarn
  		# run 关键字指示作业在运行器上执行命令。
        run: npm install -g yarn
        
        - name: 发布到服务器
        uses: SamKirkland/FTP-Deploy-Action@4.3.0
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./docs/.vuepress/dist/
```

## 4.Actions secrets的使用

配置文件`yaml`由于是以文件形式存放在项目中，通常配置中会包含密钥或者密码，是不安全的。`Actions secrets`就可以很好的解决这个问题。

1. 打开项目`Settings`一栏，在左边目录中找到`Secrets` ，然后点击`Actions`.
2. 点击`New repositoty secret`会出现添加页面.
3. 在`Name`输出名字，在`yarm`文件中直接 `secrets.your_name`使用.
4. 在`Value`输入要秘密保存的值.
5. 点击`Add secret`保存.

## 5.常用的Actions

### `FTP-Deploy-Action`

[GitHub](https://github.com/SamKirkland/FTP-Deploy-Action)

```yaml
uses: SamKirkland/FTP-Deploy-Action@4.3.0
with:
	# 服务器地址 例：192.168.0.1
    server: ${{ secrets.FTP_SERVER }}
    # FTP user name
    username: ${{ secrets.FTP_USERNAME }}
     # FTP user password
    password: ${{ secrets.FTP_PASSWORD }}
    # FTP 端口号
    port: 21
    # FTP 协议
    protocol: ftp | ftps
    # 本地路径（需要上传的文件）  必须以 / 结尾
    local-dir: ./docs/.vuepress/dist/
    # 服务器路径
    server-dir: ./
```

## 6.一个完成的yarm配置文件

```yaml
name: 打包vitepress博客

on:
  push:
    # push 代码的时候 哪个分支会受到影响 这里是 main 主分支
    branches:
      - main
# 推送之后执行一系列的任务
jobs:
  build:
    # 运行 ubuntu虚拟机系统
    runs-on: ubuntu-latest
    steps:
      # 获取代码
      - name: 迁出代码
        # 使用action库 action/checkout获取大妈
        uses: actions/checkout@main
      # 安装Node10

      - name: 安装node.js
        # 使用action库  actions/setup-node安装node
        uses: actions/setup-node@v1
        with:
          node-version: 14.18.0

      - name: 安装yarn
        run: npm install -g yarn

      # 安装依赖
      - name: 安装依赖
        run: yarn

      # 打包
      - name: 打包
        run: yarn docs:build

      # 发布到服务器
      - name: 发布到服务器
        uses: SamKirkland/FTP-Deploy-Action@4.3.0
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./docs/.vuepress/dist/
```

