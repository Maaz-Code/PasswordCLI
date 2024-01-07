#!/usr/bin/env node

import {intro, outro, spinner} from '@clack/prompts';
import generator from 'generate-password';
import { setTimeout } from 'node:timers/promises';

intro(`Welcome to PasswordCLI.`); 

const password = generator.generate({
    length: 10,
    symbol: true
})

const s = spinner();
s.start('Generating...');
await setTimeout(1000);
s.stop();

console.log("Password: ", password);
outro(`Thank you!`);