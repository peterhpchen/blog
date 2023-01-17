---
title: 使用 VuePress 建立個人 blog
date: 2022-05-09
tags: vuepress
---
VuePress 預設是作為技術文件的靜態網頁生成器，但有許多的 theme 可以將它轉為 blog 使用，本文介紹如何使用 VuePress 作為個人 blog 使用，以及分享自己使用時的配置方式。

<!-- more -->

## 安裝

```shell
mkdir blog && cd blog
npm iniy -y && npm install vuepress @vuepress/theme-blog -D
```

這裡使用官方的 blog theme `@vuepress/theme-blog` ，因此除了 `vuepress` 外，記得要安裝這個 theme 。

## 目錄結構

```shell
|- blog
|  |- _posts
|  |  |- 2022-04-30-set-lscolors
|  |  |  |- ls-color-auto.png
|  |  |  |- set-lscolors.png
|  |  |- 2022-04-29-shell-sort-by-specific-fields.md
|  |  |- 2022-04-30-set-lscolors.md
|  |  |- 2022-05-01-use-dircolors.md
|  |  |- 2022-05-02-get-directories-in-lua.md
|  |- .vuepress
|     |- config.js
|- package.json
```

* `blog/_posts` ：存放文章的目錄。
* `blog/_posts/*/*.png` ：存放特定文章的圖片。
* `.vuepress/config.js` ： VuePress 的配置檔。

## 配置

VuePress 的配置都存放於 `.vuepress/config.js` 中，而 theme `@vuepress/theme-blog` 的設定可以在 `themeConfig` 中配置：

```js
module.exports = {
  title: 'Limitless Ping',
  theme: '@vuepress/theme-blog',
  themeConfig: {
    // 配置 @vuepress/theme-blog
  }
}
```

除了 `theme` 要設定為 `@vuepress/theme-blog` 以及 `themeConfig` 為 blog 的設定外，其他都是 VuePress 的設定，可以參考[官方文件](https://v1.vuepress.vuejs.org/config/)，至於 `themeConfig` 等下會在講解各功能時進行配置。

設定完 `.vuepress/config.js` 後，可以去設定 `package.json` 的執行指令：

```json
{
  ...
  "scripts": {
    ...
    "dev": "vuepress dev",
    "build": "vuepress build"
  }
  ...
}
```

## 建立文章

在 `_posts` 目錄中建立文章檔，名稱可以隨喜好取名，但可以在前面加上日期（例如： `2022-05-09-vuepress-blog.md` ）以便 permalink 的使用，同時也方便管理。

建立檔案後，你可以使用 Markdown 撰寫文章，並且可以在文章的最前面加上 Front Matter 補充文章的說明

```md
---
title: 使用 VuePress 建立個人 blog
date: 2022-05-09
tags: vuepress
---

嗨嘍，我的文章！
```

這裡 Front Matter 的 `tags` 是單個，如果想要設定多個 `tags` 時，可以使用陣列：

```md
---
tags:
  - vue
  - vuepress
---
```

### 設定簡介內容

blog 的總覽頁中可以顯示文章的節錄，如果想要指定文章的節錄位置，可以使用 `<!-- more -->` 作為節錄的結束位置，這樣 VuePress 就只會節錄到此為止。

### 載入圖片

如果文章中有圖片的話，可以存在與文章同名的目錄中，例如： `2022-05-09-vuepress-blog.md` 這篇，圖片就可以存到 `2022-05-09-vuepress-blog/image.png` 中，這樣一來，在文章中使用 `![image](./2022-05-09-vuepress-blog/image.png)` 來引入。

## 設定日期格式

每篇文章的日期格式預設為 `ddd MMM DD YYYY` ，如果想要更改的話，可以修改 `themeConfig.dateFormat` ：

```js
module.exports = {
  themeConfig: {
    dateFormat: 'YYYY-MM-DD'
  }
}
```

上面的配置會將日期的顯示方式改為 `YYYY-MM-DD` 。

## 設定 Footer

`@vuepress/theme-blog` 的 Footer 用來顯示各式的連結與版權宣告：

```js
module.exports = {
  themeConfig: {
    footer: {
      contact: [
        {
          type: 'github',
          link: 'https://github.com/peterhpchen'
        },
        {
          type: 'linkedin',
          link: 'https://www.linkedin.com/in/peter-hsin-ping-chen/'
        }
      ],
      copyright: [
        {
          text: 'Copyright © 2014-present Peter Chen',
        },
      ],
    },
  }
}
```

`contact` 可以在 Footer 的左邊建立各式的連結圖標，種類如下：

* codepen
* codesandbox
* facebook
* github
* gitlab
* instagram
* linkedin
* mail
* messenger
* music
* phone
* twitter
* video
* web
* youtube

`copyright` 則是一個陣列，每個陣列中都可以寫一段文字，它會將文字呈現在 Footer 的右邊，如果想要加上連結則多個 `link` 屬性即可。

## 設定 RSS

使用 `themeConfig.feed` 可以設定 Feed ，只要將網站名稱加入 `themeConfig.feed.canonical_base` 中即可開啟 RSS ：

```js
module.exports = {
    feed: {
      canonical_base:'https://peterhpchen.github.io',
    }
  }
}
```

## 使用 GitHub Actions 部署

我們可以使用 GitHub Actions 來自動建置及部署 blog ，請將下面的設定加到 `.github/workflows/pages.yml` ：

```yml
name: Pages

on:
  push:
    branches:
      - main # default branch

jobs:
  pages:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Cache NPM dependencies
        uses: actions/cache@v2
        with:
          path: node_modules
          key: ${{ runner.OS }}-npm-cache
          restore-keys: |
            ${{ runner.OS }}-npm-cache
      - name: Install Dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./.vuepress/dist
```

這裡使用 [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) 作為部署的 Action 。

接著將 GitHub Repository 的 Settings > Pages > Source 改為 `gh-pages` 。

### 確認 `base` 屬性是否對應 GitHub Page

如果使用 `{username}.github.io` 作為 Repository 的話，那 `.vuepress/config.js` 中的 `base` 設定為 `/` 即可，如果使用特定名稱作為 Repository 名稱的話，例如： `blog` ，那 `base` 需要設定為 `/blog/` 。

## 總結

像我這樣平時使用 Vue 做開發， VuePres 作為文件系統的工程師來說，使用 VuePress 作為部落格的載體，不但可以節省學習其他部落格軟體的用法，還可以使所有的文件格式保持一致，是個非常方便的選擇。

## 參考資料

* [@vuepress/theme-blog](https://vuepress-theme-blog.billyyyyy3320.com/)
* [VuePress](https://v1.vuepress.vuejs.org/)
