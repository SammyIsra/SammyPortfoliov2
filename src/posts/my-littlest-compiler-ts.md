---
title: The Littlest Compiler in TypeScript
type: project
platform: GitHub
date: "2019-06-29"
published: true
description: Writing a super tiny compiler on TypeScript that transpiles Lisp style code to C style code.
link: https://github.com/SammyIsra/the-super-tiny-compiler
---

## What is it?

In my goal to learn how language parsers and compilers work, I tried to adapt the-super-tiny-compiler to TypeScript so that I could get to a point where you can describe the compiler in TypeScript types and Interfaces. The compiler is divided into four sections:

- Tokenizer
  - Turns the input code into individual tokens
- Parser
  - Turns the token stream into an Abstract Syntax Tree (AST) a tree representation of the logic amd hierarchy of the code.
- Transformer
  - Turns the AST from the previous step into a new AST based on some operations that can be defined elsewere. It's all about having a tree that is useful for the next step.
- Code Generator
  - The most self descriptive of the four sections. The Code Generator takes in an AST and generates code in a specific target language based on the AST. In our case, the input is C style code and the output is Lisp style code.

There are a tons more notes about it in my Notion page. Because this was such a documentation heavy project (I wanted to document and write about everything), I opted for making a Notion page:
https://www.notion.so/sammynotes/the-super-tiny-compiler-e4ca7985c999431a840b6561d0a1c03e
