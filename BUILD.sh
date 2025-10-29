#!/bin/bash

# Set target build to be ES2020, required for BigInt support
esbuild ./src/App.tsx --bundle --outfile=public/bundle.js --loader:.ts=tsx --target=es2020