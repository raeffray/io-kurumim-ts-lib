# io-kurumim-ts-lib

## Overview
`io-kurumim-ts-lib` provides a modern **Optional<T>** implementation for **TypeScript**. This Optional helps handle **nullable (null or undefined) values safely**, using **the monad concept** to allow chaining operations **without errors**.

### Why Use This Optional?
- ✅ **Avoids null errors** by wrapping values safely.
- ✅ **Makes code cleaner** by eliminating manual `if (value !== null)` checks.
- ✅ **Supports chaining** operations like `map()`, `filter()`, and `orElse()`.
- ✅ **Follows the Monad pattern**, similar to Java's `Optional<T>` or Haskell's `Maybe<T>`.

---

## Installation

Install via **npm**:
```sh
npm install io-kurumim-ts-lib
```

Or using **Yarn**:
```sh
yarn add io-kurumim-ts-lib
```

---

## How It Works

### Wrapping a Value (`ofNullable`)
Use `ofNullable()` to create an `Optional<T>`:

```ts
import { Optional } from "io-kurumim-ts-lib";

const optional = Optional.ofNullable("Hello");
console.log(optional.get()); // "Hello"
```
If the value is `null` or `undefined`, it creates an **empty Optional** instead.

---

### Getting a Value Safely (`orElse`)
Use `orElse()` to provide a **default value** if it's empty:

```ts
const result = optional.orElse("Default Value");
console.log(result); // "Hello"
```
If the original value was `null`, it would return **"Default Value"** instead.

---

### Transforming a Value (`map`)
Instead of checking manually, use `map()` to safely modify the value:

```ts
const lengthOptional = optional.map((text) => text.length);
console.log(lengthOptional.get()); // 5
```
- If the value exists, `map()` applies the function.
- If the value is **missing**, it stays empty **without errors**.

---

### Filtering Values (`filter`)
Use `filter()` to keep the value **only if it meets a condition**:

```ts
const filtered = optional.filter((text) => text.length > 3);
console.log(filtered.isPresent()); // true
```
If the condition is **false**, `Optional` becomes empty.

---

### Throw an Error If Empty (`orElseThrow`)
Instead of checking `null` manually, throw an error when necessary:

```ts
const mustExist = optional.orElseThrow(() => new Error("Value is required"));
```

---

### 6️⃣ Running a Function If Value Exists (`ifPresent`)
Run a function **only if the value exists**:

```ts
optional.ifPresent((text) => console.log(`Value is: ${text}`));
```
If empty, `ifPresent()` **does nothing**, avoiding errors.

---

## **How This Optional Uses the Monad Concept**

This `Optional<T>` follows the **Monad pattern**, meaning it:
1. **Wraps a value** inside a structure (`ofNullable()`).
2. **Applies functions safely** (`map()`, `filter()`, etc.).
3. **Chains operations** without breaking (`orElse()`, `orElseThrow()`).

By using **monadic behavior**, `Optional<T>` makes handling nullable values **safe, predictable, and error-free**.

---

## **Contributing**
Feel free to submit **issues, feature requests, or pull requests** to improve this library!

---

## **License**
This project is licensed under the **MIT License**.

