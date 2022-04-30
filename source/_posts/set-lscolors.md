---
title: 設定 ls 指令輸出的顏色
date: 2022-04-30 09:24:14
tags: shell
---
我們知道使用 `ls` 指令可以列出目錄下的各式檔案及目錄，但是所有類型的檔案都會以相同的顏色輸出，難以在第一時間就了解檔案的種類，我們還得加上 `-l` 參數列出詳細的資訊才能知道，這時如果可以依照顏色輸出不同類型的檔案的話，會使檔案列表更加地一目瞭然。

## 為 `ls` 結果上色

加上 `--color=auto` 參數，它會以不同的顏色區別各類檔案：

```shell
ls --color=auto
```

![ls --color=auto](ls-color-auto.png)

## 設定 `LS_COLORS` 修改 `ls` 輸出顏色

如果想對 `ls` 的輸出顏色做修改，可以修改環境變數 `LS_COLORS` ：

```shell
LS_COLORS='di=01;35:'; export LS_COLORS
```

* `di` ：檔案類型， `di` 為目錄。
* `01;35` ：兩個設定數字，以 `;` 區隔，第一個數字為字型（ `01` 為粗體 Bold ），第二個數字為顏色（ `35` 為紫色 Purple ）。
* `:` ：分隔不同檔案類型設定的區隔符。

設定的數字沒有順序之分，因此 `01;35` 也可以設定為 `35;01` 。

下列為常用的字型列表：

數字|字型
-|-
00|預設
01|粗體
04|底線

字型可以多選，例如設定粗體又想要有底線的話，可以設置 `01;04` 。

下列為顏色列表：

數字|顏色
-|-
30|黑
31|紅
32|綠
33|橘
34|藍
35|紫
36|青
37|灰

除了字體的顏色， `LS_COLORS` 也可以設定背景色，下面是背景色的編碼：

數字|背景顏色
-|-
40|黑
41|紅
42|綠
43|橘
44|藍
45|紫
46|青
47|灰

接著如果想要設定除了目錄外不同的檔案類型顏色時，每種類型也會對應一個鍵值，就像是 `di` 表示為目錄一樣，下列為個檔案類型的列表：

鍵值|名稱|說明
-|-|-
fi|FILE|一般的檔案
di|DIR|目錄
ln|SYMLINK, LINK, LNK| Symbolic link
*.extension||此副檔名的檔案，例如： `*.jpg` 就會涵蓋所有以 `jpg` 為副檔名的檔案

到這裡我們就已經知道所有主要的設定編碼了，現在來看個例子，如果我們想要將目錄設定為藍底紅字並且為粗體加底線的話，我們可以這樣做：

```shell
LS_COLORS='di=01;04;44;31:'; export LS_COLORS
```

![設定 LS_COLORS 後](set-lscolors.png)

完整的編碼表可以參考這篇文章： [Configuring LS_COLORS](http://www.bigsoft.co.uk/blog/2008/04/11/configuring-ls_colors) 。

## 設定多個類型的顏色

如果要設定多個類型的顏色，可以在 `:` 後面再加上其他的類型設定，例如：

```shell
LS_COLORS='di=01;04;44;31:ln=00;33:'; export LS_COLORS
```

如果想要對 `LS_COLORS` 設定多次的話，可以將原本的值加進來：

```shell
LS_COLORS=$LS_COLORS:'di=0;35:' ; export LS_COLORS
```

## 在每次啟動 Shell 時設置 `LS_COLORS` 環境變數

現在我們已經會設定 `ls` 的顏色了，但是每次重新啟動 Shell 時， `LS_COLORS` 的值都會恢復預設，導致之前的設定消失，為解決這個問題，我們可以在 `~/.zshrc` （使用 Bash 時是 `~/.bashrc` ）中配置這項設定，讓 Shell 啟動時可以直接覆寫 `LS_COLORS` 變數：

```shell
echo "LS_COLORS='di=01;04;44;31:ln=00;33:'; export LS_COLORS" >> ~/.zshrc
```

## 總結

`ls` 指令在加入 `--color=auto` 後，可以對其輸出的結果產生顏色，方便使用者辨識。

如果想要客製顏色時，可以藉由修改環境變數 `LS_COLORS` 來達成，這樣一來就可以客製成符合使用習慣的顏色，也可以搭配 theme 做出變化。

## 參考資料

* [[Linux] ls --color 的檔案特徵及顏色意義](http://n.sfs.tw/content/index/11080)
* [askubuntu How do I change the color for directories with ls in the console?](https://askubuntu.com/a/466203)
* [Gist thomd/LC_COLORS.md](https://gist.github.com/thomd/7667642)
* [LSCOLORS Generator](https://geoff.greer.fm/lscolors/)
