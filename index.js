#!/usr/bin/env node
 
import {intro, outro, spinner, text, confirm, isCancel, cancel, log} from '@clack/prompts';
import generator from 'generate-password';
import { setTimeout } from 'node:timers/promises';
import figlet from 'figlet';
import color from 'picocolors';
 
async function main(){
    intro(`${color.bgCyan('Welcome to PasswordCLI.')}`);

    const length = await text({
        message: 'Enter the length of password: ',
        validate(value){
            if(!value) { return `Please enter a value!`};
            if(parseInt(value) < 5){
                return `Length too short! Must be greater than 4. Please enter again...`;
            } 
        }
    });

    if (isCancel(length)) {
        cancel('Operation cancelled.');
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

    const multiple = await confirm({
        message: 'Do you want to generate multiple passwords?'
    })

    let password;
    if(multiple){
        const count = await text({
            message: 'Enter the number of passwords to be generated: ',
            validate(value){
                if(!value) { return `Please enter a value!`};
                if(parseInt(value) < 2){
                    return `Value must be greater than 1.`;
                } 
            }
        })

        password = generator.generateMultiple(count, {
            length: length,
            symbols: symbols,
            numbers: numbers
        })

        const s = spinner();
        s.start('Generating...');
        await setTimeout(2000);
        s.stop();
    
        console.log(color.bold("Passwords: "));
    } else{
        password = generator.generate({
            length: length,
            symbols: symbols,
            numbers: numbers
        })

        const s = spinner();
        s.start('Generating...');
        await setTimeout(1000);
        s.stop();
        
        console.log(color.bold("Password: "));
    }
    
    if(password == ''){
        log.error(color.red(`Error generating password! Please check the values entered and try again.`));
    } else{
        if(multiple){
            let multiPasswords = [];
            multiPasswords = password.join(',  ');
            log.success(color.green(multiPasswords));
        }else{
            log.success(color.green(password));
        }
        outro(`${color.bgCyan('Thank You!')}`);
    }

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