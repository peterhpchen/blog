---
title: 在 Shell 中將指令結果依照特定欄位排序
date: 2022-04-29
tags: shell
---
在執行指令後，有時我們會想要以特定的方式排序指令所輸出的結果，這時可以使用 `sort` 來做排序，本文記錄如何使用 sort 將特定字元作為分隔符，並對分隔後的特定欄位做排序。

<!-- more -->

## 情境

假設現在使用了 `find` 找出一些檔案，並用 `sort` 排序：

```shell{11-12,16-17}
% find $DOTFILES_ROOT/*/scripts -name install.sh | sort
/Users/PeterChen/.dotfiles/bat/scripts/install.sh
/Users/PeterChen/.dotfiles/cheat.sh/scripts/install.sh
/Users/PeterChen/.dotfiles/exa/scripts/install.sh
/Users/PeterChen/.dotfiles/fd/scripts/install.sh
/Users/PeterChen/.dotfiles/fzf/scripts/install.sh
/Users/PeterChen/.dotfiles/gcc/scripts/install.sh
/Users/PeterChen/.dotfiles/git/scripts/install.sh
/Users/PeterChen/.dotfiles/neofetch/scripts/install.sh
/Users/PeterChen/.dotfiles/node.nvm/scripts/install.sh
/Users/PeterChen/.dotfiles/nvim.packer.nvim/scripts/install.sh
/Users/PeterChen/.dotfiles/nvim/scripts/install.sh
/Users/PeterChen/.dotfiles/pip/scripts/install.sh
/Users/PeterChen/.dotfiles/pyenv/scripts/install.sh
/Users/PeterChen/.dotfiles/ripgrep/scripts/install.sh
/Users/PeterChen/.dotfiles/rust.cargo/scripts/install.sh
/Users/PeterChen/.dotfiles/rust/scripts/install.sh
/Users/PeterChen/.dotfiles/sdkman/scripts/install.sh
/Users/PeterChen/.dotfiles/tmux/scripts/install.sh
/Users/PeterChen/.dotfiles/vim/scripts/install.sh
/Users/PeterChen/.dotfiles/zsh.fzf-tab/scripts/install.sh
/Users/PeterChen/.dotfiles/zsh.zplug/scripts/install.sh
/Users/PeterChen/.dotfiles/zsh/scripts/install.sh
```

我們想要對 `.dotfiles` 的下層資料夾做排序，可以看到因為沒有設定分隔符的關係， `sort` 將整個字串視為排序的對象，因此會將路徑層的 `/` 也作為排序的依據，所以像是  **`nvim.packer.nvim` 與 `nvim`** 和 **`rust.cargo` 與 `rust`** 會是排序相反的狀況。

## 設定分隔符與排序欄位

`sort` 可以使用 `-t` 或是 `--field-separator` 來指定分隔符，並且使用 `-k` 或是 `--key` 指定要排序的欄位。

```shell{11-12,16-17}
% find $DOTFILES_ROOT/*/scripts -name install.sh | sort -t '/' -k 5,5
/Users/PeterChen/.dotfiles/bat/scripts/install.sh
/Users/PeterChen/.dotfiles/cheat.sh/scripts/install.sh
/Users/PeterChen/.dotfiles/exa/scripts/install.sh
/Users/PeterChen/.dotfiles/fd/scripts/install.sh
/Users/PeterChen/.dotfiles/fzf/scripts/install.sh
/Users/PeterChen/.dotfiles/gcc/scripts/install.sh
/Users/PeterChen/.dotfiles/git/scripts/install.sh
/Users/PeterChen/.dotfiles/neofetch/scripts/install.sh
/Users/PeterChen/.dotfiles/node.nvm/scripts/install.sh
/Users/PeterChen/.dotfiles/nvim/scripts/install.sh
/Users/PeterChen/.dotfiles/nvim.packer.nvim/scripts/install.sh
/Users/PeterChen/.dotfiles/pip/scripts/install.sh
/Users/PeterChen/.dotfiles/pyenv/scripts/install.sh
/Users/PeterChen/.dotfiles/ripgrep/scripts/install.sh
/Users/PeterChen/.dotfiles/rust/scripts/install.sh
/Users/PeterChen/.dotfiles/rust.cargo/scripts/install.sh
/Users/PeterChen/.dotfiles/sdkman/scripts/install.sh
/Users/PeterChen/.dotfiles/tmux/scripts/install.sh
/Users/PeterChen/.dotfiles/vim/scripts/install.sh
/Users/PeterChen/.dotfiles/zsh/scripts/install.sh
/Users/PeterChen/.dotfiles/zsh.fzf-tab/scripts/install.sh
/Users/PeterChen/.dotfiles/zsh.zplug/scripts/install.sh
```

`-k` 設置的是分隔後欄位的編號，第一個數字為起始欄位的編號，第二個是結束欄位的編號，中間以逗號 `,` 區隔。

我們的目標是排序 `.dotfiles` 的下層，因此是第五層（由於一開始就是 `/` ，因此第一個欄位的空字串也要列入計算），而由於我們只想對此層資料夾進行排序，因此起始與結束都設定 `5` 即可。

最後可以看到指令執行的結果完美地以 `.dotfiles` 下層資料夾由小到大排序好了。

## 總結

`sort` 會將整個字串作為搜尋結果，因此碰到像是目錄的斜線 `/` 時，也會將其包含在排序的目標中，這會使得排序的結果不如預期。

為了解決這個問題，我們可以使用 `-t` 參數設定分隔符，並使用 `-k` 選定要排序的依據欄位，藉此排除此問題。

## 參考資料

* [Linux 的 sort 排序指令教學與常用範例整理](https://blog.gtwang.org/linux/linux-sort-command-tutorial-and-examples/)
