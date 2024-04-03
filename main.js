#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 10000;
let myPin = 1234;
//wellcome message print
console.log(chalk.yellow(" wellcome to far6-atm-machine"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: chalk.blueBright("enter your pin"),
        type: "number"
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.greenBright("succesfully login,you enter correct pin code!!!"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: chalk.blue("please select option"),
            type: "list",
            choices: ["withdraw amount", "check balance",]
        }
    ]);
    if (operationAns.operation === "withdraw amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: chalk.redBright("select a withdrawal method"),
                choices: ["fast cash", "enter amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "fast cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: chalk.green("select amount:"),
                    choices: [1000, 2000, 5000, 10000, 50000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("insufficient balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash}withdraw successfully`);
                console.log(`your remaining balance is:${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "enter amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: "enter your amount to withdraw",
                    type: "number"
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.redBright("you have insufficant balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(chalk.greenBright `${amountAns.amount} withdraw successfuly`);
                console.log(chalk.red `your remaining balance is :${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "check balance") {
        console.log(chalk.red `your account balance is :${myBalance}`);
    }
}
else {
    console.log(chalk.redBright("pin is incorrect,try again"));
}
