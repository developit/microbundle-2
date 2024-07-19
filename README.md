# Microbundle 2

What if microbundle could figure out how to bundle your library based on the `"exports"` field you already have to define in your package.json?

And what if it was also absurdly fast, and one 500kb file with a single native dependency?

This is a reimplementation of [Microbundle](https://github.com/developit/microbundle)
built on [ESBuild](https://esbuild.github.io).

<img width="1007" alt="help" src="https://gist.github.com/user-attachments/assets/5979b402-c82e-4aca-a0f9-813b9966cf06">

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

<img width="251" alt="simple example package" src="https://gist.github.com/user-attachments/assets/3086949c-0d51-4c12-be15-01c86294205f">

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

<img width="317" alt="simple multi-entry package example" src="https://gist.github.com/user-attachments/assets/e1345001-f7e2-4998-a438-ae95c54f1c08">

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

<img width="448" alt="complex multi-entry example using wildcard/pattern exports" src="https://gist.github.com/user-attachments/assets/c75cdb7b-302f-4180-aff1-f50c64784ef9">

