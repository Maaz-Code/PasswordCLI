#!/usr/bin/env node

import {intro, outro, spinner, text, confirm} from '@clack/prompts';
import generator from 'generate-password';
import { setTimeout } from 'node:timers/promises';

async function main(){
    intro(`Welcome to PasswordCLI.`); 

    const length = await text({
        message: 'Enter the length of password: '
    });

    const value = await confirm({
        message: 'Do you want to include special characters?'
    })

    const password = generator.generate({
        length: length,
        symbols: value
    })

    const s = spinner();
    s.start('Generating...');
    await setTimeout(1000);
    s.stop();

    console.log("Password: ", password);
    outro(`Thank you!`);
}

main().catch(console.error);