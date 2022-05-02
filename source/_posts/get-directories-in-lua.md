---
title: 使用 Lua 取得目錄中的檔案
date: 2022-05-02 19:10:49
tags: lua
---
前陣子在對 Neovim 做配置時，有個需求是想要動態地讀取目錄中的檔案，並且使用 `require` 引用其內容做相關的設定，本文記錄如何使用 Lua 實踐此功能。

## 使用 `io.popen` 執行指令

Lua 提供了 `io.popen` 可以讓使用者叫用 Shell 的指令，因此我們可以使用這個函式叫用 `ls` 來列出目錄下的檔案：

```lua
local parsers = io.popen('ls ~/.config/nvim/lua/treesitter/parsers')
for file in parsers:lines() do
  print(file)
end
--[[
c.lua
js.lua
lua.lua
shell.lua
vim.lua
vue.lua
web.lua
--]]
```

程式碼下面的註解為執行結果，其中指令執行的位置會是 Lua 執行的位置，因此在不知道使用者會在那個位置執行 Lua 的情況下，指令中的路徑盡量使用**絕對路徑**。

`io.popen` 得到的結果為 `file` 物件， `file:lines` 會將指令結果以斷行符區隔，並在每次巡覽時吐出當前的輸出，由此取得目錄下的檔案。

## 執行 Lua 檔案

接著可以使用取得的檔案清單組出 Lua 請求的路徑：

```lua
local ensure_installed = {}
local parsers = io.popen('ls ~/.config/nvim/lua/treesitter/parsers')
for file in parsers:lines() do
  local present, parser = pcall(require, 'treesitter.parsers.' .. file:gsub('%.lua', ''))
  if present then
    -- 檔案內容已存在 parser 中
  end
end
```

這裡要注意 Neovim 中， Lua 的引用路徑是從 `~/.config/nvim/lua/` 開始，因此 `/lua/` 之前的上層目錄不需要包含在引用的路徑中，並且也不會有 `.lua` 的副檔名。

## 總結

要使用 Lua 讀取目錄下的所有檔案，可以使用 `io.popen` 函式執行 `ls` 指令，藉此取得檔案列表，將其轉成 Lua 的引用路徑後，就可以由 `require` 引入。

## 參考資料

- [StackExchange Neovim Lua script to dynamically load .lua config files](https://vi.stackexchange.com/a/36648)
- [stackoverflow How to get list of directories in Lua](https://stackoverflow.com/a/11130774/9265131)
- [Lua Manual 5.7 Input and Output Facilities](http://www.lua.org/manual/5.1/manual.html#5.7)
