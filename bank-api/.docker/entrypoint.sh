#!/bin/bash

npm install
npm run typeorm migration run -- -d data-source.ts
npm run console fixtures
npm run start:dev