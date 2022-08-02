# Money-Laundry BackEnd API

## Before getting start

- Clone the repo to local

```
git clone https://github.com/wuwachon/money-laundry
```

- Create database
  Refer to config/config.json, create your database name as "money_laundry" and username/password as below.

```
"development": {
  "username": "root",
  "password": "password",
  "database": "money_laundry",
  "host": "127.0.0.1",
  "dialect": "mysql"
}
```

- Install packages

```
npm install
```

- Database migrate Models

```
npm run migrate
```

- Database seeds install

```
npm run seed
```

- Set env variables
  Refer to _.env.example_, before getting admin features, there is no need to set any env variable in this stage.
  It will need _env JWT_SECRET_ then.
  Please remove the _.example_ from _.env.example_, and set it up before active apis.

- Active apis

```
npm run dev
```

You will see "app listen on PORT 3000" message in your terminal if it runs fine.

---

## API Docs

### GET /

It only send "Hello World" on webpage, no other json response
It is for testing if the domain available

- parameters n/a
- request body n/a
- success response

```
<blank>
```

### GET /v1/api/items

Get all items no mather which category or game level.
It might be adjust like /v1/api/admin/items in the future while getting admin manege database feature.

- parameters n/a
- request body n/a
- success response

```
{
  "status": "success",
  "data": [
    {
      "id": 321,
      "name": "擔任詐騙集團之車手",
      "description": "台北一高中生王小明(化名)，近日經朋友介紹打工賺快錢的管道，只需去ATM提取某銀行帳號現金後轉交即可獲得1500元至2500元報酬，並被告知未成年不受法律約束，領錢當下被警方人贓俱獲才驚覺犯法，為時已晚。",
      "law": "依洗錢防制法第15條之規定，收受、持有或使用\n之財物或財產上利益，有下列情形之一，而無合理來源且與收入顯不相當者，處6月以上5年以下有期徒刑，得併科新臺幣500萬元以下罰金：一、冒名或以假名向金融機構申請開立帳戶。二、以不正方法取得他人向金融機構申請開立之帳戶。三、規避第7條至第10條所定洗錢防制程序，所謂行為人以不正方法，例如：向無特殊信賴關係之他人租用、購買或施用詐術取得帳戶使用，以製造金流斷點，妨礙金融秩序，均屬之。因此，本題行為態樣均屬「以不正方法取得他人向金融機構申請開立之帳戶」，應依洗錢防制法第15條之特殊洗錢罪論處，縱使提款時即被警方查獲，仍應以未遂犯予以處罰。",
      "categoryId": 25,
      "gameId": 121,
      "ans": false,
      "createdAt": "2022-07-30T08:18:16.000Z",
      "updatedAt": "2022-07-30T08:18:16.000Z"
    },
    {
      "id": 322,
      "name": "擔任詐騙集團之車手",
      "description": "台北一高中生王小明(化名)，近日經朋友介紹打工賺快錢的管道，只需去ATM提取某銀行帳號現金後轉交即可獲得1500元至2500元報酬，並被告知未成年不受法律約束，領錢當下被警方人贓俱獲才驚覺犯法，為時已晚。",
      "law": "依洗錢防制法第15條之規定，收受、持有或使用\n之財物或財產上利益，有下列情形之一，而無合理來源且與收入顯不相當者，處6月以上5年以下有期徒刑，得併科新臺幣500萬元以下罰金：一、冒名或以假名向金融機構申請開立帳戶。二、以不正方法取得他人向金融機構申請開立之帳戶。三、規避第7條至第10條所定洗錢防制程序，所謂行為人以不正方法，例如：向無特殊信賴關係之他人租用、購買或施用詐術取得帳戶使用，以製造金流斷點，妨礙金融秩序，均屬之。因此，本題行為態樣均屬「以不正方法取得他人向金融機構申請開立之帳戶」，應依洗錢防制法第15條之特殊洗錢罪論處，縱使提款時即被警方查獲，仍應以未遂犯予以處罰。",
      "categoryId": 25,
      "gameId": 121,
      "ans": false,
      "createdAt": "2022-07-30T08:18:16.000Z",
      "updatedAt": "2022-07-30T08:18:16.000Z"
    },
  ......

  ]
}
```

### GET /v1/api/categories

Get all categories.

- parameters n/a
- request body n/a
- success response

```
{
  "status": "success",
  "data": [
    {
      "id": 25,
      "type": "求職",
      "createdAt": "2022-07-30T08:18:16.000Z",
      "updatedAt": "2022-07-30T08:18:16.000Z"
    },
    {
      "id": 26,
      "type": "創業",
      "createdAt": "2022-07-30T08:18:16.000Z",
      "updatedAt": "2022-07-30T08:18:16.000Z"
    },
    {
      "id": 27,
      "type": "投資",
      "createdAt": "2022-07-30T08:18:16.000Z",
      "updatedAt": "2022-07-30T08:18:16.000Z"
    },
    {
      "id": 28,
      "type": "賭博",
      "createdAt": "2022-07-30T08:18:16.000Z",
      "updatedAt": "2022-07-30T08:18:16.000Z"
    }
  ]
}
```

### GET /v1/api/categories/:categoryId

Get all game levels in specific category.

- parameters categoryId
- request body n/a
- success response

```
{
  "status": "success",
  "data": {
    "id": 26,
    "type": "創業",
    "createdAt": "2022-07-30T08:18:16.000Z",
    "updatedAt": "2022-07-30T08:18:16.000Z",
    "Games": [
      {
        "id": 126,
        "level": 1,
        "title": "請問以下情境何者沒有犯法？",
        "categoryId": 26,
        "createdAt": "2022-07-30T08:18:16.000Z",
        "updatedAt": "2022-07-30T08:18:16.000Z"
      },
      {
        "id": 127,
        "level": 2,
        "title": "請問以下情境何者沒有犯法？",
        "categoryId": 26,
        "createdAt": "2022-07-30T08:18:16.000Z",
        "updatedAt": "2022-07-30T08:18:16.000Z"
      },
    ......

    ]
  }
}
```

### GET /v1/api/games/:gameId

Get all game items in specific game level.

- parameters :gameId
- request body n/a
- success response

```
{
  "status": "success",
  "data": {
    "id": 126,
    "level": 1,
    "title": "請問以下情境何者沒有犯法？",
    "categoryId": 26,
    "createdAt": "2022-07-30T08:18:16.000Z",
    "updatedAt": "2022-07-30T08:18:16.000Z",
    "Category": {
      "id": 26,
      "type": "創業",
      "createdAt": "2022-07-30T08:18:16.000Z",
      "updatedAt": "2022-07-30T08:18:16.000Z"
    },
    "Items": [
      {
        "id": 341,
        "name": "擔任詐騙集團之車手",
        "description": "台北一高中生王小明(化名)，近日經朋友介紹打工賺快錢的管道，只需去ATM提取某銀行帳號現金後轉交即可獲得1500元至2500元報酬，並被告知未成年不受法律約束，領錢當下被警方人贓俱獲才驚覺犯法，為時已晚。",
        "law": "依洗錢防制法第15條之規定，收受、持有或使用\n之財物或財產上利益，有下列情形之一，而無合理來源且與收入顯不相當者，處6月以上5年以下有期徒刑，得併科新臺幣500萬元以下罰金：一、冒名或以假名向金融機構申請開立帳戶。二、以不正方法取得他人向金融機構申請開立之帳戶。三、規避第7條至第10條所定洗錢防制程序，所謂行為人以不正方法，例如：向無特殊信賴關係之他人租用、購買或施用詐術取得帳戶使用，以製造金流斷點，妨礙金融秩序，均屬之。因此，本題行為態樣均屬「以不正方法取得他人向金融機構申請開立之帳戶」，應依洗錢防制法第15條之特殊洗錢罪論處，縱使提款時即被警方查獲，仍應以未遂犯予以處罰。",
        "categoryId": 25,
        "gameId": 126,
        "ans": false,
        "createdAt": "2022-07-30T08:18:16.000Z",
        "updatedAt": "2022-07-30T08:18:16.000Z"
      },
      {
        "id": 342,
        "name": "報紙刊載「徵求帳戶2000元」",
        "description": "台中一年輕人王小明(化名)，近日前在報紙上看到「徵求帳戶2000元」的廣告訊息，為賺2000元的利益而將其金融卡、存摺、開戶印章等交付收購者，不知已淪為詐騙及洗錢的犯案工具。",
        "law": "依洗錢防制法第2條，本法所稱洗錢，指下列行為：\n一、意圖掩飾或隱匿特定犯罪所得來源，或使他人逃避刑事追訴，而移轉或變更特定犯罪所得。二、掩飾或隱匿特定犯罪所得之本質、來源、去向、所在、所有權、處分權或其他權益者。三、收受、持有或使用他人之特定犯罪所得。因此，只要是可以掩飾或隱匿犯罪所得來源、去向、本質之行為，均可構成洗錢罪。而提供帳戶供犯罪者使用即為典型之洗錢犯行。故在洗錢防制法新制上路後，提供帳戶予他人使用，必須要承受很高的法律責任風險，特別在無法確定親戚的公司是否可能涉及任何犯罪行為時。還是建議親戚之公司自行開立帳戶使用。",
        "categoryId": 25,
        "gameId": 126,
        "ans": false,
        "createdAt": "2022-07-30T08:18:16.000Z",
        "updatedAt": "2022-07-30T08:18:16.000Z"
      },
      {
        "id": 343,
        "name": "擔任詐騙集團之車手",
        "description": "台北一高中生王小明(化名)，近日經朋友介紹打工賺快錢的管道，只需去ATM提取某銀行帳號現金後轉交即可獲得1500元至2500元報酬，並被告知未成年不受法律約束，領錢當下被警方人贓俱獲才驚覺犯法，為時已晚。",
        "law": "依洗錢防制法第15條之規定，收受、持有或使用\n之財物或財產上利益，有下列情形之一，而無合理來源且與收入顯不相當者，處6月以上5年以下有期徒刑，得併科新臺幣500萬元以下罰金：一、冒名或以假名向金融機構申請開立帳戶。二、以不正方法取得他人向金融機構申請開立之帳戶。三、規避第7條至第10條所定洗錢防制程序，所謂行為人以不正方法，例如：向無特殊信賴關係之他人租用、購買或施用詐術取得帳戶使用，以製造金流斷點，妨礙金融秩序，均屬之。因此，本題行為態樣均屬「以不正方法取得他人向金融機構申請開立之帳戶」，應依洗錢防制法第15條之特殊洗錢罪論處，縱使提款時即被警方查獲，仍應以未遂犯予以處罰。",
        "categoryId": 25,
        "gameId": 126,
        "ans": false,
        "createdAt": "2022-07-30T08:18:16.000Z",
        "updatedAt": "2022-07-30T08:18:16.000Z"
      },
      {
        "id": 344,
        "name": "幫朋友結婚當收取並記錄紅包金額的招待人員",
        "description": null,
        "law": null,
        "categoryId": 25,
        "gameId": 126,
        "ans": true,
        "createdAt": "2022-07-30T08:18:16.000Z",
        "updatedAt": "2022-07-30T08:18:16.000Z"
      }
    ]
  }
}
```
