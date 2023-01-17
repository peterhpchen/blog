---
title: 使用 dircolors 設定 LS_COLORS
date: 2022-05-01
tags: shell
---
`LS_COLORS` 可以設定 `ls` 執行結果的各種檔案類型的顏色與樣式，但是對於各式不同的檔案類型，要在一個環境變數上以一個字串下去設定是十分難以維護的，因此 GNU 的 Coreutils 提供了 `dircolors` 指令來幫忙管理與設定 `LS_COLORS` 。

<!-- more -->

## 安裝 `dircolors`

`dircolors` 指令是 GNU 的 Coreutils 所提供的其中一個指令，通常在 Linux 的發行版中都已經預安裝了 Coreutils ，因此不用自行安裝，如果沒有的話，可以透過 `apt` 、 `pacman` 與 `brew` 之類的套件管理器做安裝。

```shell
% apt install coreutils
% pacman -S coreutils
% brew install coreutils
```

安裝完後下 `dircolors --help` 指令確認安裝是否成功。

```shell
% dircolors --help
Usage: dircolors [OPTION]... [FILE]
Output commands to set the LS_COLORS environment variable.

Determine format of output:
  -b, --sh, --bourne-shell    output Bourne shell code to set LS_COLORS
  -c, --csh, --c-shell        output C shell code to set LS_COLORS
  -p, --print-database        output defaults
      --print-ls-colors       output fully escaped colors for display
      --help        display this help and exit
      --version     output version information and exit

If FILE is specified, read it to determine which colors to use for which
file types and extensions.  Otherwise, a precompiled database is used.
For details on the format of these files, run 'dircolors --print-database'.

GNU coreutils online help: <https://www.gnu.org/software/coreutils/>
Full documentation <https://www.gnu.org/software/coreutils/dircolors>
or available locally via: info '(coreutils) dircolors invocation'
```

macOS 的指令與別人不同，在安裝了 Coreutils 後，要改下 `gdircolors` 指令：

```shell
gdircolors
```

雖然 macOS 上的指令不同，但使用方式是完全一樣的。

## 使用 `dircolors`

`dircolors` 可以接收一個 `.dir_colors` 的檔案，並將這個檔案的內容轉為 `LS_COLORS` 的字串，我們可以使用 `-p` 或是 `--print-database` 輸出預設的 `.dir_colors` 內容：

```shell
# 輸出預設的 .dir_colors 內容
% dircolors -p
```

`dircolors` 在沒有接收檔名的情況下，會使用預設的 `.dir_colors` （也就是 `-p` 所示的內容）來建立 `LS_COLORS` ：

```shell
% dircolors
LS_COLORS='rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=00:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.avif=01;35:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:*~=00;90:*#=00;90:*.bak=00;90:*.old=00;90:*.orig=00;90:*.part=00;90:*.rej=00;90:*.swp=00;90:*.tmp=00;90:*.dpkg-dist=00;90:*.dpkg-old=00;90:*.ucf-dist=00;90:*.ucf-new=00;90:*.ucf-old=00;90:*.rpmnew=00;90:*.rpmorig=00;90:*.rpmsave=00;90:';
export LS_COLORS
```

可以看到 `dircolors` 的執行結果實際上就是個 Shell script ，我們可以直接將它貼在 `~/.zshrc` （或是 Bash 的 `~/.bashrc` ）中，這樣就可以使設定產生效果了。

如果 `dircolors` 接收了檔案路徑參數時，它會依照此檔案的內容產生 Shell script ：

```shell
# 使用 ~/.dir_colors 的內容產生 Shell script
% dircolors ~/.dir_colors
```

## 實際應用

我相信絕大多數人都不會想要自己配置 `.dir_colors` ，但是許多優秀的 theme ，他們都會提供自己的 `.dir_colors` 供使用者下載使用，例如 [Nord dircolors](https://github.com/arcticicestudio/nord-dircolors) 就是個漂亮的例子。

當我們拿到了 `.dir_colors` 配置檔後，可以將它放置於 `~/.dir_colors` 路徑下，並且使用 `eval` 將 `dircolors` 的輸出作為指令執行：

```shell
eval $(dircolors $HOME/.dir_colors)
```

將上面的指令放在 `~/.zshrc` 中，可以省去每次 `.dir_colors` 內容更新時，要重複執行指令並複製的麻煩。

## 總結

使用 GNU Coreutils 的 `dircolors` 指令可以藉由 `.dir_colors` 檔案來產生設定 `LS_COLORS` 值的 Shell script 。

我們可以設定相對易讀的 `.dir_colors` 檔案，並使用 `dircolors` 指令將其轉換為 Shell script 放入 Shell 的設定檔 `~/.zshrc` 中，藉此使用設定的顏色。

## 參考資料

* [GNU Coreutils dircolors invocation](https://www.gnu.org/software/coreutils/manual/html_node/dircolors-invocation.html)
* [GitHub gibbling/dircolors](https://github.com/gibbling/dircolors)
