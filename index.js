#!/usr/bin/env node

import {intro, outro, spinner, text, confirm, isCancel, cancel} from '@clack/prompts';
import generator from 'generate-password';
import { setTimeout } from 'node:timers/promises';
import figlet from 'figlet';
import color from 'picocolors';

async function main(){
    intro(`${color.bgBlue('Welcome to PasswordCLI.')}`);

    const length = await text({
        message: 'Enter the length of password: ',
        validate(value){
            if(parseInt(value) < 6){
                return `Length too short! Must be greater than 5. Please enter again...`;
            } 
        }
    });

    if (isCancel(length)) {
        cancel('Operation cancelled.');p
        process.exit(0);
    }

    const numbers = await confirm({
        message: 'Do you want to include numbers?'
    })

    if (isCancel(numbers)) {
        cancel('Operation cancelled.');
        process.exit(0);
    }

    const symbols = await confirm({
        message: 'Do you want to include symbols?'
    })

    if (isCancel(symbols)) {
        cancel('Operation cancelled.');
        process.exit(0);
    }

    const password = generator.generate({
        length: length,
        symbols: symbols,
        numbers: numbers
    })

    const s = spinner();
    s.start('Generating...');
    await setTimeout(1000);
    s.stop();

    console.log(color.bold("Password: "));
    outro(color.green(password));
    outro(`${color.bgBlue('Thank You!')}`);

    figlet.text(
    "PasswordCLI",
    {
        font: "Standard",
        },
        function (err, data) {
            if (err) {
                console.log("Something went wrong...");
                console.dir(err);
                return;
            }
        console.log(data);
    });
}

main().catch(console.error);