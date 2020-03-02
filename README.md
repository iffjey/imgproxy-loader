# imgproxy-loader
An imgproxy-loader module for webpack

## How to test:
Find any static front-end asset (e.g.components/ShopEbayPage)
Add query to module import (import ebayLogoUrl from './assets/ebay.png)
Parsing of query parameters

```
?                            -> {}
?flag                        -> { flag: true }
?+flag                       -> { flag: true }
?-flag                       -> { flag: false }
?xyz=test                    -> { xyz: "test" }
?xyz=1                       -> { xyz: "1" } // numbers are NOT parsed
?xyz[]=a                     -> { xyz: ["a"] }
?flag1&flag2                 -> { flag1: true, flag2: true }
?+flag1,-flag2               -> { flag1: true, flag2: false }
?xyz[]=a,xyz[]=b             -> { xyz: ["a", "b"] }
?a%2C%26b=c%2C%26d           -> { "a,&b": "c,&d" }
?{data:{a:1},isJSON5:true}   -> { data: { a: 1 }, isJSON5: true }
```

## Basic usage
import ebayLogoUrl from './assets/ebay.png?extension=webp&width=300
