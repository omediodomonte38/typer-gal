<h1 align="center"><a href="https://typer-gal.now.sh">⌨️ Typer-GAL</a></h1>

<p align="center">O xogo de escritura en galego</p>

Forked from the original creation of [ninest](https://github.com/ninest/) [typer](https://github.com/ninest/typer). Play it on [https://typerapp.now.sh/](https://typerapp.now.sh/).

Support the original author by:
  - ⭐️ Starring the [original repository](https://github.com/ninest/typer).
  - 🎒 Checking out ninest's other [projects](https://github.com/ninest)
  - ☕️ Buying ninest [coffee](https://www.buymeacoffee.com/ninest)

As for me, you being here is enough ❤️
## What is this fork?

This fork inteds to, from the original codebase, create a typing game supporting the Galcian language. Currently you can play it with isolationist or reintegrationist spellings. It currently holds all the words in both RAG's and Estraviz's dictionaries, allowing you to switch at will.

## 🎮 How to play

1. Visit [https://typer-gal.now.sh/](https://typerapp.now.sh/)
2. To start a game, type "empezar", if you wish to do so using the RAG dictionary. If you want to use the Estraviz dictionary press the AGAL button and just type começar.

You now have **10 seconds** to type out all the words displayed. For every word you type correctly, your score increases, and you also get **1 extra second**.

## 🚀 Features
- 10 seconds to type
  - Get an extra second for each word typed (small change of getting 2 seconds)
  - Randomly get a password field to spice the game up (1/6 chance)
  - Supports all the words in RAG and Estraviz dictionary. You can switch between both.
- Save your highscore locally

## 🛠 Build setup

For bulding, the codebase is pretty functinally equal to the original one, saving the switch of grammars, etc. 
The only difference is the converstion of the encryption key to a environment variable instead of being imported from a file. The variable should be called "cryptKey". Please refer to the original repository for more detailed information. 

Please refer to the [original repository](https://github.com/ninest/typer) for more detailed instructions and information.

## ⚠️ Disclaimer
It contains literally every word on both dictionaries so use at you discretion with kids or anyone succeptible to curse words, etc.

## 📜 License
MIT
