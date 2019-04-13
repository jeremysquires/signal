set nocompatible
source $VIMRUNTIME/vimrc_example.vim
source $VIMRUNTIME/mswin.vim
behave mswin

" set fileencodings=ucs-bom,utf8,prc

set tabstop=4 softtabstop=0 expandtab shiftwidth=2 smarttab
set tw=0
set fo=cq
set wm=0
set wrap
set ai
set ci

autocmd FileType text setlocal textwidth=0

set foldmethod=indent
set foldlevelstart=4
set foldminlines=3
set nofoldenable

" Sets central temp file location, to prevent local default behavior.
if isdirectory($HOME . '/.vim/backups') == 0
  call mkdir($HOME . "/.vim/backups", "p", 0700)
endif

set backupdir=$HOME/.vim/backups//
set backupskip=$HOME/.vim/backups/*

if isdirectory($HOME . '/.vim/swapfiles') == 0
  call mkdir($HOME . "/.vim/swapfiles", "p", 0700)
endif
set directory=$HOME/.vim/swapfiles//
if exists("+undofile")
  " undofile -- This allows you to use undos after exiting and 
  "             restarting. NOTE: only present in 7.3+
  "             :help undo-persistence
  if isdirectory($HOME . '/.vim/undos') == 0
    call mkdir($HOME . "/.vim/undos", "p", 0700)
  endif
  set undodir=$HOME/.vim/undos//
  set undofile
endif

" Specify a directory for plugins
" - For Neovim: ~/.local/share/nvim/plugged
" - Avoid using standard Vim directory names like 'plugin'
" call plug#begin($HOME . '/.vim/plugged')

" Plug 'groenewege/vim-less'
" Plug 'kylef/apiblueprint.vim'

" Initialize plugin system
" call plug#end()


