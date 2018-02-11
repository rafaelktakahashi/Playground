set nocompatible
filetype off

set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

" required by Vundle
Plugin 'VundleVim/Vundle.vim'
" git wrapper
Plugin 'tpope/vim-fugitive'
" operations with surrounding caracters
Plugin 'tpope/vim-surround'
" handy bracket mappings
Plugin 'tpope/vim-unimpaired'
" nice colorschemes
Plugin 'rafi/awesome-vim-colorschemes'
" light version of powerline
Plugin 'vim-airline/vim-airline'
" themes for airline
Plugin 'vim-airline/vim-airline-themes'
" better file explorer
Plugin 'scrooloose/nerdtree'
" :Far command for search and replace
Plugin 'brooth/far.vim'
" syntax highlighting for many languages
Plugin 'sheerun/vim-polyglot'
" tab autocompletion
Plugin 'ervandew/supertab'
" autocompletion for python
Plugin 'davidhalter/jedi-vim'

call vundle#end()
filetype plugin indent on

" use syntax highlighting
syntax on

" start scrolling before cursor reaches the bottom
set scrolloff=5
set sidescrolloff=5

" leave hidden buffers open
set hidden

" larger history
set history=512

" use both absolute and relative number lines
set number
set relativenumber

" show partial commands
set showcmd

" better case for searching
set ignorecase
set smartcase

" backspace over line breaks
set backspace=indent,eol,start
set nostartofline

" display cursor position
set ruler

" disable the bell sound
set visualbell
set t_vb=

" mouse mode at all times
set mouse=a

" highlight cursor line
set cursorline

" 2-line high command window
set cmdheight=2

" tab size is 4; indent ith four columns
set tabstop=4
set shiftwidth=4

" do not show intro text on a new document
set shortmess=I

" incremental highlighting during search
set incsearch
" but do not keep matches highlighted
set nohlsearch

" true colors and theming
set termguicolors
let &t_8f="[38;2;%lu;%lu;%lum"
let &t_8b="[48;2;%lu;%lu;%lum"
let g:airline_powerline_fonts=1
let g:airline_theme='deus'
colorscheme solarized8
set background=dark

" remaps for the leader key
" leader key is the default backslash

" new file in new tab, must select name afterwards
noremap <leader>t :vert new 
" open NERDTree in a tab to the left (requires NERDTree)
noremap <leader>e :vert NERDTree<cr>
" copy to system clipboard (use visual selection)
noremap <leader>c "+y
" cut to system clipboard (use visual selection)
noremap <leader>x "+d
" paste from system clipboard
noremap <leader>v "+p

" the following bracket remaps exist in the unimpaired plugin,
" these are my own remaps, partly for when the plugin is unavailable.
noremap <leader>[<space> O<esc>j
noremap <leader>]<space> o<esc>j
" in normal mode: swap lines
" in visual mode: move entire selection
" (unimpaired plugin uses [e and ]e for moving lines)
nnoremap <leader>k ddkP
nnoremap <leader>j ddp
vnoremap <leader>k :m '<-2<cr>gv=gv
vnoremap <leader>j :m '>+1<cr>gv=gv

" scrollilng half a page
noremap <leader>d <C-d>
noremap <leader>u <C-u>

" redo
noremap <leader>r <C-r>

" move to top or bottom and automatically recenter
noremap <leader>l Lzz
noremap <leader>h Hzz
