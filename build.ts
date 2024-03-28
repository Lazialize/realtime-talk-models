await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist/bun',
  minify: true,
  target: 'bun',
})

process.exit();
