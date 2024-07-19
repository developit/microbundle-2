# Microbundle 2

What if microbundle could figure out how to bundle your library based on the `"exports"` field you already have to define in your package.json?

And what if it was also absurdly fast, and one 500kb file with a single native dependency?

This is a reimplementation of [Microbundle](https://github.com/developit/microbundle)
built on [ESBuild](https://esbuild.github.io).

<img width="1007" alt="help" src="https://github.com/user-attachments/assets/f6e3f477-bb7d-4188-8b4b-6ea7ca1a4d22">


## Simple Example

You write a package.json that looks like this:

```jsonc
{
  "name": "simple",
  "type": "module",
  "exports": {
	"import": "./dist/lib.js",
	"default": "./dist/lib.cjs"
  }
}
```

<img width="251" alt="simple example package" src="https://github.com/user-attachments/assets/8c8b4b1e-aa43-4214-b4bb-4e32b5d856f9">


## Multiple entries

Just define your package exports the way you already have to for Node/Vite/etc:

```jsonc
{
  "name": "multi-entry",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/lib.d.ts",
      "import": "./dist/lib.js",
      "default": "./dist/lib.cjs"
    },
    "./a": {
      "types": "./dist/a.d.ts",
      "import": "./dist/a.js",
      "default": "./dist/a.cjs"
    },
    "./b": {
      "types": "./dist/b.d.ts",
      "import": "./dist/b.js",
      "default": "./dist/b.cjs"
    }
  }
}
```

<img width="317" alt="simple multi-entry package example" src="https://github.com/user-attachments/assets/b2de4b6b-a13b-46c6-8940-f678de8b6ddf">

This example has a dynamic import, which you can see produced a `./c` chunk. Both the ESM and CJS versions work the same way!

## Wildcards/patterns

Wildcard/pattern exports are also supported:

```jsonc
{
  "name": "patterns",
  "type": "module",
  "exports": {
    ".": {
      "types": "./build/index.d.ts",
      "import": "./build/index.js",
      "default": "./build/index.cjs"
    },
    "./lib/*": {
      "types": "./build/lib/*.d.ts",
      "import": "./build/lib/*.js",
      "default": "./build/lib/*.cjs"
    },
    "./components/*": {
      "source": "./lib/components/*.tsx",
      "types": "./build/components/*.d.ts",
      "import": "./build/components/*.js",
      "default": "./build/components/*.cjs"
    }
  }
}
```

<img width="448" alt="complex multi-entry example using wildcard/pattern exports" src="https://github.com/user-attachments/assets/36bd84f8-8f1e-4e0d-8af9-970bd9f5c218">

