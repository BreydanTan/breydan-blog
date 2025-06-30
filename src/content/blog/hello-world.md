---
title: Basic Markdown Usage
date: 2025-04-05T20:10:00+08:00
updated: 2025-04-05T20:10:00+08:00
keywords: ["hello", "world"]
featured: true
summary: "This article covers the basics of Markdown syntax."
---

This article covers the basics of Markdown syntax.

In Markdown, you can use \ to escape special characters.

# 1. Headings

**Syntax**
```md
# This is an <h1> tag
## This is an <h2> tag
### This is an <h3> tag
#### This is an <h4> tag
```

**Example**

# This is an h1 tag
## This is an h2 tag
### This is an h3 tag
#### This is an h4 tag

# 2. Emphasis and Italic

**Syntax**
```md
*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__
```

**Example**

*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

# 3. Ordered and Unordered Lists

**Syntax**
```md
* Item 1
* Item 2
* Item 3

1. Item 1
2. Item 2
3. Item 3
```

**Example**
* Item 1
* Item 2
* Item 3

1. Item 1
2. Item 2
3. Item 3

# 4. Images

**Syntax**
```
![img-name](img-url)
```

**Example**
![Golden Combination Tech Stack](https://elasticbeanstalk-ap-southeast-1-733447040549.s3.ap-southeast-1.amazonaws.com/blog/blog/saas-techstack/goldencombination.png)

# 5. Hyperlinks

**Syntax**
```
[link-name](link-url)
```

**Example**

[Golden Combination Tech Stack](https://elasticbeanstalk-ap-southeast-1-733447040549.s3.ap-southeast-1.amazonaws.com/blog/blog/saas-techstack/goldencombination.png)

# 6. Blockquotes

**Syntax**
```md
> The original meaning of a quote is to quote someone else'''s words.
```

**Example**

> If you please draw me a sheep!
> A soldier who does not want to be a general is not a good soldier.

# 7. Inline Code

**Syntax**
```
`This is an inline code.`
```

**Example**

`I often use inline code to display special nouns.`

# 8. Code Blocks

**Syntax**

```md
​```js
for (var i=0; i<100; i++) {
    console.log("hello world" + i);
}
​```
```

**Example**

```js
for (var i=0; i<100; i++) {
    console.log("hello world" + i);
}
```

You can also display code by indenting, as shown in the example below:

    console.loe("Hello_World");

# 9. Tables

## Table

| Table Header 1 | Table Header 2 | Table Header 3 |
| - | - | - |
| Division 1 | Division 2 | Division 3 |
| Division 1 | Division 2 | Division 3 |
| Division 1 | Division 2 | Division 3 |

# References

- https://guides.github.com/features/mastering-markdown/
- https://help.github.com/articles/basic-writing-and-formatting-syntax/