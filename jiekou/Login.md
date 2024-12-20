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
    "data": 9bb16f80c71642729c142774fc31147a
}
```

* 失败(404)

```javascript
暂无数据
```
