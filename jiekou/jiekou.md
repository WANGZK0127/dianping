# 全局公共参数

**全局Header参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**全局Query参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**全局Body参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**全局认证方式**

> 无需认证

# 状态码说明

| 状态码 | 中文描述 |
| --- | ---- |
| 暂无参数 |

# 接口文档

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-13 13:45:44

> 更新时间: 2024-12-13 13:45:44

```text
暂无描述
```

**目录Header参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录Query参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录Body参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录认证信息**

> 继承父级

## 用户

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-13 15:44:20

> 更新时间: 2024-12-13 15:44:20

```text
暂无描述
```

**目录Header参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录Query参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录Body参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录认证信息**

> 继承父级

### 登录

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-13 13:49:03

> 更新时间: 2024-12-16 08:50:07

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/user/login

| 环境  | URL |
| --- | --- |


**请求方式**

> POST

**Content-Type**

> json

**请求Body参数**

```javascript
{
    "phone": "12233344440",
    "password": "123456"
}
```

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
    "success": true,
    "code": 200,
    "message": "成功",
    "data": true
}
```

* 失败(404)

```javascript
暂无数据
```

### 注册

> 创建人: 赫卡忒

> 更新人: 倪克斯

> 创建时间: 2024-12-13 14:04:23

> 更新时间: 2024-12-13 16:01:26

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/user/register

| 环境  | URL |
| --- | --- |


**请求方式**

> POST

**Content-Type**

> json

**请求Body参数**

```javascript
{
    "phone": "",
    "password": ""
}
```

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
    "success": true,
    "code": 200,
    "message": "成功",
    "data": true
}
```

* 失败(404)

```javascript
暂无数据
```

### 查询主页信息

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-13 15:47:33

> 更新时间: 2024-12-13 16:01:26

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/user/me

| 环境  | URL |
| --- | --- |


**请求方式**

> GET

**Content-Type**

> none

**请求Header参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| authorization | 6e982e47f1a8432b9e6398691d1526a4 | String | 是 | - |

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
  "success": true,
  "code": 200,
  "message": "成功",
  "data": {
    "id": 1,
    "name": "user3xei6dmkui"
  }
}
```

* 失败(404)

```javascript
暂无数据
```

## 用户信息

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-15 15:48:43

> 更新时间: 2024-12-15 16:36:50

```text
暂无描述
```

**目录Header参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录Query参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录Body参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录认证信息**

> 继承父级

### 用户信息更新

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-15 15:49:47

> 更新时间: 2024-12-15 15:49:47

```text
暂无描述
```

**接口状态**

> 开发中

**接口URL**

> http://localhost:8088/userInfo/update

| 环境  | URL |
| --- | --- |


**请求方式**

> GET

**Content-Type**

> json

**请求Header参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| authorization | 6e982e47f1a8432b9e6398691d1526a4 | String | 是 | - |

**请求Body参数**

```javascript
{
    "username": "",
    "city": "",
    "introduce": "",
    "gender": 1,
    "birthday": "2024-12-15 15:48:24",
    "password": ""
}
```

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
暂无数据
```

* 失败(404)

```javascript
暂无数据
```

### 用户信息

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-15 17:42:50

> 更新时间: 2024-12-15 17:42:50

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/userInfo/info

| 环境  | URL |
| --- | --- |


**请求方式**

> GET

**Content-Type**

> none

**请求Header参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| authorization | 6e982e47f1a8432b9e6398691d1526a4 | String | 是 | - |

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
	"success": true,
	"code": 200,
	"message": "成功",
	"data": {
		"userId": 1,
		"city": "郑州",
		"introduce": "我是李昕",
		"likes": 4,
		"fans": 10000,
		"followee": 1,
		"gender": 0,
		"birthday": "2024-12-13 16:00:00",
		"credits": 0,
		"level": 0,
		"createTime": "2024-12-13 07:24:30",
		"updateTime": "2024-12-13 09:11:51"
	}
}
```

* 失败(404)

```javascript
暂无数据
```

## 博客

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-13 15:52:45

> 更新时间: 2024-12-15 16:36:42

```text
暂无描述
```

**目录Header参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录Query参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录Body参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录认证信息**

> 继承父级

### 发布博客

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-13 15:57:39

> 更新时间: 2024-12-13 16:01:29

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/blog/

| 环境  | URL |
| --- | --- |


**请求方式**

> POST

**Content-Type**

> json

**请求Header参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| authorization | 6e982e47f1a8432b9e6398691d1526a4 | String | 是 | - |

**请求Body参数**

```javascript
{
    "id": 1,
    "shopId": 1,
    "userId": 1,
    "icon": "",
    "name": "",
    "isLike": true,
    "title": "",
    "images": "",
    "content": "",
    "liked": 1,
    "comments": 1,
    "createTime": "2024-12-13 15:52:49",
    "updateTime": "2024-12-13 15:52:49"
}
```

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
  "success": true,
  "code": 200,
  "message": "成功",
  "data": 1
}
```

* 失败(404)

```javascript
{
  "success": false,
  "code": 500,
  "message": "失败",
  "data": "服务器异常"
}
```

### 主页博客查询

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-13 15:58:48

> 更新时间: 2024-12-13 16:01:30

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/blog/hot?current=1

| 环境  | URL |
| --- | --- |


**请求方式**

> GET

**Content-Type**

> none

**请求Query参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| current | 1 | String | 是 | - |

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
  "success": true,
  "code": 200,
  "message": "成功",
  "data": [
    {
      "id": 1,
      "shopId": 1,
      "userId": 1,
      "icon": null,
      "name": "user3xei6dmkui",
      "isLike": null,
      "title": "",
      "images": "",
      "content": "",
      "liked": 1,
      "comments": 1,
      "createTime": "2024-12-13 15:52:49",
      "updateTime": "2024-12-13 15:52:49"
    }
  ]
}
```

* 失败(404)

```javascript
暂无数据
```

### 个人博客查询

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-13 16:00:50

> 更新时间: 2024-12-15 15:50:54

```text
暂无描述
```

**接口状态**

> 需修改

**接口URL**

> http://localhost:8088/blog/of/me?current=1

| 环境  | URL |
| --- | --- |


**请求方式**

> GET

**Content-Type**

> json

**请求Header参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| authorization | 6e982e47f1a8432b9e6398691d1526a4 | String | 是 | - |

**请求Query参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| current | 1 | String | 是 | - |

**请求Body参数**

```javascript
暂无数据
```

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
	"success": true,
	"code": 200,
	"message": "成功",
	"data": [
		{
			"id": 1,
			"shopId": 1,
			"userId": 1,
			"icon": null,
			"name": null,
			"isLike": null,
			"title": "测试1",
			"images": "http://localhost/blogs/0/Mt.Fuji.jpg",
			"content": "这是测试1",
			"liked": 2,
			"comments": 8,
			"createTime": "2024-12-13 15:52:49",
			"updateTime": "2024-12-13 15:52:49"
		},
		{
			"id": 2,
			"shopId": 1,
			"userId": 1,
			"icon": null,
			"name": null,
			"isLike": null,
			"title": "测试2",
			"images": "http://localhost/blogs/1/jay1.webp,http://localhost/blogs/1/jay2.jpg",
			"content": "这是测试2",
			"liked": 4,
			"comments": 9,
			"createTime": "2024-12-13 15:52:49",
			"updateTime": "2024-12-13 15:52:49"
		},
		{
			"id": 4,
			"shopId": 8,
			"userId": 1,
			"icon": null,
			"name": null,
			"isLike": null,
			"title": "艺术，手工艺品及缝纫",
			"images": "1",
			"content": "2QpmpgslgV",
			"liked": 0,
			"comments": 6,
			"createTime": "2016-05-28 22:42:57",
			"updateTime": "2002-11-07 22:44:14"
		},
		{
			"id": 12,
			"shopId": 10,
			"userId": 1,
			"icon": null,
			"name": null,
			"isLike": null,
			"title": "工具与家居装饰",
			"images": "1",
			"content": "9O3HecHEpC",
			"liked": 3,
			"comments": 51,
			"createTime": "2010-03-18 23:13:48",
			"updateTime": "2022-10-22 08:29:49"
		},
		{
			"id": 14,
			"shopId": null,
			"userId": 1,
			"icon": null,
			"name": null,
			"isLike": null,
			"title": "12312",
			"images": "http://localhost/blogs/5/3/40f0d25a-eefd-4853-9524-9ba40149985c.jpg",
			"content": "123132",
			"liked": 0,
			"comments": null,
			"createTime": "2024-12-18 09:28:13",
			"updateTime": null
		},
		{
			"id": 15,
			"shopId": null,
			"userId": 1,
			"icon": null,
			"name": null,
			"isLike": null,
			"title": "123123",
			"images": "http://localhost/blogs/2/15/26a352c6-0ed3-481a-b62b-1ceb45a16dd6.jpg",
			"content": "123123",
			"liked": 0,
			"comments": null,
			"createTime": "2024-12-18 09:28:49",
			"updateTime": null
		},
		{
			"id": 16,
			"shopId": null,
			"userId": 1,
			"icon": null,
			"name": null,
			"isLike": null,
			"title": "qqwd",
			"images": "",
			"content": "qweqwe",
			"liked": 0,
			"comments": null,
			"createTime": "2024-12-18 09:31:31",
			"updateTime": null
		},
		{
			"id": 17,
			"shopId": 0,
			"userId": 1,
			"icon": null,
			"name": null,
			"isLike": null,
			"title": "12312341",
			"images": "http://localhost/blogs/0/2/75eac84d-00c3-4c73-9345-b1fb0dbe55dc.jpg",
			"content": "123123124",
			"liked": 0,
			"comments": null,
			"createTime": "2024-12-18 09:41:38",
			"updateTime": null
		}
	]
}
```

* 失败(404)

```javascript
暂无数据
```

### 博客详情

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-13 16:03:03

> 更新时间: 2024-12-19 11:20:26

```text
获取指定博客的详细信息
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/blog/{id}

| 环境  | URL |
| --- | --- |


**请求方式**

> GET

**Content-Type**

> none

**路径变量**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| id | 1 | String | 是 | 博客id |

**响应示例**

* 成功(200)

```javascript
{
  "success": true,
  "code": 200,
  "message": "成功",
  "data": {
    "id": 1,
    "shopId": 1,
    "userId": 1,
    "icon": null,
    "name": "user3xei6dmkui",
    "isLike": false,
    "title": "",
    "images": "",
    "content": "",
    "liked": 1,
    "comments": 1,
    "createTime": "2024-12-13 15:52:49",
    "updateTime": "2024-12-13 15:52:49"
  }
}
```

* 失败(404)

```javascript
暂无数据
```

### 点赞

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-15 17:15:34

> 更新时间: 2024-12-15 17:15:34

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/blog/like/{id}

| 环境  | URL |
| --- | --- |


**请求方式**

> GET

**Content-Type**

> none

**请求Header参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| authorization | 6e982e47f1a8432b9e6398691d1526a4 | String | 是 | - |

**路径变量**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| id | 1 | String | 是 | - |

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
	"success": true,
	"code": 200,
	"message": "成功",
	"data": null
}
```

* 失败(404)

```javascript
暂无数据
```

### 博客主页点赞列表

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-15 17:18:04

> 更新时间: 2024-12-15 17:18:13

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/blog/likes/{id}

| 环境  | URL |
| --- | --- |


**请求方式**

> GET

**Content-Type**

> none

**请求Header参数**


**路径变量**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| id | 1 | String | 是 | - |

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
	"success": true,
	"code": 200,
	"message": "成功",
	"data": [
		{
			"id": 1,
			"name": "wzk",
			"icon": null
		}
	]
}
```

* 失败(404)

```javascript
暂无数据
```
### 查询关注列表博客

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-16 16:53:24

> 更新时间: 2024-12-16 16:53:24

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/blog/myFollow?lastId=1734338884348&offset=

| 环境 | URL  |
| ---- | ---- |


**请求方式**

> GET

**Content-Type**

> none

**请求Header参数**

| 参数名        | 示例值                           | 参数类型 | 是否必填 | 参数描述 |
| ------------- | -------------------------------- | -------- | -------- | -------- |
| authorization | 6e982e47f1a8432b9e6398691d1526a4 | String   | 是       | -        |

**请求Query参数**

| 参数名 | 示例值        | 参数类型 | 是否必填 | 参数描述   |
| ------ | ------------- | -------- | -------- | ---------- |
| lastId | 1734338884348 | String   | 是       | 当前时间戳 |
| offset | -             | String   | 否       | 偏移量     |

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
	"success": true,
	"code": 200,
	"message": "成功",
	"data": {
		"list": [
			{
				"id": 3,
				"shopId": 1,
				"userId": 2,
				"icon": null,
				"name": "userh76plcv5iu",
				"isLike": false,
				"title": "测试3",
				"images": "",
				"content": "这是测试",
				"liked": 10,
				"comments": 1,
				"createTime": "2024-12-13 15:52:49",
				"updateTime": "2024-12-13 15:52:49"
			}
		],
		"minTime": 1734338808428,
		"offset": 1
	}
}
```

* 失败(404)

## 商店类型

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-13 15:51:28

> 更新时间: 2024-12-13 15:51:28

```text
暂无描述
```

**目录Header参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录Query参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录Body参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录认证信息**

> 继承父级

### 查询主页商店类型

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-13 15:52:22

> 更新时间: 2024-12-13 16:01:28

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/shopType/list

| 环境  | URL |
| --- | --- |


**请求方式**

> GET

**Content-Type**

> none

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
  "success": true,
  "code": 200,
  "message": "成功",
  "data": [
    {
      "id": 1,
      "name": "美食",
      "icon": "/types/ms.png",
      "sort": 1,
      "createTime": "2021-12-22T12:17:47.000+00:00",
      "updateTime": "2021-12-23T03:24:31.000+00:00"
    },
    {
      "id": 2,
      "name": "KTV",
      "icon": "/types/KTV.png",
      "sort": 2,
      "createTime": "2021-12-22T12:18:27.000+00:00",
      "updateTime": "2021-12-23T03:24:31.000+00:00"
    },
    {
      "id": 3,
      "name": "丽人·美发",
      "icon": "/types/lrmf.png",
      "sort": 3,
      "createTime": "2021-12-22T12:18:48.000+00:00",
      "updateTime": "2021-12-23T03:24:31.000+00:00"
    },
    {
      "id": 10,
      "name": "美睫·美甲",
      "icon": "/types/mjmj.png",
      "sort": 4,
      "createTime": "2021-12-22T12:21:46.000+00:00",
      "updateTime": "2021-12-23T03:24:31.000+00:00"
    },
    {
      "id": 5,
      "name": "按摩·足疗",
      "icon": "/types/amzl.png",
      "sort": 5,
      "createTime": "2021-12-22T12:19:27.000+00:00",
      "updateTime": "2021-12-23T03:24:31.000+00:00"
    },
    {
      "id": 6,
      "name": "美容SPA",
      "icon": "/types/spa.png",
      "sort": 6,
      "createTime": "2021-12-22T12:19:35.000+00:00",
      "updateTime": "2021-12-23T03:24:31.000+00:00"
    },
    {
      "id": 7,
      "name": "亲子游乐",
      "icon": "/types/qzyl.png",
      "sort": 7,
      "createTime": "2021-12-22T12:19:53.000+00:00",
      "updateTime": "2021-12-23T03:24:31.000+00:00"
    },
    {
      "id": 8,
      "name": "酒吧",
      "icon": "/types/jiuba.png",
      "sort": 8,
      "createTime": "2021-12-22T12:20:02.000+00:00",
      "updateTime": "2021-12-23T03:24:31.000+00:00"
    },
    {
      "id": 9,
      "name": "轰趴馆",
      "icon": "/types/hpg.png",
      "sort": 9,
      "createTime": "2021-12-22T12:20:08.000+00:00",
      "updateTime": "2021-12-23T03:24:31.000+00:00"
    },
    {
      "id": 4,
      "name": "健身运动",
      "icon": "/types/jsyd.png",
      "sort": 10,
      "createTime": "2021-12-22T12:19:04.000+00:00",
      "updateTime": "2021-12-23T03:24:31.000+00:00"
    }
  ]
}
```

* 失败(404)

```javascript
暂无数据
```

## 商店

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-15 16:30:30

> 更新时间: 2024-12-15 16:36:48

```text
暂无描述
```

**目录Header参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录Query参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录Body参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录认证信息**

> 继承父级

### 根据id查询商铺详情

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-15 16:31:02

> 更新时间: 2024-12-15 16:31:36

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/shop/{id}

| 环境  | URL |
| --- | --- |


**请求方式**

> GET

**Content-Type**

> none

**路径变量**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| id | 1 | String | 是 | - |

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
	"success": true,
	"code": 200,
	"message": "成功",
	"data": {
		"id": 1,
		"name": "113茶餐厅",
		"typeId": 1,
		"images": "https://qcloud.dpfile.com/pc/jiclIsCKmOI2arxKN1Uf0Hx3PucIJH8q0QSz-Z8llzcN56-_QiKuOvyio1OOxsRtFoXqu0G3iT2T27qat3WhLVEuLYk00OmSS1IdNpm8K8sG4JN9RIm2mTKcbLtc2o2vfCF2ubeXzk49OsGrXt_KYDCngOyCwZK-s3fqawWswzk.jpg,https://qcloud.dpfile.com/pc/IOf6VX3qaBgFXFVgp75w-KKJmWZjFc8GXDU8g9bQC6YGCpAmG00QbfT4vCCBj7njuzFvxlbkWx5uwqY2qcjixFEuLYk00OmSS1IdNpm8K8sG4JN9RIm2mTKcbLtc2o2vmIU_8ZGOT1OjpJmLxG6urQ.jpg",
		"area": "大关",
		"address": "金华路锦昌文华苑29号",
		"x": 120.149192,
		"y": 30.316078,
		"avgPrice": 80,
		"sold": 4215,
		"comments": 3035,
		"score": 37,
		"openHours": "10:00-22:00",
		"createTime": "2021-12-22T18:10:39",
		"updateTime": "2024-03-26T16:56:18",
		"distance": null
	}
}
```

* 失败(404)

```javascript
暂无数据
```

### 根据分类查询商铺

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-15 16:33:06

> 更新时间: 2024-12-15 16:33:06

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/shop/type?typeId=1&current=1

| 环境  | URL |
| --- | --- |


**请求方式**

> GET

**Content-Type**

> none

**请求Query参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| typeId | 1 | Integer | 是 | 商铺类型 |
| current | 1 | Integer | 是 | 页码 |

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
	"success": true,
	"code": 200,
	"message": "成功",
	"data": [
		{
			"id": 1,
			"name": "113茶餐厅",
			"typeId": 1,
			"images": "https://qcloud.dpfile.com/pc/jiclIsCKmOI2arxKN1Uf0Hx3PucIJH8q0QSz-Z8llzcN56-_QiKuOvyio1OOxsRtFoXqu0G3iT2T27qat3WhLVEuLYk00OmSS1IdNpm8K8sG4JN9RIm2mTKcbLtc2o2vfCF2ubeXzk49OsGrXt_KYDCngOyCwZK-s3fqawWswzk.jpg,https://qcloud.dpfile.com/pc/IOf6VX3qaBgFXFVgp75w-KKJmWZjFc8GXDU8g9bQC6YGCpAmG00QbfT4vCCBj7njuzFvxlbkWx5uwqY2qcjixFEuLYk00OmSS1IdNpm8K8sG4JN9RIm2mTKcbLtc2o2vmIU_8ZGOT1OjpJmLxG6urQ.jpg",
			"area": "大关",
			"address": "金华路锦昌文华苑29号",
			"x": 120.149192,
			"y": 30.316078,
			"avgPrice": 80,
			"sold": 4215,
			"comments": 3035,
			"score": 37,
			"openHours": "10:00-22:00",
			"createTime": "2021-12-22T18:10:39",
			"updateTime": "2024-03-26T16:56:18",
			"distance": null
		},
		{
			"id": 2,
			"name": "蔡馬洪涛烤肉·老北京铜锅涮羊肉",
			"typeId": 1,
			"images": "https://p0.meituan.net/bbia/c1870d570e73accbc9fee90b48faca41195272.jpg,http://p0.meituan.net/mogu/397e40c28fc87715b3d5435710a9f88d706914.jpg,https://qcloud.dpfile.com/pc/MZTdRDqCZdbPDUO0Hk6lZENRKzpKRF7kavrkEI99OxqBZTzPfIxa5E33gBfGouhFuzFvxlbkWx5uwqY2qcjixFEuLYk00OmSS1IdNpm8K8sG4JN9RIm2mTKcbLtc2o2vmIU_8ZGOT1OjpJmLxG6urQ.jpg",
			"area": "拱宸桥/上塘",
			"address": "上塘路1035号（中国工商银行旁）",
			"x": 120.151505,
			"y": 30.333422,
			"avgPrice": 85,
			"sold": 2160,
			"comments": 1460,
			"score": 46,
			"openHours": "11:30-03:00",
			"createTime": "2021-12-22T19:00:13",
			"updateTime": "2022-01-11T16:12:26",
			"distance": null
		},
		{
			"id": 3,
			"name": "新白鹿餐厅(运河上街店)",
			"typeId": 1,
			"images": "https://p0.meituan.net/biztone/694233_1619500156517.jpeg,https://img.meituan.net/msmerchant/876ca8983f7395556eda9ceb064e6bc51840883.png,https://img.meituan.net/msmerchant/86a76ed53c28eff709a36099aefe28b51554088.png",
			"area": "运河上街",
			"address": "台州路2号运河上街购物中心F5",
			"x": 120.151954,
			"y": 30.32497,
			"avgPrice": 61,
			"sold": 12035,
			"comments": 8045,
			"score": 47,
			"openHours": "10:30-21:00",
			"createTime": "2021-12-22T19:10:05",
			"updateTime": "2022-01-11T16:12:42",
			"distance": null
		},
		{
			"id": 4,
			"name": "Mamala(杭州远洋乐堤港店)",
			"typeId": 1,
			"images": "https://img.meituan.net/msmerchant/232f8fdf09050838bd33fb24e79f30f9606056.jpg,https://qcloud.dpfile.com/pc/rDe48Xe15nQOHCcEEkmKUp5wEKWbimt-HDeqYRWsYJseXNncvMiXbuED7x1tXqN4uzFvxlbkWx5uwqY2qcjixFEuLYk00OmSS1IdNpm8K8sG4JN9RIm2mTKcbLtc2o2vmIU_8ZGOT1OjpJmLxG6urQ.jpg",
			"area": "拱宸桥/上塘",
			"address": "丽水路66号远洋乐堤港商城2期1层B115号",
			"x": 120.146659,
			"y": 30.312742,
			"avgPrice": 290,
			"sold": 13519,
			"comments": 9529,
			"score": 49,
			"openHours": "11:00-22:00",
			"createTime": "2021-12-22T19:17:15",
			"updateTime": "2022-01-11T16:12:51",
			"distance": null
		},
		{
			"id": 5,
			"name": "海底捞火锅(水晶城购物中心店）",
			"typeId": 1,
			"images": "https://img.meituan.net/msmerchant/054b5de0ba0b50c18a620cc37482129a45739.jpg,https://img.meituan.net/msmerchant/59b7eff9b60908d52bd4aea9ff356e6d145920.jpg,https://qcloud.dpfile.com/pc/Qe2PTEuvtJ5skpUXKKoW9OQ20qc7nIpHYEqJGBStJx0mpoyeBPQOJE4vOdYZwm9AuzFvxlbkWx5uwqY2qcjixFEuLYk00OmSS1IdNpm8K8sG4JN9RIm2mTKcbLtc2o2vmIU_8ZGOT1OjpJmLxG6urQ.jpg",
			"area": "大关",
			"address": "上塘路458号水晶城购物中心F6",
			"x": 120.15778,
			"y": 30.310633,
			"avgPrice": 104,
			"sold": 4125,
			"comments": 2764,
			"score": 49,
			"openHours": "10:00-07:00",
			"createTime": "2021-12-22T19:20:58",
			"updateTime": "2022-01-11T16:13:01",
			"distance": null
		},
		{
			"id": 6,
			"name": "幸福里老北京涮锅（丝联店）",
			"typeId": 1,
			"images": "https://img.meituan.net/msmerchant/e71a2d0d693b3033c15522c43e03f09198239.jpg,https://img.meituan.net/msmerchant/9f8a966d60ffba00daf35458522273ca658239.jpg,https://img.meituan.net/msmerchant/ef9ca5ef6c05d381946fe4a9aa7d9808554502.jpg",
			"area": "拱宸桥/上塘",
			"address": "金华南路189号丝联166号",
			"x": 120.148603,
			"y": 30.318618,
			"avgPrice": 130,
			"sold": 9531,
			"comments": 7324,
			"score": 46,
			"openHours": "11:00-13:50,17:00-20:50",
			"createTime": "2021-12-22T19:24:53",
			"updateTime": "2022-01-11T16:13:09",
			"distance": null
		},
		{
			"id": 7,
			"name": "炉鱼(拱墅万达广场店)",
			"typeId": 1,
			"images": "https://img.meituan.net/msmerchant/909434939a49b36f340523232924402166854.jpg,https://img.meituan.net/msmerchant/32fd2425f12e27db0160e837461c10303700032.jpg,https://img.meituan.net/msmerchant/f7022258ccb8dabef62a0514d3129562871160.jpg",
			"area": "北部新城",
			"address": "杭行路666号万达商业中心4幢2单元409室(铺位号4005)",
			"x": 120.124691,
			"y": 30.336819,
			"avgPrice": 85,
			"sold": 2631,
			"comments": 1320,
			"score": 47,
			"openHours": "00:00-24:00",
			"createTime": "2021-12-22T19:40:52",
			"updateTime": "2022-01-11T16:13:19",
			"distance": null
		},
		{
			"id": 8,
			"name": "浅草屋寿司（运河上街店）",
			"typeId": 1,
			"images": "https://img.meituan.net/msmerchant/cf3dff697bf7f6e11f4b79c4e7d989e4591290.jpg,https://img.meituan.net/msmerchant/0b463f545355c8d8f021eb2987dcd0c8567811.jpg,https://img.meituan.net/msmerchant/c3c2516939efaf36c4ccc64b0e629fad587907.jpg",
			"area": "运河上街",
			"address": "拱墅区金华路80号运河上街B1",
			"x": 120.150526,
			"y": 30.325231,
			"avgPrice": 88,
			"sold": 2406,
			"comments": 1206,
			"score": 46,
			"openHours": " 11:00-21:30",
			"createTime": "2021-12-22T19:51:06",
			"updateTime": "2022-01-11T16:13:25",
			"distance": null
		},
		{
			"id": 9,
			"name": "羊老三羊蝎子牛仔排北派炭火锅(运河上街店)",
			"typeId": 1,
			"images": "https://p0.meituan.net/biztone/163160492_1624251899456.jpeg,https://img.meituan.net/msmerchant/e478eb16f7e31a7f8b29b5e3bab6de205500837.jpg,https://img.meituan.net/msmerchant/6173eb1d18b9d70ace7fdb3f2dd939662884857.jpg",
			"area": "运河上街",
			"address": "台州路2号运河上街购物中心F5",
			"x": 120.150598,
			"y": 30.325251,
			"avgPrice": 101,
			"sold": 2763,
			"comments": 1363,
			"score": 44,
			"openHours": "11:00-21:30",
			"createTime": "2021-12-22T19:53:59",
			"updateTime": "2022-01-11T16:13:34",
			"distance": null
		}
	]
}
```

* 失败(404)

```javascript
暂无数据
```

### 根据商铺名模糊查询

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-15 16:34:11

> 更新时间: 2024-12-15 16:34:20

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/shop/name?name=羊&current=

| 环境  | URL |
| --- | --- |


**请求方式**

> GET

**Content-Type**

> none

**请求Query参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| name | 羊 | String | 是 | 商铺名关键字 |
| current | - | Integer | 是 | 页码 |

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
	"success": true,
	"code": 200,
	"message": "成功",
	"data": [
		{
			"id": 2,
			"name": "蔡馬洪涛烤肉·老北京铜锅涮羊肉",
			"typeId": 1,
			"images": "https://p0.meituan.net/bbia/c1870d570e73accbc9fee90b48faca41195272.jpg,http://p0.meituan.net/mogu/397e40c28fc87715b3d5435710a9f88d706914.jpg,https://qcloud.dpfile.com/pc/MZTdRDqCZdbPDUO0Hk6lZENRKzpKRF7kavrkEI99OxqBZTzPfIxa5E33gBfGouhFuzFvxlbkWx5uwqY2qcjixFEuLYk00OmSS1IdNpm8K8sG4JN9RIm2mTKcbLtc2o2vmIU_8ZGOT1OjpJmLxG6urQ.jpg",
			"area": "拱宸桥/上塘",
			"address": "上塘路1035号（中国工商银行旁）",
			"x": 120.151505,
			"y": 30.333422,
			"avgPrice": 85,
			"sold": 2160,
			"comments": 1460,
			"score": 46,
			"openHours": "11:30-03:00",
			"createTime": "2021-12-22T19:00:13",
			"updateTime": "2022-01-11T16:12:26",
			"distance": null
		},
		{
			"id": 9,
			"name": "羊老三羊蝎子牛仔排北派炭火锅(运河上街店)",
			"typeId": 1,
			"images": "https://p0.meituan.net/biztone/163160492_1624251899456.jpeg,https://img.meituan.net/msmerchant/e478eb16f7e31a7f8b29b5e3bab6de205500837.jpg,https://img.meituan.net/msmerchant/6173eb1d18b9d70ace7fdb3f2dd939662884857.jpg",
			"area": "运河上街",
			"address": "台州路2号运河上街购物中心F5",
			"x": 120.150598,
			"y": 30.325251,
			"avgPrice": 101,
			"sold": 2763,
			"comments": 1363,
			"score": 44,
			"openHours": "11:00-21:30",
			"createTime": "2021-12-22T19:53:59",
			"updateTime": "2022-01-11T16:13:34",
			"distance": null
		}
	]
}
```

* 失败(404)

```javascript
暂无数据
```

### 更新商铺

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-15 16:36:33

> 更新时间: 2024-12-15 16:36:33

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/shop/

| 环境  | URL |
| --- | --- |


**请求方式**

> PUT

**Content-Type**

> json

**请求Body参数**

```javascript
{
    "id": 1,
    "name": "",
    "typeId": 1,
    "images": "",
    "area": "",
    "address": "",
    "x": 1,
    "y": 1,
    "avgPrice": 1,
    "sold": 1,
    "comments": 1,
    "score": 1,
    "openHours": "",
    "createTime": "2024-12-15 16:35:56",
    "updateTime": "2024-12-15 16:35:56",
    "distance": 1
}
```

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
暂无数据
```

* 失败(404)

```javascript
暂无数据
```

## 上传

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-15 15:54:22

> 更新时间: 2024-12-15 15:54:22

```text
暂无描述
```

**目录Header参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录Query参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录Body参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录认证信息**

> 继承父级

### 上传图片

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-15 15:56:15

> 更新时间: 2024-12-18 09:16:20

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/upload/blog

| 环境 | URL  |
| ---- | ---- |


**请求方式**

> POST

**Content-Type**

> form-data

**请求Header参数**

| 参数名        | 示例值                           | 参数类型 | 是否必填 | 参数描述 |
| ------------- | -------------------------------- | -------- | -------- | -------- |
| authorization | 6e982e47f1a8432b9e6398691d1526a4 | String   | 是       | -        |

**请求Body参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |
| file   | -      | File     | 是       | -        |

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
	"success": true,
	"code": 200,
	"message": "成功",
	"data": "/blogs/0/4/25837015-7fec-41a8-9b5a-652469bcf466.jpg"
}
```

* 失败(404)

### 删除图片

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-19 10:34:55

> 更新时间: 2024-12-19 10:35:02

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/upload/delete?name=\blogs\14\9\Mt.Fuji.jpg

| 环境 | URL  |
| ---- | ---- |


**请求方式**

> GET

**Content-Type**

> none

**请求Header参数**

| 参数名        | 示例值                           | 参数类型 | 是否必填 | 参数描述 |
| ------------- | -------------------------------- | -------- | -------- | -------- |
| authorization | 6e982e47f1a8432b9e6398691d1526a4 | String   | 是       | -        |

**请求Query参数**

| 参数名 | 示例值                  | 参数类型 | 是否必填 | 参数描述 |
| ------ | ----------------------- | -------- | -------- | -------- |
| name   | \blogs\14\9\Mt.Fuji.jpg | String   | 是       | -        |

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
	"success": true,
	"code": 200,
	"message": "成功",
	"data": null
}
```

* 失败(404)

## 关注

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-16 09:47:22

> 更新时间: 2024-12-16 09:47:22

```text
暂无描述
```

**目录Header参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录Query参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录Body参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| 暂无参数 |

**目录认证信息**

> 继承父级

### 关注

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-16 09:50:40

> 更新时间: 2024-12-16 10:05:08

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/follow/{id}/{isFollow}

| 环境  | URL |
| --- | --- |


**请求方式**

> PUT

**Content-Type**

> none

**请求Header参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| authorization | 6e982e47f1a8432b9e6398691d1526a4 | String | 是 | - |

**路径变量**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| id | 2 | String | 是 | - |
| isFollow | true | String | 是 | - |

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
	"success": true,
	"code": 200,
	"message": "成功",
	"data": null
}
```

* 失败(404)

```javascript
暂无数据
```

### 是否关注

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-16 10:04:49

> 更新时间: 2024-12-16 10:05:05

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/follow/if/{id}

| 环境  | URL |
| --- | --- |


**请求方式**

> GET

**Content-Type**

> none

**请求Header参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| authorization | 6e982e47f1a8432b9e6398691d1526a4 | String | 是 | - |

**路径变量**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| id | 2 | Integer | 是 | - |

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
	"success": true,
	"code": 200,
	"message": "成功",
	"data": true
}
```

* 失败(404)

```javascript
暂无数据
```

### 共同关注

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-16 10:05:47

> 更新时间: 2024-12-16 10:10:06

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/follow/common/{id}

| 环境  | URL |
| --- | --- |


**请求方式**

> GET

**Content-Type**

> none

**请求Header参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| authorization | 6e982e47f1a8432b9e6398691d1526a4 | String | 是 | - |

**路径变量**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| --- | --- | ---- | ---- | ---- |
| id | 3 | Integer | 是 | - |

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
	"success": true,
	"code": 200,
	"message": "成功",
	"data": [
		{
			"id": 2,
			"name": "userh76plcv5iu",
			"icon": null
		}
	]
}
```

* 失败(404)

```javascript
暂无数据
```
### 我的粉丝

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-16 16:14:09

> 更新时间: 2024-12-16 16:14:11

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/follow/followMe

| 环境 | URL  |
| ---- | ---- |


**请求方式**

> GET

**Content-Type**

> none

**请求Header参数**

| 参数名        | 示例值                           | 参数类型 | 是否必填 | 参数描述 |
| ------------- | -------------------------------- | -------- | -------- | -------- |
| authorization | 6e982e47f1a8432b9e6398691d1526a4 | String   | 是       | -        |

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
	"success": true,
	"code": 200,
	"message": "成功",
	"data": [
		{
			"id": 2,
			"name": "userh76plcv5iu",
			"icon": null
		}
	]
}
```

* 

### 查询博客内商铺信息

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-17 11:31:17

> 更新时间: 2024-12-17 11:32:20

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/shop/inBlog?id=1

| 环境 | URL  |
| ---- | ---- |


**请求方式**

> GET

**Content-Type**

> none

**请求Query参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |
| id     | 1      | Integer  | 是       | 博客id   |

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
	"success": true,
	"code": 200,
	"message": "成功",
	"data": {
		"name": "113茶餐厅",
		"images": "https://qcloud.dpfile.com/pc/jiclIsCKmOI2arxKN1Uf0Hx3PucIJH8q0QSz-Z8llzcN56-_QiKuOvyio1OOxsRtFoXqu0G3iT2T27qat3WhLVEuLYk00OmSS1IdNpm8K8sG4JN9RIm2mTKcbLtc2o2vfCF2ubeXzk49OsGrXt_KYDCngOyCwZK-s3fqawWswzk.jpg,https://qcloud.dpfile.com/pc/IOf6VX3qaBgFXFVgp75w-KKJmWZjFc8GXDU8g9bQC6YGCpAmG00QbfT4vCCBj7njuzFvxlbkWx5uwqY2qcjixFEuLYk00OmSS1IdNpm8K8sG4JN9RIm2mTKcbLtc2o2vmIU_8ZGOT1OjpJmLxG6urQ.jpg",
		"score": 37,
		"avgPrice": 80
	}
}
```

* 失败(404)

###  商铺详情

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-17 17:01:19

> 更新时间: 2024-12-17 17:01:57

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/shop/detail?id=1

| 环境 | URL  |
| ---- | ---- |


**请求方式**

> GET

**Content-Type**

> none

**请求Query参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |
| id     | 1      | Integer  | 是       | 商铺id   |

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
	"success": true,
	"code": 200,
	"message": "成功",
	"data": {
		"id": 1,
		"name": "113茶餐厅",
		"typeId": 1,
		"images": "https://qcloud.dpfile.com/pc/jiclIsCKmOI2arxKN1Uf0Hx3PucIJH8q0QSz-Z8llzcN56-_QiKuOvyio1OOxsRtFoXqu0G3iT2T27qat3WhLVEuLYk00OmSS1IdNpm8K8sG4JN9RIm2mTKcbLtc2o2vfCF2ubeXzk49OsGrXt_KYDCngOyCwZK-s3fqawWswzk.jpg,https://qcloud.dpfile.com/pc/IOf6VX3qaBgFXFVgp75w-KKJmWZjFc8GXDU8g9bQC6YGCpAmG00QbfT4vCCBj7njuzFvxlbkWx5uwqY2qcjixFEuLYk00OmSS1IdNpm8K8sG4JN9RIm2mTKcbLtc2o2vmIU_8ZGOT1OjpJmLxG6urQ.jpg",
		"area": "大关",
		"address": "金华路锦昌文华苑29号",
		"x": 120.149192,
		"y": 30.316078,
		"avgPrice": 80,
		"sold": 4215,
		"comments": 3035,
		"score": 37,
		"openHours": "10:00-22:00",
		"createTime": "2021-12-22T18:10:39",
		"updateTime": "2024-03-26T16:56:18",
		"distance": null
	}
}
```

* 失败(404)

## 评论回复

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-18 10:17:20

> 更新时间: 2024-12-18 10:17:20

```text
暂无描述
```

**目录Header参数**

| 参数名   | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| -------- | ------ | -------- | -------- | -------- |
| 暂无参数 |        |          |          |          |

**目录Query参数**

| 参数名   | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| -------- | ------ | -------- | -------- | -------- |
| 暂无参数 |        |          |          |          |

**目录Body参数**

| 参数名   | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| -------- | ------ | -------- | -------- | -------- |
| 暂无参数 |        |          |          |          |

**目录认证信息**

> 继承父级

### 发布评论回复

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创���时间: 2024-12-18 10:34:05

> 更新时间: 2024-12-18 11:06:27

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/commentReply/save

| 环境 | URL  |
| ---- | ---- |


**请求方式**

> POST

**Content-Type**

> json

**请求Header参数**

| 参数名        | 示例值                           | 参数类型 | 是否必填 | 参数描述 |
| ------------- | -------------------------------- | -------- | -------- | -------- |
| authorization | da729e33da9547929da73a08532d6b4a | String   | 是       | -        |

**请求Body参数**

```javascript
{
    "blogId": 1,
    "replyType": 2,
    "targetId": 1,
    "content": "你说的对"
}
```

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
	"success": true,
	"code": 200,
	"message": "成功",
	"data": true
}
```

* 失败(404)

### 查询博客下评论

> 创建人: 倪克斯

> 更新人: 倪克斯

> 创建时间: 2024-12-18 10:59:51

> 更新时间: 2024-12-18 11:06:23

```text
暂无描述
```

**接口状态**

> 已完成

**接口URL**

> http://localhost:8088/commentReply/list?id=1

| 环境 | URL  |
| ---- | ---- |


**请求方式**

> POST

**Content-Type**

> json

**请求Query参数**

| 参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述 |
| ------ | ------ | -------- | -------- | -------- |
| id     | 1      | Integer  | 是       | 博客id   |

**请求Body参数**

```javascript
暂无数据
```

**认证方式**

> 继承父级

**响应示例**

* 成功(200)

```javascript
{
	"success": true,
	"code": 200,
	"message": "成功",
	"data": [
		{
			"rootNode": true,
			"leafNode": false,
			"children": [
				{
					"rootNode": false,
					"leafNode": true,
					"children": null,
					"id": 2,
					"blogId": 1,
					"replyType": 2,
					"content": "你说的对",
					"fromId": "2",
					"toId": null,
					"isAuthor": false,
					"parentId": 1,
					"userName": "userh76plcv5iu",
					"avatar": null,
					"createdTime": 1734490995000,
					"nodePId": 1,
					"nodeId": 2
				}
			],
			"id": 1,
			"blogId": 1,
			"replyType": 1,
			"content": "好漂亮啊",
			"fromId": null,
			"toId": null,
			"isAuthor": false,
			"parentId": -1,
			"userName": "wzk",
			"avatar": null,
			"createdTime": 1734489157000,
			"nodePId": -1,
			"nodeId": 1
		}
	]
}
```

* 失败(404)