---
title: Chrome Devtools 的 Overrides 功能
tags: chrome-devtools
date: 2026-10-18 15:56:07
---


前端開發常常會碰到資料不足的問題，有可能是後端還沒開發好，或是測試資料沒辦法涵蓋所有的業務邏輯，甚至上到生產環境後，也可能需要配合使用者的操作情境與權限去復現各種狀況。
在本地開發時，我們可以使用 MSW 這類的工具自己客製 API 的回覆，但是只要上到遠端環境上，這類工具的靈活性就會大大降低。
以前的我在這種資料不適配的情況下，通常就只能退回本地環境後回去修改 MSW 的資料內容了。
這整個繁複的除錯流程，對於我來說已經變成一種日常，接近肌肉記憶的程度，雖然痛苦，但下意識認為沒有更好的辦法，直到我有天閒來無事去玩了一下最熟悉的陌生人 Chrome DevTools ，就在每天使用的 Networks Tab 中找到了 Overrides 功能。

<!-- more -->

## 使用 Chrome 的 Devtools 在瀏覽器上直接覆寫後端傳回的資料

Overrides 是 Chrome 的 Devtools 中的一個功能，它讓我們可以建立一個覆寫目錄，這個目錄下是一個與系統 End Point 同樣結構的資料集，當我們把 Overrides 功能開啟時，系統在執行時所請求的 End Point 只要出現在設定的目錄下，就會以此目錄的內容進行回傳。

## 開啟 Overrides 功能

啟用 Overrides 功能非常簡單：

1. 開啟 DevTools （ `F13` ）後進入 Network Tab 中

2. 接著對你想要覆寫的 End Point 點擊左鍵，並且確認你要覆寫的內容。

![點擊你想要覆寫的 End Point](click-api-you-want-to-override.png)

例如我想要覆寫 `org` 這個 End Point 中所取得的名字，這時我需要從 Network 的 Name List 中找到這個 End Point ，並且確認目前回傳的資料。

3. 接著我們對它按下右鍵，選擇 `Override content` 。

![點擊 `Override content`](click-override-content.png)

4. 點擊後，我們會看到 Devtools 的上方會出現一個 Bar ，提示要選擇一個資料夾作為覆寫資料所存放的目錄。

![選擇覆寫目錄](select-folder-to-save-override-data.png)

5. 接著會顯示一個彈跳視窗，請求編輯檔案的權限，按下允許。

![允許 Devtools 存取目錄中的檔案](allow-devtools-to-access-files.png)

接著我們會被轉跳到 Sources Tab 中的 Overrides 中。

![完成設定並轉跳至 Overrides 功能](complete-override-setting.png)

這樣就算是開啟 Overrides 功能了，接著我們來看一下該怎麼設定覆寫資料吧。

> 如果你已經設定過覆寫目錄，步驟 4 與步驟 5 就不用再做， Chrome 會自動跳至 Overrides 功能頁。

## 設定覆寫值

在目錄下會有對應 End Point 的檔案，只要在內容內做修改後並且儲存，在重新整理後就會將設定的數值覆蓋到本來調用的 API 中。

1. 對目標的 End Point 覆寫資料

![對欲覆寫的 End Point 檔案內容編輯覆寫資料](modify-data-you-want-to-override.png)

2. 儲存修改

![儲存複寫的資料](save-override-data.png)

3. 重新整理頁面，讓系統重抓 API 回應

![重新整理頁面後，覆蓋的結果反應於畫面中](refresh-to-see-override-result.png)

## 結論

Overrides 這個小功能，給我帶來巨大的好處，對於那些前端會受到後端資料影響的問題，我不需要在本地去復現各個不同環境的情況，只需要在瀏覽器中設定一下，調整回傳值，就可以很快的排查相關的問題，對於整個除錯的流程帶來很大的好處。

## 碎碎念

這次發現了 Devtools 的 Overrides 功能，真的讓我冷汗直流，每天用著自以為的最佳實踐做事，竟然一直都不是最合適的方式，這次的經驗讓我意識到，新知是屬於那些願意繼續往前走的人，共勉之。

## 參考資料

* [Override web content and HTTP response headers locally - Chrome for developers](https://developer.chrome.com/docs/devtools/overrides)