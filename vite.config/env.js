const { argv } = process;
export const isBuildLocal = argv.includes('build-local');
export const isBuildDefault = argv.includes('build-default');
export const isDev = !argv.includes('build');
